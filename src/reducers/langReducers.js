/**
 * Created by LG0812 on 2017/7/7.
 */
import * as langs from "../lang"
import {index} from "../actions/actionType"
const initialState = {
    lang: langs.zh_CN
}

export const setLocate = (state = initialState, action) => {
    var next = Object.assign({}, state);
    switch (action.type) {
        case index.LOCATE:
            let temp = action.lang;
            // console.log(temp.replace(/-/g, "_"), langs, langs[temp.replace(/-/g, "_")])
            // return state.lang = langs[temp.replace(/-/g, "_")];
            next = Object.assign({}, state, {lang: langs[temp.replace(/-/g, "_")]})
            break;
    }
    return next;
}