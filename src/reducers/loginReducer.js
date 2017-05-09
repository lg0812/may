/**
 * Created by LG0812 on 2017/5/9.
 */
const initialState = [
    {
        data: {}
    }
]

export default function login(state = initialState, action) {
    switch (action.type) {
        case "login":
            return state = action.data;
        default:
            return initialState;
    }
}