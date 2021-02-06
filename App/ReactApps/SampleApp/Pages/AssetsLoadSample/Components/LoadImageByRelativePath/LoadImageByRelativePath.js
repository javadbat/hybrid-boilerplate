import React from 'react';
import rxImage from './image.jpg';
function LoadImageByRelativePath() {
    return (
        <React.Fragment>
            <img src={rxImage}></img>
            <p>
                here we put image beside component js file and import it 
                <pre><i>import rxImage from &apos;./image.jpg&apos;</i></pre>
                then we set image src with rxImage
                <pre><code>&lt;img src={"{ rxImage }"} /&gt;</code></pre>
            </p>
        </React.Fragment>
    );
}

export default LoadImageByRelativePath;
