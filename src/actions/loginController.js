/**
 * 
 */
import fetch from "isomorphic-fetch"
export const login = (username,password) => {
        fetch("/login/login_in",{
            method:"POST",
            username:username,
            password:password
        }).then(function(resp){
            return resp.json().then(function(data){
                console.log(data);
            });
        })
}
