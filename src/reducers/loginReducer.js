/**
 * Created by LG0812 on 2017/5/9.
 */
import {online} from "../actions/actionType"
const initialState = {
    userInfo: {},
    loginStatus: false
}

export const login = (state = initialState, action) => {
    switch (action.type) {
        case online.userOnline:
            return Object.assign({}, state, {
                userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
                loginStatus: action.loginStatus
            })
        default:
            return initialState;
    }
    return state;
}