import React from "react";
import { Route, Switch } from "react-router-dom";
// Components
// import Login from "./components/Login";
import Register from "./components/Register";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Home from './components/Home';

export default (
    <Switch>
        <Route path="/Profile" component={Profile} />
        <Route path='/Register' component={Register} />
        <Route path="/Feed" component={Feed} />
        <Route exact path="/" component={Home} />
    </Switch>
);