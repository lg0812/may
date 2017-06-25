import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import reducers from './reducers'
import thunk from "redux-thunk"
import logger from "redux-logger"
import App from './webapp/app/App';
import index from "./webapp/index/Index"
import login from "./webapp/login/Login"
import './index.css';
// const store = applyMiddleware(thunk, logger)(createStore)(reducers);

const store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
)

/* 在控制台打印一条有样式的文字 */
console.log("%c May %c Copyright \xa9 2016-%s",
    'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
    "font-size:12px;color:#999999;",
    (new Date).getFullYear());

ReactDOM.render(
    <Provider store={store}>
        <Router >
            <Route path="/" exact component={App}/>
            <Route path="/index" component={index}/>
            <Route path="/user" exact component={login}/>
        </Router>
    </Provider >,
    document.getElementById('root')
)





