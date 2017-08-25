import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {QRCode} from "../plugins/qrcode";
import {download} from "./common"
export default class Qr extends Component {


    constructor(props) {
        super(props);
        this.state = {
         base64String:""
        }
    }
componentWillMount(){
	console.log(this.props,"this.props.options");

}

getBase64Img(){
	download(this.state.base64String,"qrcode.png");
}
	componentDidMount(){
		
		let options = this.props.options  ? this.props.options : {
							text:"http://www.yltfy.cn/#/static/private/index",
                            width       : 256,
                            height      : 256,
                            typeNumber  : -1,
                            correctLevel: 2,
                            background: "#f2f2f2",
                            foreground : "#000000"
		}
		let qrcode = new QRCode(options.typeNumber, options.correctLevel);
		qrcode.addData(options.text);
		qrcode.make();

		let canvas = this.refs.qrcode;
		canvas.width = options.width;
		canvas.height = options.height;
		let ctx	= canvas.getContext('2d');


			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
				}	
			}
			if(this.props.args.hasLogo){
						let logoWidth = 40;
						let logo = new Image();
						logo.crossOrigin = "Anonymous";
			    		logo.src = this.props.args.logoPath;
			    		logo.onload = () => {
			    			ctx.drawImage(logo,(options.width - logoWidth)/2, (options.width - logoWidth)/2,logoWidth,logoWidth);
			    			if(this.props.args.returnType){
								this.setState({"base64String" : canvas.toDataURL("image/jpeg")});
							}
			    		}
				}else{
					if(this.props.args.returnType){
												this.setState({"base64String" : canvas.toDataURL("image/jpeg")});
											}
				}
			
	}

    render() {
    	if(this.props.args.returnType){
    			return (
    				<div>
    						<canvas id={this.props.args.canvasId} ref={this.props.args.canvasId} className={this.props.args.canvasClass + " hide"}/>
    						<img src={this.state.base64String} id={this.props.args.canvasId + "_img"} ref={this.props.args.canvasId + "_img"} className={this.props.args.canvasClass}/>
    				</div>
    				)
    		}
    		else{
    				return (<canvas id={this.props.args.canvasId} ref={this.props.args.canvasId} className={this.props.args.canvasClass}/>)
    		}
    }
}

// export class QrImg extends Component {


//     constructor(props) {
//         super(props);
//         this.state = {
//         	base64String:""
//         }
//     }
// 	componentWillMount(){
	
// 	}
// 	componentDidMount(){
// 	console.log(JSON.stringify(this.props),"canvas to dataurl")
// 		let str = this.props.args.canvas.toDataURL("image/jpeg");
// 		this.setState({base64String:str});
// 	}
// 	render(){
// 		return (<img src={this.state.base64String} className={this.props.args.class}></img>);
// 	}
// }