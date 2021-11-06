import React from 'react';
import './cardstyle.css';
import { Image } from 'react-native';



function Post(props) {
    const { id, urlToImage, title, description, url } = props.data;
    return (
      <div className="post">
        <Image source={{ uri: urlToImage }} style={{ width: 640, height: 300, borderTopRightRadius: 20, borderTopLeftRadius: 20,}} ></Image>
        <small>{id}</small>
        <h1>{title}</h1>
        <h4>{description}</h4>
        <a href={url} className='btn btn-outline-success'>Go to Site</a>
      </div>
    );
  }

  export default Post;