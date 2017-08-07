/**
 * Created by LG0812 on 2017/7/6.
 */
import React, {Component} from 'react';
import Login from "./Login"
import Reset from "./Reset"
import Register from "./Register"
import {login, register, reset} from "../../actions/loginController"
import {urls} from "../../utils/urls"

let interval;//定义一个定时器，在组件被 componentWillUnmount (卸载)的时候销毁
class LoginPosition extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        // 如果定时器被初始化了，销毁定时器
        if (interval) {
            interval = window.clearInterval(interval);
            console.log("---------------------->", interval)
        }
    }

    render() {
        return (
            <div className="d-flex w-100">
                <div className="container w-100 h-100">
                    <div className="d-flex h-100 flex-row align-items-center justify-content-end">
                        <div className="col-xs-12 col-sm-7 col-sm-7-mine">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>);
    }
}


const handleSubmit = (username, password, this_) => {
    console.log("username: " + username, "password:" + password, this_)
    this_.props.loginCtrl(username, password, (data) => {
        console.log("31--------------->", data)
        if (data.code == 1001) {
            this_.props.history.push(urls.public_index);
        } else if (data.code == 1005) {
            this_.setState({email_err: true})
        } else if (data.code == 1006) {
            this_.setState({password_err: true})
        }
    });
}

const handleRegister = (name, password, email, code, this_) => {
    console.log(name, password, email, code)
    register(name, password, email, code, (data) => {
            console.log(data)
            if (data.code == 1001) {
                this_.setState({type: "login", email: data.result.email})
            }
            else if (data.code == 1008) {
                this_.setState({code_err: true})
            } else if (data.code == 1007) {
                this_.setState({email_err: true})
            }
        }
    );
}

const handleReset = (email, password, code, this_) => {
    console.log(email, password, code)
    reset(email, password, code, data => {
        console.log(data);
        if (data.code == 1001) {
            this_.setState({type: "login", email: data.result.email})
        } else if (data.code == 1005) {
            this_.setState({email_err: true});
        } else if (data.code == 1008) {
            this_.setState({re_code_err: true})
        }
    });
}

let countDown = (this_, time) => {
    this_.setState({btnText: time + "s", disabled: true});
    interval = window.setInterval(() => {
        time--;
        if (time == 0) {
            interval = window.clearInterval(interval);
            console.log("---------------------->", interval)
            this_.setState({btnText: "获取验证码", disabled: false});
        } else {
            this_.setState({btnText: time + 's'});
        }
    }, 1000)
}
export {Login};
export {Reset};
export {Register};
export {LoginPosition};
export {handleSubmit, handleRegister, handleReset, countDown};