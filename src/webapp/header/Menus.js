/**
 * Created by LG0812 on 2017/7/4.
 */
import React, {Component} from 'react';
import "../../plugins/bootstrap-4.0.0-alpha.6/dist/css/bootstrap.css"
class Menus extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        return (
            <ul className="nav flex-column menus h-100">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Active</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        );
    }
}
export default Menus;