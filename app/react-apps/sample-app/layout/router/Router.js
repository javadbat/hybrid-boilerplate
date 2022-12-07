import React, { lazy, Suspense } from 'react';
import PageLoader from './PageLoader';
//import Service from '../../../Service/Service'
import { Route, Routes } from "react-router-dom";
const Index = lazy(() => import('../../Pages/index/Index'));
const FolderStructure = lazy(() => import('../../Pages/folder-structure/FolderStructure'));
const AssetsLoadSample = lazy(() => import('../../Pages/assets-load-sample/AssetsLoadSample'));
function Router() {
    return (
        <Suspense fallback={<div><PageLoader /> </div>}>
            <Routes>
                <Route path="/folder-structure" element={<FolderStructure />} exact={true}></Route>
                <Route path="/assets-load-sample" element={<AssetsLoadSample />} exact={true}></Route>
                <Route path="/" element={<Index />}></Route>
            </Routes>
        </Suspense>
    );
}

export default Router;
