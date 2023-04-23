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
      <div className='section'>
        <div id='collectionWrapper'>
          <h1>my card</h1>
        </div>
        <div className="cardWrapper">
          {/* <div className='container'>
            <img src={face} alt="My Image" className="face"></img>
            <img src={thumbtack} alt="My Image" className="thumb"></img>
          </div> */}
          <header className="old-paper">
            <br></br>
            <div className="typed-text">
              Name:
            </div>
            <input id="nameInput" className="old-text" placeholder="(insert name)"></input>
            <br></br>
            <div className="typed-text">
              Home-Town:
            </div>
            <input id="nameInput" className="old-text" placeholder="(insert hometown)"></input>
            <br></br>
            <div className="typed-text">
              Remarks:
            </div>
            <br></br>
            <textarea className="old-text" placeholder='(insert about-me)'></textarea>
            <a
              className="App-link"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
          </header>
        </div>
        <button id='savebutton'>Save Card</button> 
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
            {collection.map((user) => {
              return (
                <Card name={user.name} hometown={user.hometown} notes={user.notes}/>
              )
            })}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile;