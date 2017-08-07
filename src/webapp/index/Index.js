/**
 * Created by hsx on 2017/5/8.
 */
import React, {Component} from 'react';
import head_icon from "../source/head.png";
class Index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            head_: head_icon
        }
    }

    render() {
        console.log(this);
        return (
            <div style={{padding: "60px 60px 0px 60px"}}>
                <form className="form-horizontal index-basic">

                    <div className="form-group">
                        <label className="col-sm-2 control-label">名称</label>
                        <div className="col-sm-10">
                            <input className="form-control"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">头像</label>
                        <div className="col-sm-10">
                            <div className="head-pic">
                                <input ref="head_fileUpload" type="file" onChange={(e) => this.showNewLogo(e)}
                                       className="hide"/>
                                <img src={this.state.head_}/>
                                <div onClick={() => this.updateHeadLogo()}>修改头像</div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox"/> Remember me
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    updateHeadLogo() {
        this.refs.head_fileUpload.click();
    }

    showNewLogo(e) {
        console.log(e.target.files[0].name)
    }
}
export default Index;

