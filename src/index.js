import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {Route, BrowserRouter as Router, matchPath} from 'react-router-dom'
import "./plugins/bootstrap-3.3.7/dist/css/bootstrap.css"
import "./plugins/font-awesome-4.7.0/css/font-awesome.css"
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
import "./plugins/font-awesome-4.7.0/css/font-awesome.css"
import {setLocate, initMay} from "./actions/langController"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// const store = applyMiddleware(thunk, logger)(createStore)(reducers);
const store = createStore(
    reducers,
    applyMiddleware(thunk, logger)
)

// 设置语言种类,默认从浏览器获取  语言种类
store.dispatch(initMay());
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
                    <Route path="/january/private/index" exact component={Index}/>
                    <Route path="/january/private/basic" exact component={con.Basic}/>
                </div>
            </div>
        )
    }
}

class Public extends Component {
    render() {
        return (
            <div className="flex-grow1 over-flow d-flex flex-row">
                <Route path="/january/public/index" exact component={App}/>
                <Route path="/january/public/menus" exact component={Menus}/>
                <Route path="/january/public/news" exact component={con.News}/>
                <Route path="/january/public/help" exact component={con.Help}/>
                <Route path="/january/public/about" exact component={con.About}/>
                <Route path="/january/public/login" exact component={user.Login}/>
                <Route path="/january/public/reset" exact component={user.Reset}/>
                <Route path="/january/public/register" exact component={user.Register}/>
                <Route path="/january/public/errorPage" exact component={ErrorPage}/>
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
                <Route path="/january/" exact component={App}/>
                <Route path="/january/private/" component={Controls}/>
                <Route path="/january/public/" component={Public}/>
                <Route path="/january/public/" component={Footer}></Route>
            </div>
        </div>)
    }
}
const mapStateToProps = state => ({
    lang: state.lang
})

const mapDispatchToProps = dispatch => ({
    setLocate: bindActionCreators(setLocate, dispatch),
})
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={withRouter(connect(
                mapStateToProps,
                mapDispatchToProps
            )(Entry))}/>
        </Router>
    </Provider >,
    document.getElementById('root')
)






