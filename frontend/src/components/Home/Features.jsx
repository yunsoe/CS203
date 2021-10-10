import React from 'react';
import Featuresbox from './Featuresbox';
import featureimage from './images/feature_1.png';
import featureimage1 from './images/feature_2.png';
import featureimage2 from './images/feature_3.png';

function Features() {
    return(
        <div id='features'>
            <div className='a-container'>
                <Featuresbox image={featureimage} title="Development Course" />
                <Featuresbox image={featureimage1} title="Money Saving Services" />
                <Featuresbox image={featureimage2} title="Usability Interface" />
            </div>
        </div>
    )
}

export default Features;