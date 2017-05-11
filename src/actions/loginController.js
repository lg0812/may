/**
 *
 */
import {host} from "../config/config"
export const login = (username, password) => (dispatch) => {
    console.log(username, password);
    return fetch(host + "login/login_in", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "email=" + username + "&" + "password=" + password
    }).then(res => res.json()).then(data => {
        console.log(data, data.code);
        if (data.code == 1001) {
            console.log("1001");
            dispatch({
                type: "login",
                data
            });
        }
    });
}


