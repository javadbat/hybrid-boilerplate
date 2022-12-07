import React from 'react';

function LoadImageByUrl() {
    return (
        <React.Fragment>
            <img src="/App/Assets/Images/600px-JavaScript-logo.png"></img>
            <p>
                to load image with absolute url you just need to put your image in <i>`/App/Assets/Images/`</i>  
                and write down image tag with url like <pre><code>&lt;img src=&quot;/App/Assets/Images/600px-JavaScript-logo.png&quot; /&gt;</code></pre> and it will loaded perfectly.
            </p>
            <p>
                load image by absolute URL is suitable for situation where you have image used in multiple page and component or your image loaded in non-react app too
            </p>
        </React.Fragment>
    );
}

export default LoadImageByUrl;
