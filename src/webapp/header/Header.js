/**
 * Created by LG0812 on 2017/7/4.
 */
import React, {Component} from 'react';
import headerIcon from "../source/night.png";
import {urls} from "../../utils/urls"
import {Navbar, Nav, NavDropdown, NavItem, MenuItem} from "react-bootstrap";
import {connect} from 'react-redux'
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            collapse: false
        }
    }

    dispatchUrls(url) {
        console.log(url, this.props.router);
        this.props.history.push(url);
    }

    render() {
        console.log("header---->", this)
        return (
            <Navbar className="border-radius0 mg0" inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a className="pd10"><img onClick={() => this.dispatchUrls(urls.public_index)} src={headerIcon}
                                                 width="30" height="30" alt=""/></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1}
                                 onClick={() => this.dispatchUrls(urls.public_index)}>{this.props.lang.home}</NavItem>
                        <NavItem eventKey={2}
                                 onClick={() => this.dispatchUrls(urls.private_index)}>{this.props.lang.consoles}</NavItem>
                        <NavItem eventKey={2}
                                 onClick={() => this.dispatchUrls(urls.public_news)}>{this.props.lang.latest_activity}</NavItem>
                        <NavDropdown eventKey={3} title={this.props.lang.more} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}
                                      onClick={() => this.dispatchUrls(urls.public_help)}>{this.props.lang.help}</MenuItem>
                            <MenuItem eventKey={3.2}
                                      onClick={() => this.dispatchUrls(urls.public_about)}>{this.props.lang.about}</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title={this.props.lang.language} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}
                                      onClick={() => this.props.setLocate("zh_CN")}>简体中文</MenuItem>
                            <MenuItem eventKey={3.2}
                                      onClick={() => this.props.setLocate("en_US")}>English</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={2}
                                 onClick={() => this.dispatchUrls(urls.public_login)}>{this.props.lang.login}</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.lang,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
