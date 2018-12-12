import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignOut } from "../actions/index";
import SideNav from './side_nav';
import '../assets/css/nav_bar.css'

class Navbar extends Component {

    state = {
        links: [
            {
                to: '/profile',
                text: 'Profile'
            },
            {
                to: '/sets',
                text: 'My Sets'
            },
            {
                to: '/flashcards',
                text: 'Flashcards'
            }
        ]
    }

    componentDidMount () {
        this.sideNav = M.Sidenav.init(this.sideNav);
    }

    handleLinkClick = () => {
        if(this.sideNav.isOpen){
            this.sideNav.close();
        }
    }

    setSideNavRef = (element) => {
        this.sideNav = element;
    }

    render () {
        const { auth, signOut } = this.props;
        if(auth){
            const linkElements = this.state.links.map((link => {
                return (
                    <li onClick = {this.handleLinkClick} key = {link.to}>
                        <Link to = {link.to}>{link.text}</Link>
                    </li>
                );
            }));
            linkElements.push(<li className = "nav-item" key="moo">
                                    <div className="divider" />
                              </li>);
            linkElements.push(<li className = "nav-item" key="cow">
                                    <button onClick = {signOut} className = "red lighten-2 btn"> Sign Out </button>
                              </li>);
        return (
            <Fragment>
                <nav className = "main-nav grey darken-4">
                    <div className="nav-wrapper">
                        <Link className = "brand-logo" to = "/profile">Pocket Cards</Link>
                        <a href="#" data-target="side-nav" className="sidenav-trigger"><i className="material-icons">dehaze</i></a>
                        <ul className = "right hide-on-med-and-down"> 
                        {linkElements}
                        </ul>
                    </div>
                </nav>

                <SideNav setRef = {this.setSideNavRef} links = {linkElements}>
                </SideNav>
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
}

function mapStateToProps (state){
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps, {
    signOut: userSignOut
})(Navbar);
