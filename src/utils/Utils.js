/**
 * Created by LG0812 on 2017/7/6.
 */
export const dispatchUrls = (url, history) => {
    console.log(url, history);
    history.push(url);
}


export const setItems = (obj) => {
    for (let key in obj) {
        sessionStorage.setItem(key, obj[key]);
    }
}

export const getItems = (list) => {
    let obj = {};
    for (let key of list) {
        obj[key] = sessionStorage.getItem(key);
    }
    return obj;
}