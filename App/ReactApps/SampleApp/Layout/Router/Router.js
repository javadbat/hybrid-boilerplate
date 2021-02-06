import React, { lazy, Suspense } from 'react';
import PageLoader from './PageLoader';
//import Service from '../../../Service/Service'
import { Route, Switch } from "react-router-dom";
const Index = lazy(() => import('../../Pages/Index/Index'));
const AssetsLoadSample = lazy(() => import('../../Pages/AssetsLoadSample/AssetsLoadSample'));
function Router() {
    return (
        <Suspense fallback={<div><PageLoader /> </div>}>
            <Switch>
                <Route path="/assets-load-sample" component={AssetsLoadSample} exact={true}></Route>
                <Route path="/" component={Index}></Route>
            </Switch>
        </Suspense>
    );
}

export default Router;
