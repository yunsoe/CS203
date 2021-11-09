import React, { useState, useEffect } from 'react';
import './cardstyle.css';
import Pagination from './Pagination';
import Post from './Post';

export default function News() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=sg&category=health&pageSize=20&apiKey=a7b36878384f42e09d8f7d094a283986')
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Something went wrong while requesting posts');
      })
      .then((posts) => setPosts(posts.articles))
      .catch((error) => setError(error.message));
  }, []);

  //console.log(posts.articles)
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            pageLimit={3}
            dataLimit={5}
          />
        </>
      ) : (
       <h6>No News to display</h6>
      )}
    </div>
  );

}
