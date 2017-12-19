/**
 * Created by LG0812 on 2017/12/19.
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class Prompt extends Component {
    render() {
        if (this.props.promptType == 0) {
            return (<div className={(this.props.promptStatus ? "" : "hide ") + "position-abs"}
                         style={{top: '0px', left: '0px', right: '0px', bottom: '0px'}}>
                <div className="preloader"></div>
            </div>);
        } else if (this.props.promptType == 1) {
            return (<div className={(this.props.promptStatus ? "" : "hide ") + "position-fix w-100"}
                         style={{left: '0px', right: '0px', bottom: '20px'}}>
                <div className="d-flex justify-content-center">
                    <div className="content-style">{this.props.promptContent}</div>
                </div>
            </div>);
        } else {
            return null;
        }

    }
}

const mapStateToProps = state => ({
    promptStatus: state.promptRd.promptStatus
})

const mapDispatchToProps = dispatch => ({})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Prompt)