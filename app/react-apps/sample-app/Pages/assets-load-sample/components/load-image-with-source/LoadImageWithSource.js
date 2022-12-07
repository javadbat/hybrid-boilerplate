import React from 'react';
import webpackLogo from './webpack-logo.svg';
function LoadImageWithSource() {
    return (
        <React.Fragment>
            <img src={webpackLogo} />
            <p>
             as you can see we load svg image as base64 for default and its not load by url.
            </p>
            <p>
                you can change default behavior of loading image in BuildModule manually but by default svg will load in base64 and other by relative url
            </p>
        </React.Fragment>
    );
}

export default LoadImageWithSource;
