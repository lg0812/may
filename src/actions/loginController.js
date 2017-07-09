/**
 *
 */
import {host, requestMapping} from "../config/config"
export const login = (username, password, call) => {
    console.log(username, password);
    fetch(host + requestMapping.login, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "email=" + username + "&" + "password=" + password
    }).then(res => res.json()).then(data => {
        console.log(data, data.code);
        call(data);
    });
}
export const email = (email, call) => {
    console.log(email);
    fetch(host + requestMapping.send_email, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "email=" + email
    }).then(res => res.json()).then(data => {
        call(data);
    });
}
export const register = (username, password, email, verification, call) => {
    console.log(email);
    fetch(host + requestMapping.register, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "username=" + username + "&password=" + password + "&email=" + email + "&verification=" + verification
    }).then(res => res.json()).then(data => {
        console.log(data, data.code);
        call(data);
    });
}

export const reset = (email, password, verification, call) => {
    console.log(email);
    fetch(host + requestMapping.reset, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "password=" + password + "&email=" + email + "&verification=" + verification
    }).then(res => res.json()).then(data => {
        console.log(data, data.code);
        call(data);
    });
}


