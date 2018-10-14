import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Current } from './pages/Current';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/current" component={Current} />
        <Route exact path="/history/" component={History} />
        <Route exact path="/history/:count" component={History} />
        {/* <Route exact path="/people" component={People} /> */}
        <Route exact path="/settings" component={Settings} />
    </Switch>
);

export default Routes;
