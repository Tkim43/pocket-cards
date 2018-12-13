
import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import kangaroo from '../assets/images/kangaroo_logo_3.png'
import "../assets/css/logIn.css";


class Login extends Component{
    render(){
        return(
            <div className="center mainContainer">
                <img src={kangaroo}></img>
                <div className="divider cyan lighten-3"></div>
                <div className="container">
                    <p className="white-text">Welcome to Pocket Cards, our mission is to help students practice and master whatever they are learning. Pocket Cards provides engaging, customizable flashcards with contributions from people everywhere.</p>
                </div>
                <div className="divider cyan lighten-3"></div>
                <div className="row">
                    <Link to ="/signup" className="black-text btn cyan lighten-3">Sign Up</Link>
                    <Link to ="/signin" className="black-text btn amber lighten-3">Log In</Link>
                </div>
            </div>
        )
    }
}

export default Login;
