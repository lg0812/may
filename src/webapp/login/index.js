/**
 * Created by LG0812 on 2017/7/6.
 */
import React, {Component} from 'react';
import Login from "./Login"
import Reset from "./Reset"
import Register from "./Register"
import md5 from "js-md5"
import {OverlayTrigger, Popover} from "react-bootstrap"
class LoginPosition extends Component {

    constructor(props) {
        super(props);
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
const callback = (data, this_) => {
    console.log(data, this_);
    if (data.code == 1001) {
        this.props.history.push("/index");
    } else if (data.code == 1005) {
        this_.setState({email_err: true})
    } else if (data.code == 1006) {
        this_.setState({password_err: true})
    }
}

const handleSubmit = (username, password, this_) => {
    console.log("username: " + username, "password:" + password, this_)
    this.props.loginAction.login(username, password, (data) => {
        console.log("31--------------->", data)
        return this.callback(data, this_)
    });
}

const handleRegister = (name, password, email, code, this_) => {
    console.log(name, password, email, code)
    this.props.loginAction.register(name, password, email, code, (data) => {
            console.log(data)
            if (data.code == 1001) {
                this.setState({type: "login", email: data.result.email})
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
    this.props.loginAction.reset(email, password, code, data => {
        console.log(data);
        if (data.code == 1001) {
            this.setState({type: "login", email: data.result.email})
        } else if (data.code == 1005) {
            this_.setState({email_err: true});
        } else if (data.code == 1008) {
            this_.setState({re_code_err: true})
        }
    });
}

let countDown = (this_, time) => {
    this_.setState({btnText: time + "s", disabled: true});
    let interval = window.setInterval(() => {
        time--;
        if (time == 0) {
            window.clearInterval(interval);
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