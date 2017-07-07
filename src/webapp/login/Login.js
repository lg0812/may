/**
 *
 */
import React, {Component} from 'react';
import "../../plugins/font-awesome-4.7.0/css/font-awesome.css"
import "../../index.css"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'
import * as loginAction from "../../actions/loginController"
import {OverlayTrigger, Popover} from "react-bootstrap"
import md5 from "js-md5"


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "login",
            email: ""
        }
    }

    handleSubmit(username, password, this_) {
        console.log("username: " + username, "password:" + password, this_)
        this.props.loginAction.login(username, password, (data) => {
            console.log("31--------------->", data)
            return this.callback(data, this_)
        });
    }

    changeType(type) {
        console.log(type)
        this.setState({type: type})
    }

    handleRegister(name, password, email, code, this_) {
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

    handleReset(email, password, code, this_) {
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

    callback(data, this_) {
        console.log(data, this_);
        if (data.code == 1001) {
            this.props.history.push("/index");
        } else if (data.code == 1005) {
            this_.setState({email_err: true})
        } else if (data.code == 1006) {
            this_.setState({password_err: true})
        }
    }

    redirect() {
        this.props.history.push("/user/register");
    }


    render() {
        console.log("------------->", this, "username--->" + this.state.username);
        switch (this.state.type) {
            case "login":
                return (
                    <LoginPosition>
                        <LoginPanel {...this.props} email={this.state.email}
                                    changeType={this.changeType.bind(this)}
                                    submit={this.handleSubmit.bind(this)}/>
                    </LoginPosition>
                );
            case "register":
                return (
                    <LoginPosition>
                        <RegisterPanel {...this.props} changeType={this.changeType.bind(this)}
                                       submit_register={this.handleRegister.bind(this)}/>
                    </LoginPosition>
                );
            case "reset":
                return (
                    <LoginPosition>
                        <ResetPanel {...this.props} changeType={this.changeType.bind(this)}
                                    submit_reset={this.handleReset.bind(this)}/>
                    </LoginPosition>
                );
        }

    }
}

const mapStateToProps = state => ({
    login: state.login
})

const mapDispatchToProps = dispatch => ({
    loginAction: bindActionCreators(loginAction, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

class LoginPosition extends Component {

    constructor(props) {
        super(props);
        // type : this.props.type.isRequired
    }

    render() {
        console.log(this, this.props);
        return (
            <div className="fixed-center">
                <div className="container" style={{height: "75%"}}>
                    <div className="row d-flex align-items-center h-100">
                        <div className="col-xs-12 col-sm-7 col-md-7 col-lg-5 col-xl-5">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>);
    }
}

class LoginPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            email_err: false,
            password_err: false,
            email_err_info: "邮箱号错误",
            password_err_info: "密码错误"
        }
    }

    handlerUsername(e) {
        console.log(e)
        this.setState({"email": e.target.value});
        if (e.target.value != "") {
            console.log(e.target.value);
            this.setState({email_err: false});
        } else {
            this.setState({email_err: true});
        }

    }

    popoverRight(content) {
        console.log("content------->" + content)
        return (
            <Popover id="popover-positioned-scrolling-right">
                <div className="row" style={{"width": "150px"}}>
                    <div className="col-xs-12">{content}</div>
                </div>
            </Popover>
        );
    }

    handlerPassword() {
        console.log(this)
        this.setState({"password": this.refs.password.value});
    }

    submit() {
        console.log(this)
        this.props.submit(this.refs.email.value, md5(this.refs.password.value), this);
    }

    render() {
        console.log(this)
        return (
            <div className="panel panel-default">
                <div className="panel-heading">登录</div>
                <div className="panel-body">
                    {/*
                     * <div className="form-group"> <label
                     * className="sr-only">用户名</label> <input
                     * className="form-control" placeholder="username"
                     * name="username"/> </div> <div className="form-group">
                     * <label className="sr-only">密码</label> <input
                     * type="password" className="form-control"
                     * placeholder="password" name="password"/> </div>
                     */}
                    {/*
                     *
                     * <InputGroup> <InputGroup.Addon><span className="fa
                     * fa-user-o f14"></span> </InputGroup.Addon>
                     * <FormControl type="text" placeholder="username"/>
                     * </InputGroup> <br/> <InputGroup> <InputGroup.Addon>
                     * <span className="fa fa-lock f14 w14"></span>
                     * </InputGroup.Addon> <FormControl type="password"
                     * placeholder="password"/> </InputGroup> <br/>
                     */}
                    <form>
                        <div className="p-r">
                            <div className="input-group" ref="login_email_ref">
                                        <span className="input-group-addon" id="basic-addon1">
                                            <span className="fa fa-envelope-o w14 f14"></span>
                                        </span>
                                <input type="text" className="form-control" placeholder="请使用邮箱号登录"
                                       value={this.state.email} onChange={this.handlerUsername.bind(this)}
                                       ref="email" aria-describedby="basic-addon1"/>

                            </div>
                            <OverlayTrigger container={this.refs.login_email_ref} rootClose
                                            trigger={ ['hover', 'focus', 'click']} placement="right"
                                            overlay={this.popoverRight(this.state.email_err_info)}>
                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right " + (this.state.email_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span></OverlayTrigger>
                        </div>
                        <br/>
                        <div className="p-r">
                            <div className="input-group" ref="login_password_ref">
                                        <span className="input-group-addon" id="basic-addon2">
                                        <span className="fa fa-lock w14 f14"></span>
                                        </span>
                                <input type="password" className="form-control" placeholder="密码" onChange={(e) => {
                                    console.log(e);
                                    if (e.target.value != "") {
                                        console.log(e.target.value);
                                        this.setState({password_err: false});
                                    } else {
                                        this.setState({password_err: true});
                                    }
                                }} onKeyUp={
                                    (e) => {
                                        if (e.keyCode == 13) {
                                            this.submit();
                                        }
                                    }
                                }
                                       ref="password" aria-describedby="basic-addon2"/>
                            </div>
                            <OverlayTrigger
                                container={this.refs.login_password_ref} rootClose
                                trigger={ ['hover', 'focus', 'click']} placement="right"
                                overlay={this.popoverRight(this.state.password_err_info)}>
                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right " + (this.state.password_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span></OverlayTrigger>
                        </div>
                    </form>

                    <div className="row">
                        <div className="col-xs-12">
                            <button className="btn btn-link" onClick={() => this.props.changeType("register")}>注册
                            </button>
                            <button className="btn btn-link pull-right"
                                    onClick={() => this.props.changeType("reset")}>忘记密码
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <button className="btn btn-primary col-xs-12" onClick={this.submit.bind(this)}>
                                login in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
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
        console.log(this)
        // 倒计时
        countDown(this, 60);
        this.props.loginAction.email(this.refs.r_email.value, data => {
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
        console.log("content------->" + content)
        return (
            <Popover id="popover-positioned-scrolling-right">
                <div className="row" style={{"width": "150px"}}>
                    <div className="col-xs-12">{content}</div>
                </div>
            </Popover>
        );
    }

    render() {
        console.log(this)
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
                            <button className="btn btn-link" onClick={() => this.props.changeType("login")}>返回登录
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


class ResetPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email_err_info: "邮箱号错误",
            email_err: false,
            password_err_info: "密码错误",
            password_err: false,
            re_code_err_info: "验证码错误",
            re_code_err: false,
        }
    }


    sendMail() {
        console.log(this)
        this.props.loginAction.email(this.refs.re_username.value, data => {
            console.log(data)
        });
    }

    submit() {
        let flag = true;
        if (this.refs.re_email.value == "") {
            flag = false;
            this.setState({email_err: true});
        }
        if (this.refs.re_password.value == "") {
            console.log(">>>>>>>>>>>>")
            flag = false;
            this.setState({password_err: true});
        }
        if (this.refs.re_code.value == "") {
            flag = false;
            this.setState({re_code_err: true});
        }
        if (flag) {
            this.props.submit_reset(this.refs.re_email.value, md5(this.refs.re_password.value), this.refs.re_code.value, this);
        }
    }

    popoverRight(content) {
        console.log("content------->" + content)
        return (
            <Popover id="popover-positioned-scrolling-right">
                <div className="row" style={{"width": "150px"}}>
                    <div className="col-xs-12">{content}</div>
                </div>
            </Popover>
        );
    }

    render() {
        console.log(this, this.props.submit_reset)
        return (
            <div className="panel panel-default">
                <div className="panel-heading">重置密码</div>
                <div className="panel-body">
                    <form>
                        <div className="p-r">
                            <div className="input-group" ref="re_email_ref">
                            <span className="input-group-addon" id="re_basic-addon1">
                            <span className="fa fa-user-o w14 f14"></span>
                            </span>
                                <input type="text" className="form-control" placeholder="邮箱" onChange={(e) => {
                                    console.log(e);
                                    if (e.target.value != "") {
                                        console.log(e.target.value);
                                        this.setState({email_err: false});
                                    } else {
                                        this.setState({email_err: true});
                                    }
                                }}
                                       ref="re_email" aria-describedby="re_basic-addon1"/>
                            </div>
                            <OverlayTrigger container={this.refs.re_email_ref} rootClose
                                            trigger={ ['hover', 'focus', 'click']} placement="right"
                                            overlay={this.popoverRight(this.state.email_err_info)}>
                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right " + (this.state.email_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span>
                            </OverlayTrigger>
                        </div>
                        <br/>
                        <div className="p-r">
                            <div className="input-group" ref="re_password_ref">
                            <span className="input-group-addon" id="re_asic-addon2">
                                <span className="fa fa-lock w14 f14"></span>
                            </span>
                                <input type="password" className="form-control" placeholder="密码" onChange={(e) => {
                                    console.log(e);
                                    if (e.target.value != "") {
                                        console.log(e.target.value);
                                        this.setState({password_err: false});
                                    } else {
                                        this.setState({password_err: true});
                                    }
                                }}
                                       ref="re_password" aria-describedby="re_basic-addon2"/>
                            </div>
                            <OverlayTrigger container={this.refs.re_password_ref} rootClose
                                            trigger={ ['hover', 'focus', 'click']} placement="right"
                                            overlay={this.popoverRight(this.state.password_err_info)}>
                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right " + (this.state.password_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span>
                            </OverlayTrigger>
                        </div>
                        <br/>
                        <div className="p-r">
                            <div className="input-group" ref="re_code_ref">
                                <input type="text" className="form-control" placeholder="验证码" onChange={(e) => {
                                    console.log(e);
                                    if (e.target.value != "") {
                                        console.log(e.target.value);
                                        this.setState({re_code_err: false});
                                    } else {
                                        this.setState({re_code_err: true});
                                    }
                                }}
                                       ref="re_code" aria-describedby="re_basic-addon3"/>
                                <span className="input-group-btn" id="re_basic-addon3">
                                <button className="btn btn-secondary" type="button"
                                        onClick={this.sendMail.bind(this)}>获取验证码</button>
                                </span>
                            </div>

                            <OverlayTrigger container={this} rootClose
                                            trigger={ ['hover', 'focus', 'click']} placement="right"
                                            overlay={this.popoverRight(this.state.re_code_err_info)}>
                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right pp " + (this.state.re_code_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span>
                            </OverlayTrigger>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col-xs-12">
                            <button className="btn btn-link" onClick={() => this.props.changeType("login")}>返回登录
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-primary col-xs-12"
                            onClick={  () => this.submit()}>
                        reset password
                    </button>
                </div>
            </div>
        );
    }
}


