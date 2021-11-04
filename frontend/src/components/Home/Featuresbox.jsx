import React from 'react';


function Featuresbox(props) {
    return (
        <div className='a-box'>
            <div className='a-b-img'>
                <img src={props.image} />
            </div>

            <div className='a-b-text'>
                <h2> {props.title} </h2>
                {/* <p> Lorem Ipsum </p> */}
            </div>
        </div>
    )
}

export default Featuresbox;