import React from 'react';
import { Link } from 'react-router-dom';
import './Index.scss';
function Index() {
    return (
        <div className="index-page">
            <div className="content-box">
                <div className="logo-wrapper">
                    <img src="/App/Assets/Images/react-logo.svg"></img>
                </div>
                <div className="project-title">ReactJs App Sample</div>
                <div className="link-box">
                    <Link to="/assets-load-sample">assets load sample</Link>
                </div>
            </div>
        </div>
    );
}

export default Index;
