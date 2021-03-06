
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import './Layout.scss';
import { fixMobileHeightVH } from '../../Utils/LayoutHelper';

function Layout() {
    useEffect(() => {
        fixMobileHeightVH();
    }, []);
    return (
        <div className="sample-app">
            <BrowserRouter basename={`/sample-app/`}>
                <Router></Router>
            </BrowserRouter>
        </div>
    );
}

export default Layout;
