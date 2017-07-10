/**
 * Created by LG0812 on 2017/7/7.
 */
import * as langs from "../lang"
import * as types from "../actions/actionType"
const initialState = {
    lang: langs.zh_CN
}

export const setLocate = (state = initialState, action) => {
    switch (action.type) {
        case types.index.LOCATE:
            let temp = action.lang;
            // console.log(temp.replace(/-/g, "_"), langs, langs[temp.replace(/-/g, "_")])
            // return state.lang = langs[temp.replace(/-/g, "_")];
            return Object.assign({}, state, {lang: langs[temp.replace(/-/g, "_")]})
        default:
            return state;
    }
}