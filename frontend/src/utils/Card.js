import './Card.css'
import thumbtack from './thumbtack.png';
import face from "./face.jpg"
import React, { useState, useEffect } from "react";


function Card(props) {
  // var loc = Location()
  // console.log(loc)
  return (
    // <div className="old-paper">
    //   <p>Name</p>
    // </div>
    <div className="cardWrapper">
      <div className="old-paper">

        <div className="small_text">
          <div className="left_text_col">
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
            <div className='text-container'>
                <div className="typed-text">
                  Location:
                </div>
                <div className="old-text">
                  {props.lat}, {props.long} 
                </div>
            </div>
          </div>

          <div className='container'>
            <img src={face} alt="My Image" className="face"></img>

          </div>



        </div>
        <div className="large_text">
          <div className="typed-text">
            Remarks:
          </div>
          <div className="old-text">
            <p>
              {props.remarks}
            </p>
          </div>

        </div>


      </div>
    </div >
  );
}

export default Card;