/**
 * Created by LG0812 on 2017/7/6.
 */
import React, {Component} from 'react';
import {LoginPosition, handleRegister, countDown} from "./index"
import Reset from "./Reset";
import md5 from "js-md5"
import {OverlayTrigger, Popover} from "react-bootstrap"
import {dispatchUrls} from "../../utils/Utils"
import {urls} from "../../utils/urls"
import {email} from "../../actions/loginController"
class RegisterPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            btnText: "获取验证码",
            username_err: false,
            pasword_err: false,
            email_err: false,
            code_err: false,
            username_err_info: "昵称 必须由6-10位字母,数字,下划线组成",
            pasword_err_info: "密码错误",
            email_err_info: "邮箱错误或者已被注册",
            code_err_info: "验证码错误"
        }
    }

    sendMail() {
        console.log(this.refs.r_email.value,">>>>>>>>>>")
        // 倒计时
        countDown(this, 60);
        email(this.refs.r_email.value, data => {
            console.log(data)
        });
    }

    submit = () => {
        let flag = true;
        if (this.refs.r_username.value == "") {
            flag = false;
            this.setState({username_err: true});
        }
        if (this.refs.r_password.value == "") {
            flag = false;
            this.setState({pasword_err: true});
        }
        if (this.refs.r_email.value == "") {
            flag = false;
            this.setState({email_err: true});
        }
        if (this.refs.r_code.value == "") {
            flag = false;
            this.setState({code_err: true});
        }
        if (flag) {
            this.props.submit_register(this.refs.r_username.value, md5(this.refs.r_password.value),
                this.refs.r_email.value, this.refs.r_code.value, this);
        }
    }


    popoverRight(content) {
        // console.log("content------->" + content)
        return (
            <Popover id="popover-positioned-scrolling-right">
                <div className="row" style={{"width": "150px"}}>
                    <div className="col-xs-12">{content}</div>
                </div>
            </Popover>
        );
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">注册</div>
                <div className="panel-body">
                    <form>
                        <div className="p-r">
                            <div className="input-group" ref="name_ref">
                                        <span className="input-group-addon" id="r_basic-addon1">
                                            <span className="fa fa-user-o w14 f14"></span>
                                        </span>
                                <input type="text" className="form-control" placeholder="昵称" onChange={(e) => {
                                    console.log(e);
                                    if (e.target.value != "") {
                                        console.log(e.target.value);
                                        this.setState({username_err: false});
                                    } else {
                                        this.setState({username_err: true});
                                    }
                                }}
                                       ref="r_username" aria-describedby="r_basic-addon1"/>
                            </div>
                            <OverlayTrigger container={this.refs.name_ref} rootClose
                                            trigger={ ['hover', 'focus', 'click']} placement="right"
                                            overlay={this.popoverRight(this.state.username_err_info)}>
                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right " + (this.state.username_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span></OverlayTrigger>
                        </div>
                        <br/>
                        <div className="p-r">
                            <div className="input-group" ref="pass_ref">
                                        <span className="input-group-addon" id="r_asic-addon2">
                                        <span className="fa fa-lock w14 f14"></span>
                                        </span>
                                <input type="password" className="form-control" placeholder="密码" onChange={(e) => {
                                    console.log(e);
                                    if (e.target.value != "") {
                                        console.log(e.target.value);
                                        this.setState({pasword_err: false});
                                    } else {
                                        this.setState({pasword_err: true});
                                    }
                                }}
                                       ref="r_password" aria-describedby="r_basic-addon2"/>

                            </div>
                            <OverlayTrigger container={this.refs.pass_ref} rootClose
                                            trigger={ ['hover', 'focus', 'click']} placement="right"
                                            overlay={this.popoverRight(this.state.pasword_err_info)}>
                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right " + (this.state.pasword_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span></OverlayTrigger>
                        </div>
                        <br/>
                        <div className="p-r">
                            <div className="input-group" ref="email_ref">
                                        <span className="input-group-addon" id="r_asic-addon4">
                                        <span className="fa fa-envelope-o w14 f14"></span>
                                        </span>
                                <input type="email" className="form-control" placeholder="邮箱" onChange={(e) => {
                                    console.log(e);
                                    if (e.target.value != "") {
                                        console.log(e.target.value);
                                        this.setState({email_err: false});
                                    } else {
                                        this.setState({email_err: true});
                                    }
                                }}
                                       ref="r_email" aria-describedby="r_basic-addon4"/>
                            </div>
                            <OverlayTrigger container={this.refs.email_ref} rootClose
                                            trigger={ ['hover', 'focus', 'click']} placement="right"
                                            overlay={this.popoverRight(this.state.email_err_info)}>
                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right " + (this.state.email_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span></OverlayTrigger>
                        </div>
                        <br/>
                        <div className="p-r">
                            <div className="input-group" ref="code_ref">
                                <input type="text" className="form-control" placeholder="验证码" onChange={(e) => {
                                    console.log(e);
                                    if (e.target.value != "") {
                                        console.log(e.target.value);
                                        this.setState({code_err: false});
                                    } else {
                                        this.setState({code_err: true});
                                    }
                                }}
                                       ref="r_code" aria-describedby="r_basic-addon3"/>
                                <span className="input-group-btn" id="r_basic-addon3">
                                         <button className="btn btn-secondary" type="button"
                                                 disabled={this.state.disabled}
                                                 onClick={this.sendMail.bind(this)}>{this.state.btnText}</button>
                            </span>
                            </div>
                            <OverlayTrigger container={this} rootClose
                                            trigger={ ['hover', 'focus', 'click']} placement="right"
                                            overlay={this.popoverRight(this.state.code_err_info)}>
                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right pp " + (this.state.code_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span>
                            </OverlayTrigger>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col-xs-12">
                            <button className="btn btn-link"
                                    onClick={() => dispatchUrls(urls.public_login, this.props.history)}>返回登录
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-primary  col-xs-12"
                            onClick={() => this.submit()}>
                        register
                    </button>
                </div>
            </div>
        );
    }
}

class Register extends Component {
    render() {
        return (
            <LoginPosition>
                <RegisterPanel {...this.props}
                               submit_register={handleRegister.bind(this)}/>
            </LoginPosition>
        )
    }
}
export default Register;