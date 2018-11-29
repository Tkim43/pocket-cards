import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import  M from 'materialize-css/dist/js/materialize';
import {userSignIn, userSignOut} from "../actions/index";

class Navbar extends Component {

    componentDidMount () {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }

    renderLinks () {
        const { auth, signIn, signOut } = this.props;

        if(auth){
            return <button onClick = {signOut} className = "red lighten-2 btn"> Sign Out </button>
        }

        return <button onClick = {signIn} className = "blue lighten-2 btn">Sign In</button>
    }

    render() {
        const navStyle = {
            padding: '0 8px'
        }

        console.log('User Auth:', this.props.auth);

        return (
            <div>
                <nav style = {navStyle} className = "lime darken-2 ">
                    <div className="nav-wrapper">
                        <Link to = "#" data-target = "slide-out" className = "sidenav-trigger"> <i className="material-icons">dehaze</i> </Link>
                        <ul className = "left hide-on-med-and-down">
                            <li className = "nav-item">
                                <Link to = "/profile" className = "nav-link"> Profile </Link>
                            </li>
                            <li className = "nav-item">
                                <Link to = "/sets" className = "nav-link"> My Sets </Link>
                            </li>
                            <li className = "nav-item">
                                <Link to = "/flashcards" className = "nav-link"> My Flashcards </Link>
                            </li>
                            <li className = "nav-item">
                                {this.renderLinks()}
                            </li>
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li />
                    <li>
                        <Link to = "/profile"> Profile </Link>
                    </li>
                    <li>
                        <Link to = "/sets"> My Sets </Link>
                    </li>
                    <li>
                        <Link to = "/flashcards"> My Flashcards </Link>
                    </li>
                    <li>
                        {this.renderLinks()}
                    </li>
                    <li>
                        <div className="divider" />
                    </li>
                    <li>
                        <a className="subheader">Logout</a>
                    </li>
                </ul> 
        </div>
        );
    }
}

function mapStateToProps (state){
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps, {
    signIn: userSignIn,
    signOut: userSignOut
})(Navbar);