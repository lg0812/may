import React, {Component} from 'react';
import './App.css';
import {Link} from "react-router"
import {urls} from "../../utils/urls"
class App extends Component {

    render() {
        return (
            <iframe className="w-100 h-100 d-flex border-0" src={urls.home_page_url}>
            </iframe>
        );
    }
}

export default App;
