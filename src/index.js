import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import {Router, Route, Redirect} from 'react-router'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'
import thunk from "redux-thunk"
import logger from "redux-logger"
import App from './webapp/app/App';
import index from "./webapp/index/Index"
import login from "./webapp/login/Login"
import './index.css';
const store = applyMiddleware(thunk, logger)(createStore)(reducers);
const history = createHistory()
/* 在控制台打印一条有样式的文字 */
console.log("%c May %c Copyright \xa9 2016-%s",
    'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
    "font-size:12px;color:#999999;",
    (new Date).getFullYear());


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route path="/" exact component={App}/>
                <Route path="/index" component={index}/>
                <Route path="/login" component={login}/>
                <Route path="/register" component={login}/>
                <Route path="/reset" component={login}/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

