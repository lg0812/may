/**
 * Created by LG0812 on 2017/5/9.
 */
import {promptTypes} from "../actions/actionType"
const initialState = {
    promptStatus: false,
    promptType: 0,
    promptContent: ''
}
export const prompt = (state = initialState, action) => {
    let next = Object.assign({}, state);
    switch (action.type) {
        case promptTypes.promptLoading:
            next = Object.assign({}, state, {
                promptStatus: action.status,
                promptType: 0
            })
            break;
        case promptTypes.promptSuccess:
            next = Object.assign({}, state, {
                promptStatus: action.status,
                promptType: 1,
                promptContent: action.content
            })
            break;
    }
    return next;
}