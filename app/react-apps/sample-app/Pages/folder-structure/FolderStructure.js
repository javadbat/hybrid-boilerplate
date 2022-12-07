import React from 'react';
import './FolderStructure.scss';
import overallImageSrc from './images/app-folders.png';
import appImageSrc from './images/app-folder.png';
function FolderStructure() {
    return (
        <div className="folder-structure">
            <div className="folder-structure-content">
                <h1>Folder Structure</h1>
                <h4>how this project structured</h4>
                <article>
                    <h2>overall view</h2>
                    <img src={overallImageSrc}></img>
                    <p>in project root we have following folders that we will explain here:</p>
                    <ul>
                        <li>App: all of front-end stuff are here</li>
                        <li>Command: command like build,serve,start and all of their code are here</li>
                        <li>Config: we put all project config in here like url and address or app envirement or any other config we need in our app. this folder is in root becuase both nodejs server and client app using it.</li>
                        <li>Server: if you have a server side rendring page using handlebar or others all operation of those page is here, its kind of backend for it self and you can even create api in it</li>
                    </ul>
                </article>
                <article>
                    <h2>App folder</h2>
                    <img src={appImageSrc}></img>
                    <p>app folder is a main folder of this boilerplate and all front-end related source are here.</p>
                    <ul>
                        <li>Assets: static assets like css, fonts, images and some of js will be place here</li>
                        <li>
                        dist: this is a machine generated folder and you can delete it whenever you want. in this folder we keep all compiled(transpiled) 
                        file created by rollup and webpack. this folder created by <i>npm run build</i>
                        </li>
                        <li>
                        ReactApps: this boilerplate support multi app mean you  can create 3 totaly independedant react app in different sub url or even in the same page
                        please create seprate folder for each app and put common components and utils of your app in this folder <i>Component</i> and <i>Utils</i>
                        </li>
                        <li>
                        Utils: utils are js file that has no view  in them for example function like convert date, convert text format, convert file, mapping , etc
                        if you have helper or any other function that used in non-react page like *.hbs file Js file you must put them here.
                        </li>
                        <li>Views: html files and hbs(handlebar) file will be here</li>
                        <li>WebComponents: you can create and build your own web component here</li>
                    </ul>
                </article>
            </div>
        </div>
    );
}

export default FolderStructure;
