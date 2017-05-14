/**
 *
 */
import {host} from "../config/config"
export const login = (username, password, call) => (dispatch) => {
    console.log(username, password);
    fetch(host + "login/login_in", {
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
        call(data);
    });
}
export const email = (email, call) => (dispatch) => {
    console.log(email);
    fetch(host + "login/send_email", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "email=" + email
    }).then(res => res.json()).then(data => {
        console.log(data, data.code);
        if (data.code == 1001) {
            console.log("1001");
            dispatch({
                type: "email",
                data
            });
        }
        call(data);
    });
}
export const register = (username, password, email, verification, call) => (dispatch) => {
    console.log(email);
    fetch(host + "login/register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "username=" + username + "&password=" + password + "&email=" + email + "&verification=" + verification
    }).then(res => res.json()).then(data => {
        console.log(data, data.code);
        if (data.code == 1001) {
            console.log("1001");
            dispatch({
                type: "email",
                data
            });
        }
        call(data);
    });
}

export const reset = (email, password, verification, call) => (dispatch) => {
    console.log(email);
    fetch(host + "login/reset_pw", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "password=" + password + "&email=" + email + "&verification=" + verification
    }).then(res => res.json()).then(data => {
        console.log(data, data.code);
        if (data.code == 1001) {
            console.log("1001");
            dispatch({
                type: "reset",
                data
            });
        }
        call(data);
    });
}


