import React from "react";
import ReactDOM from "react-dom";
import App from "./app.context.js"
// import App from "./app.js";
import 'jquery/dist/jquery.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import './index.context.css';
import {ItemProvider} from './context.js';

ReactDOM.render(<ItemProvider><App /></ItemProvider>, document.getElementById("root"));



