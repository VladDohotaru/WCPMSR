import React, { Component } from 'react';
import { Link, Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Secret from './components/Secret';
import Login from './components/Login';

import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

export default class App extends Component {
  render() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secret">Secret</Link>
          </li>
        </ul>

        <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/rtl" component={RTL} />
            <Route path="/" exact component={Home} />
            <Route path="/secret" component={Secret} />
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </div>
    </Router>
  );
}
}