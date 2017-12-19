import {promptTypes} from "../actions/actionType"
export const promptOp = (args) => (dispatch) => {
    console.log(args);
    dispatch({
        status: args.status,
        type: args.type,
        content: args.content ? args.content : ''
    });
    if (args.type == promptTypes.promptSuccess) {
        setTimeout(() => {
            dispatch({
                status: false,
                type: args.type,
            });
        }, 1500)
    }
}
