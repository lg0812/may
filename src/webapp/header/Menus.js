/**
 * Created by LG0812 on 2017/7/4.
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
class Menus extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.lang, ">>>>>>>>")
        this.state = {
            lang: this.props.lang,
            menuArr: [{
                name: this.state.lang.group1,
                isOpen: false,
                subList: [{name: "云服务器", href: "/auth/basic"}, {name: "云数据库", href: "/auth/basic1"}, {
                    name: "云数据库",
                    href: "/auth/basic1"
                }]
            }, {
                name: "安全", isOpen: false,
                subList: [{name: "web应用防火墙", href: "bbb-href"}, {name: "安全管家", href: "bbb-href"}]
            }, {
                name: "云市场", isOpen: false,
                subList: [{name: "云市场", href: "ccc-href"}, {name: "场景编辑", href: "ccc-href"}, {
                    name: "云数据库",
                    href: "/auth/basic1"
                }, {name: "云数据库", href: "/auth/basic1"}]
            }]
        }
    }

    toggle(i) {
        console.log(i, "toggle----->");
        let temp = this.state.menuArr;
        for (var t = 0; t < temp.length; t++) {
            if (t != i) {
                temp[t].isOpen = false;
            }
        }
        temp[i].isOpen = !temp[i].isOpen;
        this.setState({menuArr: temp});
    }

    render() {
        return (
            <div className="menus text-center self-hover">
                <ul className="flex-column w-100 h-100 pd0" style={{"lineHeight": "40px"}}>
                    {
                        this.state.menuArr.map((obj, index) => {
                            return (<li key={index} className="fc-white super_menus">
                                <div onClick={() => this.toggle(index)}><span
                                    className={"fa fa-angle-down mgr10 transform-rotate " + (obj.isOpen ? "transform90" : "transform-90") }
                                    style={{"fontSize": "16px"}}></span>{obj.name}
                                </div>
                                <ul className="flex-column  w-100 pd0 transform-height"
                                    style={{height: (obj.isOpen ? (obj.subList.length * 40 + "px") : "0px")}}>
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
