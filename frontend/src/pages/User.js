import Card from '../utils/Card.js';
import { useNavigate, useParams } from "react-router-dom";
import './user.css'
import { useEffect, useState } from 'react';
import { db, auth } from "../firebase-config"
import { doc, setDoc, collection, getDocs, arrayUnion, updateDoc } from "firebase/firestore";

const User = () => {
  const user = useParams();
  let navigate = useNavigate();
  const userColRef = collection(db, "users");

  
  const [userName, setUserName] = useState("")
  const [userHometown, setUserHometown] = useState("")
  const [userRemarks, setUserRemarks] = useState("")

  // Retrieve profile info when page loads
  useEffect(() => {
    getDocs(userColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == user.id) {
          setUserName(doc.data().name);
          setUserHometown(doc.data().hometown);
          setUserRemarks(doc.data().remarks);
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  const addToCollection = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      connections: arrayUnion(user.id)
    });
    navigate("/profile");
  }

  return (
    <div id="cardPage">
        <h1>You scanned a <span className='red'>[QSL App Name]</span> QR Code!</h1>
        <p>This person must scan yours back within 30 seconds to see the contents and add this card to your collection.</p>
        <Card name={userName} hometown={userHometown} remarks={userRemarks}/>
        <button onClick={addToCollection}>Add to collection</button>
    </div>
  )
}

export default User;