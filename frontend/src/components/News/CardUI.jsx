import React from 'react';
import './cardstyle.css';
import { Image, StyleSheet, Text, View } from 'react-native';


const Card = props => {
    return (
        <div className='card text-center'>
            <div className='overflow'>
                {/* <img src={props.url} alt='image' className='card-img-top'/> */}
                <Image source={{ uri: props.url }} style={{ width: 400, height: 200 }} className='card-img-top'/>
            </div>
            <div className='card-body text-dark'>
                <h4 className='card-title'>{props.title}</h4>
                <p className='card-text text-secondary'>{props.des}</p>
                <a href={props.link} className='btn btn-outline-success'>Go to site</a>
                {/* <h6 className='date'>{props.date}</h6> */}
            </div>
        </div>
    )
}

export default Card;