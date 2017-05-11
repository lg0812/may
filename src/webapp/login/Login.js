/**
 *
 */

import React, {Component} from 'react';
import "../../plugins/bootstrap-4.0.0-alpha.6/dist/css/bootstrap.css"
import "../../plugins/font-awesome-4.7.0/css/font-awesome.css"
import "../../index.css"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as loginAction from "../../actions/loginController"
import md5 from "js-md5"
class Login extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(username, password) {
        console.log("username: " + username, "password:" + password, this)
        this.props.loginAction.login(username, password);
    }

    render() {
        console.log(this.props.router)
        return (
            <LoginPosition>
                <LoginPanel {...this.props}
                            submit={(name, pass) => this.handleSubmit(name, pass)}/>
            </LoginPosition>
        );
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
    }

    render() {
        console.log(this);
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
        this.state = {
            username: "LG0812",
            password: "123456"
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
                                            <span className="fa fa-user-o w14 f14"></span>
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
                            <input type="password" className="form-control" placeholder="password"
                                   value={this.state.password} onChange={this.handlerPassword.bind(this)}
                                   ref="password" aria-describedby="basic-addon2"/>
                        </div>

                    </form>

                    <div className="row">
                        <div className="d-flex justify-content-between w-100">
                            <button className="btn btn-link">注册</button>
                            <button className="btn btn-link">忘记密码</button>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100" onClick={this.submit.bind(this)}>
                        login in
                    </button>
                </div>
            </div>
        );
    }
}




