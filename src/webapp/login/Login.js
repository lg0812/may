/**
 *
 */

import React, {Component} from 'react';
import "../../plugins/bootstrap-4.0.0-alpha.6/dist/css/bootstrap.css"
import "../../plugins/font-awesome-4.7.0/css/font-awesome.css"
import "../../index.css"
import {FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup} from "react-bootstrap"
import * as actions from "../../actions/loginController"
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "LG0812",
            password: "123456"
        }
    }

    handleSubmit() {
        console.log("username: " + this.refs.username.value, "password:" + this.refs.password.value, this)
        actions.login(this.refs.username.value, this.refs.password.value);
    }

    render() {

        console.log(this)
        return (<div className="fixed-center">
                <div className="container" style={{height: "75%"}}>
                    <div className="row  align-items-center justify-content-end h-100">
                        <div className="col col-sm-8 col-md-7 col-lg-5 col-xl-5">
                            <div className="card">
                                <div className="card-header">登录</div>
                                <div className="card-block">
                                    {/*
                                     * <div className="form-group">
                                     * <label className="sr-only">用户名</label>
                                     * <input className="form-control"
                                     * placeholder="username"
                                     * name="username"/> </div> <div
                                     * className="form-group"> <label
                                     * className="sr-only">密码</label>
                                     * <input type="password"
                                     * className="form-control"
                                     * placeholder="password"
                                     * name="password"/> </div>
                                     */}
                                    {/*
                                     *
                                     * <InputGroup> <InputGroup.Addon><span
                                     * className="fa fa-user-o f14"></span>
                                     * </InputGroup.Addon> <FormControl
                                     * type="text"
                                     * placeholder="username"/>
                                     * </InputGroup> <br/> <InputGroup>
                                     * <InputGroup.Addon> <span
                                     * className="fa fa-lock f14 w14"></span>
                                     * </InputGroup.Addon> <FormControl
                                     * type="password"
                                     * placeholder="password"/>
                                     * </InputGroup> <br/>
                                     */}

                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon1">
                                            <span className="fa fa-user-o w14 f14"></span>
                                        </span>
                                        <input type="text" className="form-control" placeholder="username"
                                               value={this.state.username}
                                               ref="username" aria-describedby="basic-addon1"/>
                                    </div>
                                    <br/>
                                    <div className="input-group">
                                        <span className="input-group-addon" id="basic-addon2">
                                        <span className="fa fa-lock w14 f14"></span>
                                        </span>
                                        <input type="password" className="form-control" placeholder="password"
                                               value={this.state.password}
                                               ref="password" aria-describedby="basic-addon2"/>
                                    </div>
                                    <br/>
                                    <button className="btn btn-primary w-100" onClick={this.handleSubmit.bind(this)}>
                                        login in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;