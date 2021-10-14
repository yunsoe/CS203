import React from 'react';
import Navbar from './Navbar';
import Featuresbox from './Featuresbox';
import featureimage from './images/feature_1.png';
import featureimage1 from './images/feature_2.png';
import featureimage2 from './images/feature_3.png';
import newspaper from './images/newspaper.png';
import swabtest from './images/swabtest.png';
import calendar from './images/calendar.png';
import profile from './images/profile.png';
import feedback from './images/feedback.png';




function Header() {
    return (
        <div id = 'body'>
        <div id='main'>
           {/* <Navbar/> */}
           <div className='name'>
               <h1><span>Stay Updated</span> about all things Covid-related in Singapore</h1>
               {/* <p className='details'> What are you waiting for? Start now! </p> */}
               {/* <a href='#' className='cv-btn'>Start</a> */}
           </div>
           
        </div>
         <div id='features'>
         <div className='a-container'>
             <Featuresbox image={calendar} title="Company Events" />
             <Featuresbox image={newspaper} title="Latest Industry-Relevant News" />
             <Featuresbox image={feedback} title="Submit Feedback" />
             <Featuresbox image={swabtest} title="Upcoming SwabTests" />
             <Featuresbox image={profile} title="Profile Details" />
         </div>
     </div>
     </div>
    )
}

export default Header;