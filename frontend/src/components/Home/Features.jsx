import React from 'react';
import Featuresbox from './Featuresbox';
import featureimage from './images/feature_1.png';
import featureimage1 from './images/feature_2.png';
import featureimage2 from './images/feature_3.png';

function Features() {
    return(
        <div id='features'>
            <div className='a-container'>
                <Featuresbox image={featureimage} title="Create New Company Events" />
                <Featuresbox image={featureimage1} title="Read The Latest Industry-Relevant News" />
                <Featuresbox image={featureimage2} title="Submit Feedback" />
                <Featuresbox image={featureimage1} title="Information Of Upcoming SwabTests" />
                <Featuresbox image={featureimage2} title="Profile Details" />
            </div>
        </div>
    )
}

export default Features;