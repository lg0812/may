import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Route, BrowserRouter as Router, matchPath} from 'react-router-dom'
import "./plugins/bootstrap-3.3.7/dist/css/bootstrap.css"
import reducers from './reducers'
import thunk from "redux-thunk"
import logger from "redux-logger"
import App from './webapp/app/App';
import Header from "./webapp/header/Header"
import Footer from "./webapp/header/Footer"
import ErrorPage from "./webapp/error/Error"
import * as user from "./webapp/login"
import Menus from "./webapp/header/Menus"
import * as con from "./webapp/container"
import Index from "./webapp/index/Index"
import {withRouter} from "react-router"
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

class Controls extends Component {
    render() {
        return (
            <div className="flex-grow1 over-flow d-flex flex-row">
                <Menus {...this.props.history}/>
                <div className="w-100 over-flow-y">
                    <Route path="/private/index" exact component={Index}/>
                    <Route path="/private/basic" exact component={con.Basic}/>
                </div>
            </div>
        )
    }
}

class Public extends Component {
    render() {
        return (
            <div className="flex-grow1 over-flow d-flex flex-row">
                <Route path="/public/index" exact component={App}/>
                <Route path="/public/menus" exact component={Menus}/>
                <Route path="/public/news" exact component={con.News}/>
                <Route path="/public/help" exact component={con.Help}/>
                <Route path="/public/about" exact component={con.About}/>
                <Route path="/public/login" exact component={user.Login}/>
                <Route path="/public/reset" exact component={user.Reset}/>
                <Route path="/public/register" exact component={user.Register}/>
                <Route path="/public/errorPage" exact component={ErrorPage}/>
            </div>)
    }
}


class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (<div className="h-100">
            <div className="d-flex flex-column h-100">
                <div className="flex-grow0">
                    <Header {...this.props}/>
                </div>
                <Route path="/" exact component={App}/>
                <Route path="/private/" component={Controls}/>
                <Route path="/public/" component={Public}/>
                <Route path="/public/" component={Footer}></Route>
            </div>
        </div>)
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={withRouter(Entry)}/>
        </Router>
    </Provider >,
    document.getElementById('root')
)






