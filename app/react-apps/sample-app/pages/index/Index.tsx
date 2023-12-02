import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../../../assets/images/react-logo.svg';
import './Index.scss';
import { SampleAppTitle } from '../../components/layouts/app-title/AppTitle';
function Index() {
    return (
        <div className="index-page">
            <div className="content-box">
                <div className="logo-wrapper">
                    <img src="/app/assets/images/react-logo.svg"></img>
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