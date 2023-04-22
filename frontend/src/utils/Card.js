import './Card.css'
import thumbtack from './thumbtack.png';
import face from "./face.jpg"


function Card() {
  return (
    <div className="Card-Header">

      <div className='container'>
        <img src={face} alt="My Image" class="face"></img>
        <img src={thumbtack} alt="My Image" class="thumb"></img>
      </div>


      <header className="old-paper">

        <br></br>

        <div className="typed-text">
          Name:
        </div>
        <div className="old-text">
          Alan's Card
        </div>

        <br></br>

        <div className="typed-text">
          Home-Town:
        </div>
        <div className="old-text">
          San Jose
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
            Hey there! I'm just your average lover of all things coffee, good music, and dogs. You can usually find me at the local coffee shop, sipping on a latte and listening to my favorite indie tunes. </p>
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