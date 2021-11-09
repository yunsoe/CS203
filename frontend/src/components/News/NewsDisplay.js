import React, { useState, useEffect } from 'react';
import './cardstyle.css';
import Pagination from './Pagination';
import Post from './Post';

export default function News() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleInput = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    setSearchTerm(e.target.value)
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    
      fetch(`https://newsapi.org/v2/top-headlines?country=sg&category=${searchTerm}&pageSize=20&apiKey=a7b36878384f42e09d8f7d094a283986`)
        .then((response) => {
          if (response.ok) return response.json();
          throw new Error('Something went wrong while requesting posts');
        })
        .then((posts) => setPosts(posts.articles))
        .catch((error) => setError(error.message));
    
  }


  useEffect(() => {

      fetch('https://newsapi.org/v2/top-headlines?country=sg&category=health&apiKey=a7b36878384f42e09d8f7d094a283986')
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
        <form className='search-btn'>
         <select className="category" value={searchTerm} onChange={handleInput} onClick={handleSubmitClick} >
             <option  value="health">Health</option> 
             <option value="business">Business</option>
             <option value="general">General</option>
             <option value="sports">Sports</option>
             <option value="science">Science</option>
             <option value="technology">Technology</option>
         </select>
         
        </form>
          <Pagination
            data={posts}
            RenderComponent={Post}
            pageLimit={4}
            dataLimit={5}
          />
        </>
      ) : (
       <h4>Loading</h4>
      )}
    </div>
  );

}
