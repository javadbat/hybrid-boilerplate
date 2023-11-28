
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
// import './Layout.scss';
import { fixMobileHeightVH } from '../../utils/layout-helper';
import { AppLayout } from './Layout.styled';
import { buildConfig } from '../../../../config/build-config';

function Layout() {
    useEffect(() => {
        fixMobileHeightVH();
    }, []);
    return (
        <AppLayout>
            <BrowserRouter basename={`/${buildConfig.reactApps.appList[0].urlPrefix}`}>
                <Router></Router>
            </BrowserRouter>
        </AppLayout>
    );
}

export default Layout;
