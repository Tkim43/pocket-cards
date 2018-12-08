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
                        <Link className = "brand-logo" to = "/">PocketCards</Link>
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









//     renderLinks () {
//         const { auth, signOut } = this.props;
//         console.log("this is the props from navbar:",this.props);

//         render () {
//             const linkElements = this.state.links.map((link => {
//                 return (
//                     <li onClick = {this.handleLinkClick} key = {link.to}>
//                         <Link to = {link.to}>{link.text}</Link>
//                     </li>
//                 );
//             }));
            
//         if(auth){

//             return (
//                 <Fragment>
//                     <nav className = "main-nav">
//                         <div className="nav-wrapper">
//                             <Link className = "brand-logo" to = "/">Fireside App</Link>
//                             <a href="#" data-target="side-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
//                             <ul className = "right hide-on-med-and-down"> 
//                             {linkElements}
//                             </ul>
//                         </div>
//                     </nav>
    
//                     <SideNav setRef = {this.setSideNavRef} links = {linkElements}/>
//                 </Fragment>
//             );
//         }

//         return (
//         <Fragment>
//             <li className = "nav-item">
//                 <Link to = "/signin">Sign In</Link>
//             </li>
//             <li className="nav-item">
//                 <Link to = "/signup" >Sign Up</Link>
//             </li>
//         </Fragment>
//         );
//     }

//     render() {
//         const navStyle = {
//             padding: '0 8px',
//         }
//         console.log('User Auth:', this.props.auth);
//         return (
//             <div>
//                 <nav style = {navStyle} className = "nav_bar grey darken-4 ">
//                     <div className="nav-wrapper">
//                         <a className="brand-logo">Pocket Cards</a>
//                         <Link to = "#" data-target = "slide-out" className = "sidenav-trigger"> <i className="material-icons">dehaze</i> </Link>
//                         <ul className = "left hide-on-med-and-down">
//                             {this.renderLinks()}
//                         </ul>
//                     </div>
//                 </nav>

//                 <SideNav setRef = {this.setSideNavRef} links/>
//                 {/* <ul id="slide-out" className="sidenav">
//                     {this.renderLinks()}
//                 </ul>  */}
//         </div>
//         );
//     }
// }

// function mapStateToProps (state){
//     return {
//         auth: state.user.auth
//     }
// }

// export default connect(mapStateToProps, {
//     signOut: userSignOut
// })(Navbar);


// import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import "./nav.css";
// import SideNav from './side_nav';

// class Nav extends Component {
//     state = {
//         links: [
//             {
//                 to: '/',
//                 text: 'Home'
//             },
//             {
//                 to: '/chat',
//                 text: 'Chat'
//             },
//             {
//                 to: '/set-name',
//                 text: 'Set Name'
//             }
//         ]
//     }

//     componentDidMount () {
//         console.log('side nav ref: ', this.sideNav);

//         this.sideNav = M.Sidenav.init(this.sideNav);
//     }

//     handleLinkClick = () => {
//         if(this.sideNav.isOpen){
//             this.sideNav.close();
//         }
//     }

//     setSideNavRef = (element) => {
//         this.sideNav = element;
//     }

//     render () {
//         const linkElements = this.state.links.map((link => {
//             return (
//                 <li onClick = {this.handleLinkClick} key = {link.to}>
//                     <Link to = {link.to}>{link.text}</Link>
//                 </li>
//             );
//         }));
//         return (
//             <Fragment>
//                 <nav className = "main-nav">
//                     <div className="nav-wrapper">
//                         <Link className = "brand-logo" to = "/">Fireside App</Link>
//                         <a href="#" data-target="side-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
//                         <ul className = "right hide-on-med-and-down"> 
//                         {linkElements}
//                         </ul>
//                     </div>
//                 </nav>

//                 <SideNav setRef = {this.setSideNavRef} links = {linkElements}/>
//             </Fragment>
//         );
//     }
// }

// export default Nav;