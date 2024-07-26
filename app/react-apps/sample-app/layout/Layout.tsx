
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router.tsx';
// import './Layout.scss';
import { fixMobileHeightVH } from '../../utils/layout-helper.ts';
import { AppLayout } from './Layout.styled.ts';
import { reactAppList } from '@config/build-config.ts';

function Layout() {
    useEffect(() => {
        fixMobileHeightVH();
    }, []);
    return (
        <AppLayout>
            <BrowserRouter basename={`/${reactAppList[0].urlPrefix}`}>
                <Router></Router>
            </BrowserRouter>
        </AppLayout>
    );
}

export default Layout;
