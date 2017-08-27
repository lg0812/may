import {QRCode} from "../plugins/qrcode"
import {host} from "../config/config"
export const createQrcode = (options) => {

}

export const download = (url, name) => {
    var link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export const req = (params) => {

}

export const pathSeparator = (path) => {
    if (path)
        return host + path.replace(/\\/g, function (separator) {
                return "/";
            }).split(/january\//)[1];
    else
        return path;
}

export const getInfo = function (data, ...args) {
    let temp = data;
    for (let t = 0; t < args.length; t++) {
        temp = temp[args[t]];
        if (notEmpty(temp)) {
        } else {
            return "";
        }
    }
    return temp;
}

const notEmpty = function (obj) {
    if (obj != null && obj != undefined) {
        return true;
    }
    return false;
}