import React from 'react';
import Navbar from './Navbar';
import Featuresbox from './Featuresbox';
import featureimage from './images/feature_1.png';
import featureimage1 from './images/feature_2.png';
import featureimage2 from './images/feature_3.png';

function Header() {
    return (
        <div id = 'body'>
        <div id='main'>
           {/* <Navbar/> */}
           <div className='name'>
               <h1><span>Stay Updated about all things Covid-Related in Singapore</span></h1>
               {/* <p className='details'> What are you waiting for? Start now! </p> */}
               {/* <a href='#' className='cv-btn'>Start</a> */}
           </div>
           
        </div>
         <div id='features'>
         <div className='a-container'>
             <Featuresbox image={featureimage} title="Company Events" />
             <Featuresbox image={featureimage1} title="Latest Industry-Relevant News" />
             <Featuresbox image={featureimage2} title="Submit Feedback" />
             <Featuresbox image={featureimage1} title="Upcoming SwabTests" />
             <Featuresbox image={featureimage2} title="Profile Details" />
         </div>
     </div>
     </div>
    )
}

export default Header;