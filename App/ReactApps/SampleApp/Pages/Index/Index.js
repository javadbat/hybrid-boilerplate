import React from 'react';
import { Link } from 'react-router-dom';

import './Index.scss';
import { SampleAppTitle } from '../../Components/Layouts/AppTitle/AppTitle';

function Index() {
    return (
        <div className="index-page">
            <div className="content-box">
                <div className="logo-wrapper">
                    <img src="/App/Assets/Images/react-logo.svg"></img>
                </div>
                <SampleAppTitle />
                <div className="link-box">
                    <Link to="/assets-load-sample">assets load sample</Link>
                    <Link to="/folder-structure">folder structure</Link>
                </div>
            </div>
        </div>
    );
}

export default Index;