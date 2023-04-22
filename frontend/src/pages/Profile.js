import { useEffect, useState } from 'react';
import Card from '../utils/Card';
import './profile.css'
import QRCode from "react-qr-code";

const Profile = () => {

  const [collection, setCollection] = useState([]);

  const sampleCollection = [
    {
      name: "p1",
      hometown: "Los Angeles, CA",
      timemet: "12:43:23",
      notes: "insert bio"
    },
    {
      name: "p2",
      hometown: "Los Angefdsfsd, CA",
      timemet: "12:43:23",
      notes: "insert bfdsfsdfsdio"
    },
  ]

  useEffect(() => {
    setCollection(sampleCollection);
  }, [])

  return (
    <div id="profilePage">
      <div id="myCard">
        <div id="myInfo">
          <div id="updateProfile">
            <h1>My Card</h1>
            <div id="card">
              <div>
                <b className="inputHeader">Name</b>
                <input id="nameInput" placeholder="John"></input>
              </div>
              <div>
                <b className="inputHeader">Hometown</b>
                <input id="nameInput" placeholder="Los Angeles, CA"></input>
              </div>
              <div>
                <b className="inputHeader">Notes</b>
                <input id="nameInput" placeholder="About me"></input>
              </div>
            </div>
            <button id='savebutton'>Save Card</button>
          </div>
          <div id="qr-code">
            <h1>My QR Code</h1>
            <QRCode value="localhost:3000/users/insertMyUID" size={180} />
          </div>
        </div>
      </div>

      <div id="collectionWrapper">å
        <h1>My Card Collection</h1>
        <div id="collection">
          {collection.map((user) => {
            return (
              <Card name={user.name} hometown={user.hometown} timemet={user.timemet} notes={user.notes} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile;