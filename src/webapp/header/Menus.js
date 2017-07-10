/**
 * Created by LG0812 on 2017/7/4.
 */
import React, {Component} from 'react';
import {Link} from "react-router-dom"
class Menus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuArr: [{
                name: "云计算基础服务",
                isOpen: false,
                subList: [{name: "云服务器", href: "/auth/basic"}, {name: "云数据库", href: "/auth/basic1"}]
            }, {
                name: "安全", isOpen: false,
                subList: [{name: "web应用防火墙", href: "bbb-href"}, {name: "安全管家", href: "bbb-href"}]
            }, {
                name: "云市场", isOpen: false,
                subList: [{name: "云市场", href: "ccc-href"}, {name: "场景编辑", href: "ccc-href"}]
            }]
        }
    }

    toggle(i) {
        console.log(i, "toggle----->");
        let temp = this.state.menuArr;
        temp[i].isOpen = !temp[i].isOpen;
        this.setState({menuArr: temp});
    }

    render() {
        console.log(this, "menus>>>>>>>>>>>>>>>>>")
        return (
            <div className="menus border-left-0 border-top-0 border-bottom-0 text-center self-hover">
                <ul className="nav flex-column">
                    {
                        this.state.menuArr.map((obj, index) => {
                            return (<li key={index} className="nav-item">
                                <a className="nav-link active" href="#"
                                   onClick={() => this.toggle(index)}>{obj.name}</a>
                                <ul className={"nav flex-column " + (obj.isOpen ? "" : "d-none")}>
                                    {
                                        obj.subList.map((item, i) => {
                                            return (
                                                <li key={i} className="nav-item self-sub-hover"><Link
                                                    to={item.href}> {item.name}</Link>
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

export default Menus;
