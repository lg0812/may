/**
 * Created by LG0812 on 2017/7/6.
 */
import React, {Component} from 'react';

class Basic extends Component {
    render() {
        return (
            <div className="container">
                <div style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "100px",
                    position: "relative",
                    border: "1px solid rgba(0,0,0,.25)",
                    borderRadius:"6px"
                }}>
                    <div className="pure-tarrow"></div>
                    <div className="pure-rarrow"></div>
                    <div className="pure-larrow"></div>
                    <div className="pure-barrow"></div>
                </div>
                <div style={{marginTop:"20px"}} className="right-arrow"></div>
            </div>
        );
    }
}

export default Basic;
