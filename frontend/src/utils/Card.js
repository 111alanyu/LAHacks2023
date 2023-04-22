import './Card.css'
import thumbtack from './thumbtack.png';
import face from "./face.jpg"


function Card(props) {
  
  return (
    // <div className="old-paper">
    //   <p>Name</p>
    // </div>
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
        <div className="old-text">
          {props.name}
        </div>
        <br></br>
        <div className="typed-text">
          Home-Town:
        </div>
        <div className="old-text">
          {props.hometown}
        </div>
        <br></br>
        <div className="typed-text">
          Time-Met:
        </div>
        <div className="old-text">
          15:15:23PST
        </div>
        <br></br>
        <br></br>
        <div className="typed-text">
          Remarks:
        </div>
        <div className="old-text">
          <p>
            {props.notes}
          </p>
        </div>
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default Card;