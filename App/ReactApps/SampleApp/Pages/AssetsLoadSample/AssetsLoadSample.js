import React from 'react';
import './AssetsLoadSample.scss';
import LoadImageByRelativePath from './Components/LoadImageByRelativePath/LoadImageByRelativePath';
import LoadByUrl from './Components/LoadImageByUrl/LoadImageByUrl';
import LoadImageWithSource from './Components/LoadImageWithSource/LoadImageWithSource';
import CustomizeStaticRouteImage from './customize-static-route.PNG';
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
                    <h2>Customize Behavior</h2>
                    <h4>how in this boilerplate we load assets and how you can customize its behavior</h4>
                    <article>
                        <p>
                            as this boilerplate aim for large scale app and professional use you may need to customize the way you load assets 
                            for example when your app is served on a sub route of a domain and you want your assets load from that route or when you want to add 
                            another type of assets you can use this method: 
                        </p>
                        <p>
                            in project source code go to <i>Command\Serve\StaticRoutes.js</i>
                        </p>
                        <img src={CustomizeStaticRouteImage} width="100%"></img>
                        <p>
                            you can change cache behavior or the url of the assets or event path of assets here.
                            for more information <i>this.appConfig.basePath</i> is a base path of your project and lead you to project root
                        </p>
                        <blockquote> to set assets path please use <i>path.join()</i> instead of using plain string to make it cross platform on windows and linux </blockquote>
                    </article>
                </article>
            </div>
        </div>
    );
}

export default AssetsLoadSample;
