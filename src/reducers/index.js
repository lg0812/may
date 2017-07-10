/**
 *
 */
import {combineReducers} from 'redux'
import {login} from './loginReducer'
import {setLocate} from "./langReducers"

// 想要通过action中的dispatch 成功匹配的相应的处理函数，必须将该函数添加到rootReducer上
const rootReducer = combineReducers({
    loginRd: login,
    langRd: setLocate
})

export default rootReducer