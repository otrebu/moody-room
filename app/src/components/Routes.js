import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Current } from './pages/current';
import { History } from './pages/history';
import { Settings } from './pages/settings';

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
