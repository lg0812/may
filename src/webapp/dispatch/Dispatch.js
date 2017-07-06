/**
 * Created by LG0812 on 2017/7/6.
 */
import React, {Component} from 'react';
import "../../plugins/bootstrap-4.0.0-alpha.6/dist/css/bootstrap.css"
import Index from "../index/Index"
import Login from "../login/Login"
class Dispatch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        switch (this.props.url) {
            case "index":
                return (<Index/>);
            case "user":
                return (<Login/>);
            default :
                return (<div></div>);
        }
    }
}
export default Dispatch;