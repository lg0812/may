/**
 * Created by LG0812 on 2017/5/9.
 */
import {promptTypes} from "../actions/actionType"
const initialState = {
    promptStatus: true,
    promptType:1,
    promptContent:'asdafasd'
}
export const prompt = (state = initialState, action) => {
    let next = Object.assign({}, state);
    switch (action.type) {
        case promptTypes.promptLoading:
            next = Object.assign({}, state, {
                promptStatus: action.status
            })
            break;

        case promptTypes.promptSuccess:
            next = Object.assign({}, state, {
                promptStatus: action.status
            })
            break;
    }
    return next;
}