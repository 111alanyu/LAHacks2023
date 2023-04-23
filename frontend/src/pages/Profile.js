import { useEffect, useState } from 'react';
import Card from '../utils/Card';
import './profile.css'
import QRCode from "react-qr-code";
import { db, auth } from "../firebase-config"
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import firebase from 'firebase/app';

const Profile = () => {

  const [currUserUid, setCurrUserUid] = useState(null);
  const [connectionUids, setConnectionUids] = useState([]);
  const [connections, setConnections] = useState([]);


  // useEffect(() => {
  //   setCurrUserUid(auth.currentUser.uid)
  // }, [auth.currentUser.uid])

  // Retrieve profile info when page loads
  useEffect(() => {
    let docRef = doc(db, "users", auth.currentUser.uid);
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
  }, [auth.currentUser]);

  useEffect(() => {
    connectionUids.forEach((uid) => {
      let docRef = doc(db, "users", uid);
      getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          setConnections(
            [
              ...connections, 
              {
                name: doc.data().name,
                hometown: doc.data().hometown,
                remarks: doc.data().remarks
              }
            ]
          )
        } else {
          console.log("No such document!");
        }
      })
    })
  }, [connectionUids])

  const updateProfile = async () => {
    // Add/update to Cloud Firestore
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: document.getElementById("nameInput").value,
      hometown: document.getElementById("hometownInput").value,
      remarks: document.getElementById("remarksInput").value,
    });
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
      </div>
      <div id="qr-section">
        <p>This is your QR code. Print it out and let people scan it!</p>
        <div>
          <div id="qr-code-caption">QSL App</div>
          <QRCode value={`http://localhost:3000/user/${auth.currentUser.uid}`} size={180}/>
        </div>
      </div>
      <div className='section' id="collectionSection">
        <div id="collectionWrapper">
          <div id="collection">
          <h1>my card collection</h1>
            {connections.map((user) => {
              return (
                <Card name={user.name} hometown={user.hometown} remarks={user.remarks}/>
              )
            })}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile;