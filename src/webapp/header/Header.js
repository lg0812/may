/**
 * Created by LG0812 on 2017/7/4.
 */
import React, {Component} from 'react';
import headerIcon from "../source/night.png";
import {urls} from "../../utils/urls"
import {Navbar, Nav, NavDropdown, NavItem, MenuItem} from "react-bootstrap"
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
                        <NavItem eventKey={1} onClick={() => this.dispatchUrls(urls.public_index)}>首页</NavItem>
                        <NavItem eventKey={2} onClick={() => this.dispatchUrls(urls.private_index)}>控制台</NavItem>
                        <NavItem eventKey={2} onClick={() => this.dispatchUrls(urls.public_news)}>最新活动</NavItem>
                        <NavDropdown eventKey={3} title="更多..." id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} onClick={() => this.dispatchUrls(urls.public_help)}>帮助</MenuItem>
                            <MenuItem eventKey={3.2}
                                      onClick={() => this.dispatchUrls(urls.public_about)}>关于此网站</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown eventKey={3} title="未定义" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>menu0</MenuItem>
                            <MenuItem eventKey={3.2}>menu1</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={2} onClick={() => this.dispatchUrls(urls.public_login)}>登陆</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;