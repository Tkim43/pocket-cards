import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignOut } from "../actions/index";
import SideNav from './side_nav';
import '../assets/css/nav_bar.css'
import logo from '../assets/images/kangaroo_smaller_logo.png'

class Navbar extends Component {

    state = {
        links: [
            {
                to: '/profile',
                text: 'Profile'
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
            linkElements.push(<li className = "nav-item" key="divider">
                                    <div className="divider" />
                              </li>);
            linkElements.push(<li className = "nav-item" key="/signin">
                                    <button onClick = {signOut} className = "red lighten-2 btn"> Sign Out </button>
                              </li>);
        return (
            <Fragment>
                <nav className = "main-nav">
                    <div className="nav-wrapper">
                        <Link className = "brand-logo" to = "/profile">                                
                                <img className ="logo-large hide-on-med-and-down" src={logo} />
                                <span>Pocket Cards</span>
                                <img className ="logo-large hide-on-med-and-down" src={logo} />
                                <img className ="logo hide-on-med-and-up" src={logo} />
                        </Link>
                        
                        <a href="#" data-target="side-nav" className="sidenav-trigger"><i className="material-icons">dehaze</i></a>
                        
                        <ul className = "nav-links right hide-on-med-and-down"> 
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
                <nav className="main-nav">
                    <div className="nav-wrapper">
                        <Link className = "brand-logo" to = "/profile">
                            <div>
                                
                                <img className ="logo-large hide-on-med-and-down" src={logo} />
                                <span>Pocket Cards</span>
                                <img className ="logo-large hide-on-med-and-down" src={logo} />
                                <img className ="logo hide-on-med-and-up" src={logo} />
                            </div>
                        </Link>

                        <a href="#" data-target="side-nav" className="sidenav-trigger"><i className="material-icons">dehaze</i></a>
                        <ul className = "nav-links right hide-on-med-and-down"> 
                            <li>
                                <Link to = "/signin">Sign In</Link>
                            </li>
                            <li>
                                <Link to = "/signup">Sign Up</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                
                <SideNav setRef = {this.setSideNavRef} links = {<li onClick = {this.handleLinkClick}>
                        <Link to = "/signin">Sign In</Link>
                        <Link to = "/signup">Sign Up</Link>
                    </li>}>
                </SideNav>
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
