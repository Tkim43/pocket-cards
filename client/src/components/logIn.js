
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import kangaroo from '../assets/images/kangaroo_logo_3.png';
import logo from '../assets/images/kangaroo_smaller_logo.png'
import "../assets/css/logIn.css";


class Login extends Component{

    componentDidMount(){
        if(window.localStorage.getItem('token') !== null ){
            this.props.history.push("/profile");
        }
    }

    render(){
        return(
            <div className="center mainContainer">
                <div className = "responsive-img container">
                    <img className="landingLogo"src={logo}></img>
                    <img className="kangaroo" src={kangaroo}></img>
                </div>
                <div className="divider cyan lighten-3"></div>
                <div className="container">
                    <p className="white-text">Welcome to Pocket Cards.
                        Our mission is to provide an easy, engaging environment to create customizable flashcards 
                        that help students practice and master what they are learning.
                    </p>
                </div>
                <div className="divider cyan lighten-3"></div>
                <div className="row">
                    <Link to ="/signup" className="black-text btn cyan lighten-3">Sign Up</Link>
                    <Link to ="/signin" className="black-text btn amber lighten-3">Sign In</Link>
                </div>
            </div>
        )
    }
}

export default Login;
