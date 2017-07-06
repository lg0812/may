/**
 * Created by LG0812 on 2017/7/4.
 */
import React, {Component} from 'react';
import "../../plugins/bootstrap-4.0.0-alpha.6/dist/css/bootstrap.css"
import headerIcon from "../source/night.png";
import {Link} from "react-router-dom"
class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            collapse: false
        }
    }

    open_close() {
        this.setState({show: !this.state.show});
    }

    collapse() {
        this.setState({collapse: !this.state.collapse});
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-light bg-info">
                <a className="navbar-brand" href="#">
                    <img src={headerIcon} width="30" height="30" alt=""/>
                </a>
                <button className={"navbar-toggler navbar-toggler-right " + (this.state.collapse ? "collapsed" : "")}
                        type="button" data-toggle="collapse" onClick={() => this.collapse()}
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse " + (this.state.collapse ? "show" : "")}
                     id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/home">首页 <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/auth/index">控制台</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">最新活动</Link>
                        </li>
                        <li className={"nav-item dropdown " + (this.state.show ? "show" : "")}>
                            <a className="nav-link dropdown-toggle"
                               id="navbarDropdownMenuLink" onClick={() => this.open_close()}
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                更多. . .
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/help">帮助</Link>
                                <Link className="dropdown-item" to="/about">关于此网站</Link>
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        <Link to="/login">登陆</Link>
                    </form>
                </div>
            </nav>
        );
    }
}
export default Header;