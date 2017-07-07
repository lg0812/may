/**
 *
 */
import {combineReducers} from 'redux'
import login from './loginReducer'
import lang from "./langReducers"
const rootReducer = combineReducers({
    login: login,
    lang: lang
})

export default rootReducer