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
            <div className="menus border-left-0 border-top-0 border-bottom-0">
                <ul className="nav flex-column">
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
            </div>
        );
    }
}
export default Menus;