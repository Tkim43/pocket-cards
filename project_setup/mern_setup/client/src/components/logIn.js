
import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import kangaroo from '../assets/images/kangaroo_logo_3_edited2.png'
import "../assets/css/logIn.css";


class Login extends Component{
    render(){
        return(
            <div className="center">
                <div className="border">Sign Up /Log In Page</div>
                <img src={kangaroo}></img>
                <blockquote>Welcome to Pocket Cards, our mission is to help students practice and master whatever they are learning. Pocket Cards provides engaging, customizable flashcards with contributions from people everywhere.</blockquote>
                <div className="row">
                    <Link to ="/signup" className="btn light blue darken-2">Sign Up</Link>
                    <Link to ="/signin" className="btn black darken-2">Log In Now</Link>
                </div>
            </div>
        )
    }
}

export default Login;
