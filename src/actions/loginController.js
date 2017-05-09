/**
 *
 */
import fetch from "isomorphic-fetch"
export const login = (username, password) => {
    console.log(username, password);
    fetch("http://localhost:8080/january/login/login_in", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "username=" + username + "&" + "password=" + password
    }).then(res => {
        console.log(res, res.ok);
        res.json().then(data => {
            console.log(data)
        });
    })
}