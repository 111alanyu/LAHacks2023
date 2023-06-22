import Card from '../utils/Card.js';
import { useNavigate, useParams } from "react-router-dom";
import './user.css'
import { useEffect, useState } from 'react';
import { db, auth } from "../firebase-config"
import { doc, setDoc, collection, getDocs, arrayUnion, updateDoc } from "firebase/firestore";
import BlurImage from "../images/blur.jpeg"

const User = () => {
  const user = useParams();
  let navigate = useNavigate();
  const userColRef = collection(db, "users");

  
  const [userName, setUserName] = useState("")
  const [userHometown, setUserHometown] = useState("")
  const [userRemarks, setUserRemarks] = useState("")
  const [userLong, setUserLong] = useState(0)
  const [userLat, setUserLat] = useState(0)
  const [blur, setBlur] = useState(true);

  function handleKeyPress(event) {
    if (event.key === 'b') {
      setBlur(false);
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  });

  // Retrieve profile info when page loads
  useEffect(() => {
    getDocs(userColRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == user.id) {
          setUserName(doc.data().name);
          setUserHometown(doc.data().hometown);
          setUserRemarks(doc.data().remarks);
          setUserLong(doc.data().long);
          setUserLat(doc.data().lat);
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
        <h1>You scanned a <span className='red'>Social Scan</span> QR Code!</h1>
        <p>This person must scan your code back between 1 and 5 minutes to see the contents and add this card to your collection.</p>
        {blur ? (
          <img src={BlurImage}/>
        ):(
          <div>
            <Card id="userCard" name={userName} hometown={userHometown} remarks={userRemarks} lat={userLat} long={userLong}/>
            
          </div>
        )}
        {blur ? (
          <div></div>
        ):(
          <div>
            <button onClick={addToCollection}>Add to collection</button>
          </div>
        )}
        
    </div>
  )
}

export default User;