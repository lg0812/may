/**
 * Created by LG0812 on 2017/7/4.
 */
import React, {Component} from 'react';
class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="flex-grow0 footer-bgc">
                <div className="text-center fcf">Copyright © 2017-2018 LG0812 <a href="http://www.yltfy.cn">http://www.yltfy.cn</a>
                </div>
            </div>
        );
    }
}
export default Footer;