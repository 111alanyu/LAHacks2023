import { useEffect, useState } from 'react';
import Card from '../utils/Card';
import './profile.css'

const Profile = () => {

  const [collection, setCollection] = useState([]);

  const sampleCollection = [
    {
      name: "p1",
      hometown: "Los Angeles, CA",
      notes: "insert bio"
    },
    {
      name: "p2",
      hometown: "Los Angefdsfsd, CA",
      notes: "insert bfdsfsdfsdio"
    },
  ]

  useEffect(() => {
    setCollection(sampleCollection);
  }, [])

  return (
    <div id="profilePage">
        <div id="myCard">
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
        
        <h1>My Card Collection</h1>
        <div id="collection">
          {collection.map((user) => {
            return (
              <Card name={user.name} hometown={user.hometown} notes={user.notes}/>
            )
          })}
        </div>
    </div>
  )
}

export default Profile;