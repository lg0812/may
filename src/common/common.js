import {QRCode} from "../plugins/qrcode"
export const createQrcode = (options) => {

}

export const download = (url,name) => {
	 			var link = document.createElement("a");
              link.href=url;
              link.download=name;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
}