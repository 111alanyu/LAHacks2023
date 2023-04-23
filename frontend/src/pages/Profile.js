import { useEffect, useState } from 'react';
import Card from '../utils/Card';
import './profile.css'
import QRCode from "react-qr-code";
import { db, auth } from "../firebase-config"
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

const Profile = () => {

  const userColRef = collection(db, "users");

  // Retrieve profile info when page loads
  useEffect(() => {
    getDocs(userColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == auth.currentUser.uid) {
          document.getElementById("nameInput").value = doc.data().name;
          document.getElementById("hometownInput").value = doc.data().hometown;
          document.getElementById("remarksInput").value = doc.data().remarks;
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

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
          <QRCode value="localhost:3000/users/insertMyUID" size={180}/>
        </div>
      </div>
      <div className='section' id="collectionSection">
        <div id="collectionWrapper">
          <div id="collection">
          <h1>my card collection</h1>
            {/* {collection.map((user) => {
              return (
                <Card name={user.name} hometown={user.hometown} notes={user.notes}/>
              )
            })} */}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile;