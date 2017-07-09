/**
 *
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginAction from "../../actions/loginController"
import {OverlayTrigger, Popover} from "react-bootstrap"
import md5 from "js-md5"
import {LoginPosition, handleSubmit} from "./index"
import {dispatchUrls} from "../../utils/Utils"
import {urls} from "../../utils/urls"
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
                            <button className="btn btn-link"
                                    onClick={() => dispatchUrls(urls.public_register, this.props.history)}>注册
                            </button>
                            <button className="btn btn-link pull-right"
                                    onClick={() => dispatchUrls(urls.public_reset, this.props.history)}>忘记密码
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
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "login",
            email: ""
        }
    }

    render() {
        return (
            <LoginPosition>
                <LoginPanel {...this.props} email={this.state.email}
                            submit={handleSubmit.bind(this)}/>
            </LoginPosition>)
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



