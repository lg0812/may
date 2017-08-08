/**
 * Created by hsx on 2017/5/8.
 */
import React, {Component} from 'react';
import head_icon from "../source/head.png";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
class Index extends Component {


    constructor(props) {
        super(props);
        this.state = {
            head_: head_icon,
            edit: false,
            userInfo: this.props.userInfo
        }
    }


    render() {
        console.log(this);
        return (
            <div style={{padding: "60px 60px 0px 60px"}}>
                <form className="form-horizontal index-basic">

                    <div className="form-group">
                        <label className="col-sm-2 control-label" style={{paddingTop: "0"}}>名称</label>
                        <div className="col-sm-10">
                            <span
                                className={"name_label " + (this.state.edit ? "hide" : "")}>{this.state.userInfo.username}<span
                                className="mgl10 op-text"
                                onClick={(e) => this.editName(e, true)}>修改名称</span></span>
                            <input value={this.props.userInfo.username ? this.props.userInfo.username : ""}
                                   onChange={(e) => this.editName(e, false)}
                                   onBlur={(e) => this.editFinish(e)}
                                   className={"form-control " + (this.state.edit ? "" : "hide")}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label" style={{paddingTop: "0"}}>头像</label>
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
                        <label className="col-sm-2 control-label" style={{paddingTop: "0"}}>二维码</label>
                        <div className="col-sm-10">
                            <div className="head-pic">
                                <img src={this.state.head_}/>
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
        let fr = new FileReader();
        fr.readAsDataURL(e.target.files[0]);
        console.log(e.target.files[0].name);
        fr.onload = (frEvent) => {
            this.setState({head_: frEvent.target.result});
        }
    }

    editName(e, flag) {
        //点击修改名字
        if (flag) {
            this.setState({edit: true});
        }
        // 触发input的onchange 事件
        else {
            let temp = this.state.userInfo;
            temp.username = e.target.value;
            this.setState({userInfo: temp});
        }
    }

    editFinish(e) {
        this.setState({edit: false});
    }
}

const mapStateToProps = state => ({
    userInfo: state.loginRd.userInfo,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)