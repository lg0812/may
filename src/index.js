import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers'

import App from './webapp/app/App';
import index from "./webapp/index/Index"
import login from "./webapp/login/Login"
import './index.css';

// Create a history of your choosing (we're using a browser history in this
// case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)
// 另一种写法：
// import reducer from './reducers'
// const store = createStore(reducer)
// 然后再reducers中先写index.js:
// const rootReducer = combineReducers({
// todos
// })
// export default rootReducer

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

/* 在控制台打印一条有样式的文字 */
console.log("%c May %c Copyright \xa9 2017-%s",
		'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:64px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;',
		"font-size:12px;color:#999999;",
		(new Date).getFullYear());
       
ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
           <Route path="/index" component={index}/>
           <Route path="/login" component={login}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
