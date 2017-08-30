import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {QRCode} from "../plugins/qrcode";
import {download} from "./common"
export default class Qr extends Component {


    constructor(props) {
        super(props);
        this.base64String = ""
        this.state = {
            base64String: "",
            update: true,
            date: ""
        }
    }


    getBase64Img() {
        download(this.state.base64String, "qrcode.png");
    }

    componentWillMount() {
        console.log("componentWillMount")
    }

    componentWillReceiveProps() {

        this.setState({
            update: true,
            date: new Date().getTime()
        })
        console.log("componentWillReceiveProps", ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.state)
    }

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate", ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.state)
        // if (this.state.update)
        //     return true;
        // else
        //     return false
        return true;
    }


    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    componentWillUpdate() {
        console.log("componentWillUpdate")
    }

    componentDidMount() {
        console.log("componentDidMount", ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.state)
        if (this.state.update)
            this.createQr();

    }

    componentDidUpdate() {
        console.log("componentDidUpdate", ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", this.state)
        if (this.state.update)
            this.createQr();
    }

    render() {
        console.log(this)
        if (this.props.args.returnType) {
            return (
                <div>
                    <canvas id={this.props.args.canvasId} ref={this.props.args.canvasId}
                            className={this.props.args.canvasClass + " hide"}/>
                    <img src={this.state.base64String} id={this.props.args.canvasId + "_img"}
                         ref={this.props.args.canvasId + "_img"} className={this.props.args.canvasClass}/>
                </div>
            )
        }
        else {
            return (<canvas id={this.props.args.canvasId} ref={this.props.args.canvasId}
                            className={this.props.args.canvasClass}/>)
        }
    }

    createQr(c) {
        console.log(this.props.options)
        let options = this.props.options ? this.props.options : {
            text: "http://www.yltfy.cn/#/static/private/index",
            width: 256,
            height: 256,
            typeNumber: -1,
            correctLevel: 2,
            background: "#f2f2f2",
            foreground: "#000000"
        }
        let qrcode = new QRCode(options.typeNumber, options.correctLevel);
        qrcode.addData(options.text);
        qrcode.make();

        let canvas = this.refs.qrcode;
        canvas.width = options.width;
        canvas.height = options.height;
        let ctx = canvas.getContext('2d');


        var tileW = options.width / qrcode.getModuleCount();
        var tileH = options.height / qrcode.getModuleCount();

        // draw in the canvas
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
                var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
            }
        }
        if (this.props.args.hasLogo) {
            let logoWidth = 40;
            let logo = new Image();
            logo.crossOrigin = "Anonymous";
            logo.src = this.props.args.logoPath;
            logo.onload = () => {
                ctx.drawImage(logo, (options.width - logoWidth) / 2, (options.width - logoWidth) / 2, logoWidth, logoWidth);
                if (this.props.args.returnType) {
                    this.setState({"base64String": canvas.toDataURL("image/jpeg"), update: false});
                    // this.base64String = canvas.toDataURL("image/jpeg")
                    // c()
                }
            }
        }
        else {
            if (this.props.args.returnType) {
                this.setState({"base64String": canvas.toDataURL("image/jpeg"), update: false});
                // this.base64String = canvas.toDataURL("image/jpeg")
                // c()
            }
        }


    }
}
