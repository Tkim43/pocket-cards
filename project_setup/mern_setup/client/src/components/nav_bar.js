import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import  M from 'materialize-css/dist/js/materialize';

class Navbar extends Component {

    componentDidMount () {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link to = "#" data-target = "slide-out" className = "sidenav-trigger"> <i className="material-icons">dehaze</i> </Link>
                        <ul className = "right hide-on-med-and-down">
                            <li className = "nav-item">
                                <Link to = "/" className = "nav-link"> Profile </Link>
                            </li>
                            <li className = "nav-item">
                                <Link to = "/sets" className = "nav-link"> My Sets </Link>
                            </li>
                            <li className = "nav-item">
                                <Link to = "/flashcards" className = "nav-link"> My Flashcards </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li />
                    <li>
                        <Link to = "/"> Profile </Link>
                    </li>
                    <li>
                        <Link to = "/sets"> My Sets </Link>
                    </li>
                    <li>
                        <Link to = "/flashcards"> My Flashcards </Link>
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

export default Navbar;