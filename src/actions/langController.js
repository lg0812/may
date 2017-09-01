/**
 * Created by LG0812 on 2017/7/7.
 */
import {index, online} from "./actionType"
import {setItems, getItems} from "../utils/Utils"
export const setLocate = locate => (dispatch, getState) => {
    setItems({"mayLangType": locate});
    dispatch({
        type: index.LOCATE,
        lang: locate
    });
}


export const initMay = () => (dispatch, getState) => {
    console.log("initMay>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    let obj = getItems(["mayLangType", "mayUserInfo", "mayLoginStatus"]);
    dispatch({
        type: index.LOCATE,
        lang: obj.mayLangType ? obj.mayLangType : navigator.language
    });


    obj.mayLoginStatus ? dispatch({
        type: online.userOnline,
    }) : null
}