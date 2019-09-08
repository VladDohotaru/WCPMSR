import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

// core components
import "assets/css/material-dashboard-react.css?v=1.8.0";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import "./assets/scss/mdb.scss"


ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();

