/**
 * 
 */
import React, {Component} from 'react';
import "../../plugins/bootstrap-4.0.0-alpha.6/dist/css/bootstrap.css"
import "../../plugins/font-awesome-4.7.0/css/font-awesome.css"
import "../../index.css"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'
import * as loginAction from "../../actions/loginController"
import md5 from "js-md5"
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.location.state ? (this.props.location.state.email ? this.props.location.state.email : "") : ""
        }
    }

    handleSubmit(username, password) {
        console.log("username: " + username, "password:" + password, this)
        this.props.loginAction.login(username, password, this.callback.bind(this));
    }

    callback(data) {
        console.log(data);
        if (data.code == 1001)
            this.props.history.push("/index");
    }

    redirect() {
        this.props.history.push("/user/register");
    }

    render() {
        console.log("------------->",this,this.state.username);
        switch (this.props.match.params.type) {
            case "login":
                return (
                    <LoginPosition>
                        <LoginPanel {...this.props} username={this.state.username}
                                    submit={(name, pass) => this.handleSubmit(name, pass)}/>
                    </LoginPosition>
                );
            case "register":
                return (
                    <LoginPosition>
                        <RegisterPanel {...this.props}
                                       submit={(name, pass) => this.handleSubmit(name, pass)}/>
                    </LoginPosition>
                );
            case "reset":
                return (
                    <LoginPosition>
                        <ResetPanel {...this.props}
                                    submit={(name, pass) => this.handleSubmit(name, pass)}/>
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
                    <div className="row  align-items-center justify-content-end h-100">
                        <div className="col col-sm-7 col-md-6 col-lg-4 col-xl-4">
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
        this.state={
        		username : this.props.username
        }
    }

    handlerUsername() {
        this.setState({"username": this.refs.username.value});
        console.log(this)
    }


    handlerPassword() {
        console.log(this)
        this.setState({"password": this.refs.password.value});
    }

    submit() {
        console.log(this)
        this.props.submit(this.refs.username.value, md5(this.refs.password.value));
    }

    render() {
        console.log(this)
        return (
            <div className="card">
                <div className="card-header">登录</div>
                <div className="card-block">
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
                        <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon1">
                                            <span className="fa fa-envelope-o w14 f14"></span>
                                        </span>
                            <input type="text" className="form-control" placeholder="请使用邮箱号登录"
                                   value={this.state.username} onChange={this.handlerUsername.bind(this)}
                                   ref="username" aria-describedby="basic-addon1"/>
                        </div>
                        <br/>
                        <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon2">
                                        <span className="fa fa-lock w14 f14"></span>
                                        </span>
                            <input type="password" className="form-control" placeholder="密码"
                                   ref="password" aria-describedby="basic-addon2"/>
                        </div>

                    </form>

                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-between w-100">
                                <Link to="/user/register">注册</Link>
                                <Link to="/user/reset">忘记密码</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-primary w-100" onClick={this.submit.bind(this)}>
                                login in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class RegisterPanel extends Component {

    constructor(props) {
        super(props);
    }

    register() {
        console.log(this)
        this.props.loginAction.register(this.refs.r_username.value, this.refs.r_password.value,
            this.refs.r_email.value, this.refs.r_code.value, data => {
                console.log(data)
                if (data.code == 1001) {
                    this.props.history.push("/user/login", {email: data.result.email});
                }
            }
        )
        ;
    }

    sendMail() {
        console.log(this)
        this.props.loginAction.email(this.refs.r_email.value, data => {
            console.log(data)
        });
    }


    render() {
        console.log(this)
        return (
            <div className="card">
                <div className="card-header">注册</div>
                <div className="card-block">
                    <form>
                        <div className="input-group">
                                        <span className="input-group-addon" id="r_basic-addon1">
                                            <span className="fa fa-user-o w14 f14"></span>
                                        </span>
                            <input type="text" className="form-control" placeholder="昵称"
                                   ref="r_username" aria-describedby="r_basic-addon1"/>
                        </div>
                        <br/>
                        <div className="input-group">
                                        <span className="input-group-addon" id="r_asic-addon2">
                                        <span className="fa fa-lock w14 f14"></span>
                                        </span>
                            <input type="password" className="form-control" placeholder="密码"
                                   ref="r_password" aria-describedby="r_basic-addon2"/>
                        </div>
                        <br/>
                        <div className="input-group">
                                        <span className="input-group-addon" id="r_asic-addon4">
                                        <span className="fa fa-envelope-o w14 f14"></span>
                                        </span>
                            <input type="email" className="form-control" placeholder="邮箱"
                                   ref="r_email" aria-describedby="r_basic-addon4"/>
                        </div>
                        <br/>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="验证码"
                                   ref="r_code" aria-describedby="r_basic-addon3"/>
                            <span className="input-group-btn" id="r_basic-addon3">
                                         <button className="btn btn-secondary" type="button"
                                                 onClick={this.sendMail.bind(this)}>获取验证码</button>
                            </span>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-between w-100">
                                <Link to="/user/login">返回登录</Link>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100" onClick={this.register.bind(this)}>
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
    }

    reset() {
        console.log(this)
        this.props.loginAction.reset(this.refs.re_username.value, md5(this.refs.re_password.value), this.refs.re_code.value, data => {
            console.log(data);
            if (data.code == 1001) {
                this.props.history.push("/user/login", {email: data.result.email});
            }
        });
    }

    sendMail() {
        console.log(this)
        this.props.loginAction.email(this.refs.re_username.value, data => {
            console.log(data)
        });
    }

    render() {
        console.log(this)
        return (
            <div className="card">
                <div className="card-header">重置密码</div>
                <div className="card-block">
                    <form>
                        <div className="input-group">
                                        <span className="input-group-addon" id="re_basic-addon1">
                                            <span className="fa fa-user-o w14 f14"></span>
                                        </span>
                            <input type="text" className="form-control" placeholder="邮箱"
                                   ref="re_username" aria-describedby="re_basic-addon1"/>
                        </div>
                        <br/>
                        <div className="input-group">
                                        <span className="input-group-addon" id="re_asic-addon2">
                                        <span className="fa fa-lock w14 f14"></span>
                                        </span>
                            <input type="password" className="form-control" placeholder="密码"
                                   ref="re_password" aria-describedby="re_basic-addon2"/>
                        </div>
                        <br/>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="验证码"
                                   ref="re_code" aria-describedby="re_basic-addon3"/>
                            <span className="input-group-btn" id="re_basic-addon3">
                                         <button className="btn btn-secondary" type="button"
                                                 onClick={this.sendMail.bind(this)}>获取验证码</button>
                            </span>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-between w-100">
                                <Link to="/user/login">返回登录</Link>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100" onClick={this.reset.bind(this)}>
                        reset password
                    </button>
                </div>
            </div>
        );
    }
}

