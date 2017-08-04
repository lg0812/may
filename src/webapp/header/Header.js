/**
 * Created by LG0812 on 2017/7/4.
 */
import React, {Component} from 'react';
import headerIcon from "../source/night.png";
import {urls} from "../../utils/urls"
import {bindActionCreators} from 'redux'
import {Navbar, Nav, NavDropdown, NavItem, MenuItem} from "react-bootstrap";
import {connect} from 'react-redux'
import {dispatchUrls} from "../../utils/Utils"
import {logout as logoutCtrl} from "../../actions/loginController"
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            collapse: false
        }
    }


    render() {
        console.log("header---->", this)
        return (
            <Navbar className="border-radius0 mg0" inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a className="pd10"><img onClick={() => dispatchUrls(urls.public_index, this.props.history)}
                                                 src={headerIcon}
                                                 width="30" height="30" alt=""/></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1}
                                 onClick={() => dispatchUrls(urls.public_index, this.props.history)}>{this.props.lang.home}</NavItem>
                        <NavItem eventKey={2}
                                 onClick={() => dispatchUrls(urls.private_index, this.props.history)}>{this.props.lang.consoles}</NavItem>
                        <NavItem eventKey={2}
                                 onClick={() => dispatchUrls(urls.public_news, this.props.history)}>{this.props.lang.latest_activity}</NavItem>
                        <NavDropdown eventKey={3} title={this.props.lang.more} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}
                                      onClick={() => dispatchUrls(urls.public_help, this.props.history)}>{this.props.lang.help}</MenuItem>
                            <MenuItem eventKey={3.2}
                                      onClick={() => dispatchUrls(urls.public_about, this.props.history)}>{this.props.lang.about}</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title={this.props.lang.language} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}
                                      onClick={() => this.props.setLocate("zh_CN")}>简体中文</MenuItem>
                            <MenuItem eventKey={3.2}
                                      onClick={() => this.props.setLocate("en_US")}>English</MenuItem>
                        </NavDropdown>
                        {
                            // 通过loginStatus判断登陆状态
                            this.props.loginStatus ?
                                <NavDropdown eventKey={3}
                                             title={this.props.loginStatus == "true" ? this.props.userInfo.username : this.props.lang.login}
                                             id="basic-nav-dropdown">
                                    <MenuItem eventKey={3.1}
                                              onClick={() => dispatchUrls(urls.public_help, this.props.history)}>{this.props.lang.help}</MenuItem>
                                    <MenuItem eventKey={3.2}
                                              onClick={() => {
                                                  this.props.logout();
                                                  dispatchUrls(urls.public_index, this.props.history)
                                              }}>{this.props.lang.logout}</MenuItem>
                                </NavDropdown>
                                : <NavItem eventKey={2}
                                           onClick={() => dispatchUrls(urls.public_login, this.props.history)}>{this.props.lang.login}</NavItem>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.langRd.lang,
    userInfo: state.loginRd.userInfo,
    loginStatus: state.loginRd.loginStatus
})

const mapDispatchToProps = dispatch => ({
    logout: bindActionCreators(logoutCtrl, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
