import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignOut } from "../actions/index";
import '../assets/css/nav_bar.css'

class Navbar extends Component {

    componentDidMount () {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }

    renderLinks () {
        const { auth, signOut } = this.props;
        console.log("this is the props from navbar:",this.props);

        if(auth){
            return (
                <Fragment>
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
                        <div className="divider" />
                    </li>
                    <li className = "nav-item">
                        <button onClick = {signOut} className = "red lighten-2 btn"> Sign Out </button>
                    </li>
                </Fragment>
            );
        }

        return (
        <Fragment>
            <li className = "nav-item">
                <Link to = "/signin">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link to = "/signup" >Sign Up</Link>
            </li>
        </Fragment>
        );
    }

    render() {
        const navStyle = {
            padding: '0 8px',
        }
        console.log('User Auth:', this.props.auth);
        return (
            <div>
                <nav style = {navStyle} className = "nav_bar grey darken-4 ">
                    <div className="nav-wrapper">
                        <a className="brand-logo">Pocket Cards</a>
                        <Link to = "#" data-target = "slide-out" className = "sidenav-trigger"> <i className="material-icons">dehaze</i> </Link>
                        <ul className = "left hide-on-med-and-down">
                            {this.renderLinks()}
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    {this.renderLinks()}
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
    signOut: userSignOut
})(Navbar);