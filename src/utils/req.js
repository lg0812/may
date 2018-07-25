/**
 * Created by LG0812 on 2017/8/7.
 */
import {host} from "../config/config"

const formatData = (data) => {
    let str = "";
    for (let key in data) {
        str = str + key + "=" + data[key] + "&";
    }
    // 去掉最后一个 & 符号
    console.log("request params string:" + str);
    if (str)
        return str.substring(0, str.length - 1);
    else
        return str;
}

export const reqUtils = (params) => {
    // example
    // host:"http://106.14.136.160/january/"
    // path:"/login/login_in"   一般从config文件中的requestMapping对象中取值
    console.log("reqUtil", params)
    fetch(host + params.path, {
        method: params.method,
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: formatData(params.data)
    }).then(data => {
        if (data.ok) {
            let d = data.json();
            console.log(">>>>>", d)
            return d;
        } else {
            console.log("server error!");
        }
    }, e => console.log(e)).then(data => {
        params.success(data)
    });

}


export const reqFormUtils = (params) => {
    // 在fetch中  multipart/form-data; 不需要设置，否则会因为没有boundary 而导致服务其返回405
    fetch(host + params.path, {
        method: params.method,
        mode: "cors",
        body: params.data
    }).then(data => {
        if (data.ok) {
            let d = data.json();
            console.log(">>>>>", d)
            return d;
        } else {
            console.log("server error!");
        }
    }, e => console.log(e)).then(data => {
        params.success(data)
    });

}





