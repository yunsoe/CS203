import React from 'react';
import './home.css';


function Featuresbox(props) {
    return (
        <div className='a-box'>
            <div className='a-b-img'>
                <img src={props.image} />
            </div>

            <div className='a-b-text'>
                <h2 className = 'button-text'> {props.title} </h2>
            </div>
        </div>
    )
}

export default Featuresbox;