/**
 * Created by hsx on 2017/5/8.
 */
import React, { Component } from 'react';
import "../../plugins/bootstrap-4.0.0-alpha.6/dist/css/bootstrap.css"
import {Modal, Button} from "react-bootstrap";
 
class Index extends Component {
    render() {
       return (
            <div>
              index page;
                <Button bsSize="small" bsStyle="success">submit</Button>
            </div>
        );
    }
}

export default Index;

