
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
// import './Layout.scss';
import { fixMobileHeightVH } from '../../utils/layout-helper';
import { AppLayout } from './Layout.styled';

function Layout() {
    useEffect(() => {
        fixMobileHeightVH();
    }, []);
    return (
        <AppLayout>
            <BrowserRouter basename={`/sample-app`}>
                <Router></Router>
            </BrowserRouter>
        </AppLayout>
    );
}

export default Layout;
