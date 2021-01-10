import React, { lazy, Suspense } from 'react';
import PageLoader from './PageLoader';
//import Service from '../../../Service/Service'
import { Route, Switch } from "react-router-dom";
const Index = lazy(() => import('../../Pages/Index/Index'));

function Router() {
    return (
        <Suspense fallback={<div><PageLoader /> </div>}>
            <Switch>
                <Route path="/" component={Index}></Route>
            </Switch>
        </Suspense>
    );
}

export default Router;
