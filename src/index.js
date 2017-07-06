import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import reducers from './reducers'
import thunk from "redux-thunk"
import logger from "redux-logger"
import App from './webapp/app/App';
import Header from "./webapp/header/Header"
import ErrorPage from "./webapp/error/Error"
import Login from "./webapp/login/Login"
import Menus from "./webapp/header/Menus"
import AuthUrls from "./webapp/dispatch/Dispatch";
import './index.css';
// const store = applyMiddleware(thunk, logger)(createStore)(reducers);

const store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
)

/* 在控制台打印一条有样式的文字 */
console.log("%c yltfy %c Copyright \xa9 2016-%s",
    'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
    "font-size:12px;color:#999999;",
    (new Date()).getFullYear());

class Frame extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-grow1 over-flow d-flex flex-row">
                <Menus/>
                <div className="w-100 over-flow-y">
                    <AuthUrls {...this.props} url={this.props.match.params.type}/>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <Provider store={store}>
        <Router >
            <div className="h-100">
                <div className="d-flex flex-column h-100">
                    <div className="flex-grow0">
                        <Header/>
                    </div>
                    <Route path="/" exact component={App}/>
                    <Route path="/auth/:type" component={Frame}/>
                    <Route path="/home" exact component={Login}/>
                    <Route path="/menus" exact component={Menus}/>
                    <Route path="/errorPage" exact component={ErrorPage}/>
                </div>
            </div>
        </Router>
    </Provider >,
    document.getElementById('root')
)






