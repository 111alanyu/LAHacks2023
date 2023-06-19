import { useEffect, useState } from 'react';
import Card from '../utils/Card';
import './profile.css'
import QRCode from "react-qr-code";
import { db, auth } from "../firebase-config"
import { updateDoc, arrayUnion, doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import Map from '../utils/map';

const Profile = () => {

  const [currUserUid, setCurrUserUid] = useState(null);
  const [connectionUids, setConnectionUids] = useState([]);
  const [connections, setConnections] = useState([]);
  const [coords, setCoords] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // const currUser = "aV8UDZqUFZOd6yd2SGCtM80xLrG3";
  const currUser = auth.currentUser.uid;

  // Get location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => console.error(error)
    );
  }, []);


  // Retrieve profile info when page loads
  useEffect(() => {
    let docRef = doc(db, "users", currUser);
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        document.getElementById("nameInput").value = doc.data().name;
        document.getElementById("hometownInput").value = doc.data().hometown;
        document.getElementById("remarksInput").value = doc.data().remarks;
        setConnectionUids(doc.data().connections);
      } else {
        console.log("No such document!");
      }
    })
  }, [currUser]);

  useEffect(() => {
    connectionUids.forEach((uid) => {
      let docRef = doc(db, "users", uid);
      getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          setConnections(prevConnections => [
            ...prevConnections,
            {
              name: doc.data().name,
              hometown: doc.data().hometown,
              remarks: doc.data().remarks,
              lat: doc.data().lat,
              long: doc.data().long,
            }
          ]);
        } else {
          console.log("No such document!");
        }
      })
    })
  }, [connectionUids])

  useEffect(() => {
    connections.forEach((doc) => {
      setCoords(
        [
          ...coords,
          [doc.long, doc.lat]
        ]
      )
    })
  }, [connections])


  const updateProfile = async () => {
    // Add/update to Cloud Firestore
    await updateDoc(doc(db, "users", currUser), {
      name: document.getElementById("nameInput").value,
      hometown: document.getElementById("hometownInput").value,
      remarks: document.getElementById("remarksInput").value,
      lat: latitude,
      long: longitude
    });
    document.getElementById("saveMsg").style.display = "block";
  }

  return (
    <div id="profilePage">
      <div className='section'>
        <div id='collectionWrapper'>
          <h1>my card</h1>
        </div>
        <div className="cardWrapper">
          {/* <div className='container'>
            <img src={face} alt="My Image" className="face"></img>
            <img src={thumbtack} alt="My Image" className="thumb"></img>
          </div> */}
          <header className="old-paper"> <br></br>
            <div className="typed-text">Name:</div>
            <input
              id="nameInput"
              className="old-text"
              placeholder="(insert name)"
            />
            <br></br>
            <div className="typed-text">Home-Town:</div>
            <input
              id="hometownInput"
              className="old-text"
              placeholder="(insert hometown)"
            />
            <br></br>
            <div className="typed-text">Remarks:</div><br></br>
            <textarea
              id="remarksInput"
              className="old-text"
              placeholder='(insert about-me)'
            ></textarea>
          </header>
        </div>
        <button id='savebutton' onClick={updateProfile}>Save Card</button>
        <p id="saveMsg">Saved!</p>
      </div>
      <div id="qr-section">
        <p>This is your QR code. Print it out so people can scan it!</p>
        <div>
          <div id="qr-code-caption">Social Scan</div>
          <QRCode value={`https://la-deploy.vercel.app/user/${currUser}`} size={180} />
        </div>
      </div>
      <div className='section' id="collectionSection">
        <div id="collectionWrapper">
          <div id="collection">
            <h1>my card collection</h1>
            {connections.map((user) => {
              return (
                <div>
                  <Card name={user.name} hometown={user.hometown} remarks={user.remarks} lat={user.lat} long={user.long} location={true} />
                  <br />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {(coords.length > 0) && <Map props={coords} />}
    </div>
  )
}

export default Profile;