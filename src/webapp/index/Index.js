/**
 * Created by hsx on 2017/5/8.
 */
import React, {Component} from 'react';
import "../../plugins/bootstrap-4.0.0-alpha.6/dist/css/bootstrap.css"


const ele = <div>hello</div>;
class Index extends Component {
    render() {
        return (
            <div className="container">
                <button className="btn btn-link">index</button>
                {ele}
                {ele}
            </div>
        );
    }
}
export default Index;

