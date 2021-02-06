import React from 'react';
import './AssetsLoadSample.scss';
import LoadImageByRelativePath from './Components/LoadImageByRelativePath/LoadImageByRelativePath';
import LoadByUrl from './Components/LoadImageByUrl/LoadImageByUrl';
import LoadImageWithSource from './Components/LoadImageWithSource/LoadImageWithSource';
function AssetsLoadSample() {
    return (
        <div className="assets-load-sample">
            <div className="assets-load-sample-content">
                <h1>Load Assets</h1>
                <h4>Different way to load assets in react hybrid boilerplate</h4>
                <h2>1- load image</h2>
                <article>
                    <p>
                        there is 2 way to load image in hybrid-boilerplate:
                    </p>
                    <ul>
                        <li>with absolute URL</li>
                        <li>with relative url</li>
                    </ul>
                    <LoadByUrl></LoadByUrl>
                    <LoadImageByRelativePath></LoadImageByRelativePath>
                    <LoadImageWithSource></LoadImageWithSource>
                </article>
            </div>
        </div>
    );
}

export default AssetsLoadSample;
