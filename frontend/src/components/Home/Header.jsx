import React from 'react';
import Navbar from './Navbar';

function Header() {
    return (
        <div id='main'>
           <Navbar/>
           <div className='name'>
               <h1><span>Stay Updated about all things Covid-Related in Singapore</span></h1>
               {/* <p className='details'> What are you waiting for? Start now! </p> */}
               {/* <a href='#' className='cv-btn'>Start</a> */}
           </div>
        </div>
    )
}

export default Header;