/**
 * Created by LG0812 on 2017/7/6.
 */
import React, {Component} from 'react';
import {LoginPosition, handleReset, countDown} from "./index"
import md5 from "js-md5";
import {OverlayTrigger, Popover} from "react-bootstrap";
import {dispatchUrls} from "../../utils/Utils"
import {urls} from "../../utils/urls"
import {email} from "../../actions/loginController"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
class ResetPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            btnText: "获取验证码",
            email_err_info: "邮箱号",
            email_err: false,
            password_err_info: "密码",
            password_err: false,
            re_code_err_info: "验证码",
            re_code_err: false,
        }
    }

    sendMail() {
        console.log(this)
        if (this.refs.re_email.value) {
            countDown(this, 60);
            email(this.refs.re_email.value, data => {
                console.log(data)
            });
        }
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
                <div className="panel-heading">{this.props.lang.reset}</div>
                <div className="panel-body">
                    <form>
                        <div className="p-r">
                            <div className="input-group" ref="re_email_ref">
                            <span className="input-group-addon" id="re_basic-addon1">
                            <span className="fa fa-user-o w14 f14"></span>
                            </span>
                                <OverlayTrigger container={this.refs.re_email_ref}
                                                trigger={ ['focus']} placement="right"
                                                overlay={this.popoverRight(this.state.email_err_info)}>
                                    <input type="text" className="form-control" placeholder={this.props.lang.email}
                                           onChange={(e) => {
                                               console.log(e);
                                               if (e.target.value != "") {
                                                   console.log(e.target.value);
                                                   this.setState({email_err: false});
                                               } else {
                                                   this.setState({email_err: true});
                                               }
                                           }}
                                           ref="re_email" aria-describedby="re_basic-addon1"/>
                                </OverlayTrigger>
                            </div>

                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right " + (this.state.email_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span>

                        </div>
                        <br/>
                        <div className="p-r">
                            <div className="input-group" ref="re_password_ref">
                            <span className="input-group-addon" id="re_asic-addon2">
                                <span className="fa fa-lock w14 f14"></span>
                            </span>
                                <OverlayTrigger container={this.refs.re_password_ref}
                                                trigger={ ['focus']} placement="right"
                                                overlay={this.popoverRight(this.state.password_err_info)}><input
                                    type="password" className="form-control" placeholder={this.props.lang.password}
                                    onChange={(e) => {
                                        console.log(e);
                                        if (e.target.value != "") {
                                            console.log(e.target.value);
                                            this.setState({password_err: false});
                                        } else {
                                            this.setState({password_err: true});
                                        }
                                    }}
                                    ref="re_password" aria-describedby="re_basic-addon2"/></OverlayTrigger>
                            </div>

                            <span
                                className={"fa fa-exclamation-triangle pointer text-danger p-absolute-right " + (this.state.password_err ? "" : "hide")} /*onMouseEnter={}
                             onMouseLeave={}*/></span>

                        </div>
                        <br/>
                        <div className="p-r">
                            <div className="input-group" ref="re_code_ref">
                                <input type="text" className="form-control" placeholder={this.props.lang.authcode}
                                       onChange={(e) => {
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
                                        disabled={this.state.disabled}
                                        onClick={this.sendMail.bind(this)}>{this.state.disabled ? this.state.btnText : this.props.lang.get_authcode}</button>
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
                            <button className="btn btn-link"
                                    onClick={() => dispatchUrls(urls.public_login, this.props.history)}>{this.props.lang.login}
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-primary col-xs-12"
                            onClick={  () => this.submit()}>
                        {this.props.lang.reset}
                    </button>
                </div>
            </div>
        );
    }
}

class Reset extends Component {
    render() {
        return (
            <LoginPosition>
                <ResetPanel {...this.props}
                            submit_reset={handleReset.bind(this)}/>
            </LoginPosition>
        )
    }

}


const mapStateToProps = state => ({
    lang: state.langRd.lang,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reset)