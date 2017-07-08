import React, {Component} from 'react';
import './App.css';
import {Link} from "react-router"
class App extends Component {

    render() {
        return (
            <iframe className="w-100 h-100 d-flex border-0" src="http://localhost:8080/january/homepage.html">
            </iframe>
        );
    }
}

export default App;
