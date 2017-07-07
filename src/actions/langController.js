/**
 * Created by LG0812 on 2017/7/7.
 */
import * as types from "./actionType"
export const setLocate = locate => (dispatch, getState) => {
    dispatch({
        type: types.index.LOCATE,
        lang: locate
    })
}
