/**
 * Created by LG0812 on 2017/7/4.
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import menus from "./menus.json";
class Menus extends Component {
    constructor(props) {
        super(props)
        let menuArr = [];
        this.state = {
            openStatus: []
        }
    }

    toggle(i) {
        let temp = this.state.openStatus;
        for (var t = 0; t < this.menuArr.length; t++) {
            if (!temp[t])
                temp[t] = {};
            if (t != i) {
                temp[t].isOpen = false;
            } else {
                temp[t].isOpen = !temp[t].isOpen;
            }
        }

        this.setState({openStatus: temp});
    }

    render() {
        this.menuArr = menus[this.props.lang.type];
        return (
            <div className="menus text-center self-hover" style={{"minWidth":"180px"}}>
                <ul className="flex-column w-100 h-100 pd0" style={{"lineHeight": "40px"}}>
                    {
                        this.menuArr.map((obj, index) => {
                            return (<li key={index} className="fc-white super_menus">
                                <div onClick={() => this.toggle(index)}><span
                                    className={"fa fa-angle-down mgr10 transform-rotate " + (this.state.openStatus[index] && this.state.openStatus[index].isOpen ? "transform90" : "transform-90") }
                                    style={{"fontSize": "16px"}}></span>{obj.name}
                                </div>
                                <ul className="flex-column  w-100 pd0 transform-height"
                                    style={{height: (this.state.openStatus[index] && this.state.openStatus[index].isOpen ? (obj.subList.length * 40 + "px") : "0px")}}>
                                    {
                                        obj.subList.map((item, i) => {
                                            return (
                                                <li key={i} className="self-sub-hover fc-white">
                                                    <Link to={item.href}><span className="fa fa-eercast mgr10"
                                                                               style={{"fontSize": "16px"}}></span> {item.name}
                                                    </Link>
                                                </li>)
                                        })
                                    }
                                </ul>
                            </li>)
                        })
                    }
                </ul>
            </div>
        );
    }
}


Menus.defaultProps = {
    lang: {}
}

const mapStateToProps = state => ({
    lang: state.langRd.lang,
    userInfo: state.loginRd.userInfo,
    loginStatus: state.loginRd.loginStatus
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menus)
