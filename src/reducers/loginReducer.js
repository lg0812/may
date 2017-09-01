/**
 * Created by LG0812 on 2017/5/9.
 */
import {online} from "../actions/actionType"
const initialState = {
    userInfo: {},
    loginStatus: false
}

export const login = (state = initialState, action) => {
    var next = Object.assign({}, state);
    switch (action.type) {
        case online.userOnline:
            next = Object.assign({}, state, {
                userInfo: JSON.parse(sessionStorage.getItem("mayUserInfo")),
                loginStatus: (sessionStorage.getItem("mayLoginStatus") == "true") ? true : false
            })
            break;
    }
    return next;
}

export const logout = (state = initialState, action) => {
    var next = Object.assign({}, state);
    switch (action.type) {
        case online.userOtline:
            next = Object.assign({}, state, {
                userInfo: {},
                loginStatus: false
            })
            break;
    }
    return next;
}