import React from 'react';
import './search.css';

const MechanicalCounter = ({ count }) => {
    console.log(count)
    return (
        <div className="counter">
            <div className="digit-container">
                <div className={`digit ${count >= 10000 ? 'roll-in' : ''}`}>
                    {Math.floor((count % 100000) / 10000)}
                </div>
            </div>
            <div className="digit-container">
                <div className={`digit ${count >= 1000 ? 'roll-in' : ''}`}>
                    {Math.floor((count % 10000) / 1000)}
                </div>
            </div>
            <div className="digit-container">
                <div className={`digit ${count >= 100 ? 'roll-in' : ''}`}>
                    {Math.floor((count % 1000) / 100)}
                </div>
            </div>
            <div className="digit-container">
                <div className={`digit ${count >= 10 ? 'roll-in' : ''}`}>
                    {Math.floor((count % 100) / 10)}
                </div>
            </div>
            <div className="digit-container">
                <div className="digit">{count % 10}</div>
            </div>
        </div>
    );
};

export default MechanicalCounter;
