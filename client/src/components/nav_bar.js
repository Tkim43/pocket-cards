import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignOut } from "../actions/index";
import SideNav from './side_nav';
import '../assets/css/nav_bar.css'
import logo from '../assets/images/kangaroo_smaller_logo.png'
import defaultAvatar from '../assets/images/default_avatar.png';


class Navbar extends Component {

    state = {
        links: [
            {
                to: '/profile',
                text: 'Profile'
            },
            {
                to: '/about',
                text: 'Meet The Team'
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
        const profileUserInfo = this.props.user.displayName;
        const profileUserAvatar = this.props.user.avatar || defaultAvatar;

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
            linkElements.push(<li className = "nav-item center" key="/signin">
                                    <button onClick = {signOut} className = "red lighten-2 btn"> Sign Out </button>
                              </li>);
            linkElements.unshift(<li className = "nav-item" key="profileuser">
                                    <div className = "sidenav-header navy hide-on-large-only">
                                        <div className="s4 sidenav-title">
                                            <img src= {profileUserAvatar} alt="" className="circle profile-pic"/>
                                        </div>
                                        <div className="s8 avatar-box sidenav-title hide-on-large-only">
                                            <div className="avatar-text">{profileUserInfo}</div>
                                        </div>
                                    </div>
                                </li>);
        return (
            <Fragment>
                <nav className = "main-nav">
                    <div className="nav-wrapper">
                        <Link className = "brand-logo" to = "/profile">
                            <div className="nav-container">
                                <span className="pocket-cards">Pocket Cards</span>
                                <img className ="logo-large hide-on-small-only" src={logo} />
                                <img className ="logo hide-on-med-and-up" src={logo} />
                            </div>
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
                            <div className="nav-container">
                                <span className="pocket-cards">Pocket Cards</span>
                                <img className ="logo-large hide-on-small-only" src={logo} />
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
                            <li>
                                <Link to = "/about">Meet The Team</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                
                <SideNav setRef = {this.setSideNavRef} links = {<li onClick = {this.handleLinkClick}>
                        <Link to = "/signin">Sign In</Link>
                        <Link to = "/signup">Sign Up</Link>
                        <Link to = "/about">Meet The Team</Link>
                    </li>}>
                </SideNav>
            </Fragment>
        );
    }
}

function mapStateToProps (state){
    return {
        auth: state.user.auth,
        user: state.user.info
    }
}

export default connect(mapStateToProps, {
    signOut: userSignOut
})(Navbar);
