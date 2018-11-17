import React from 'react';
import { Link } from 'react-router-dom';

const navbar = props => {
    return (
        <ul className = "nav nav-tabs mt-3">
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
    );
}

export default navbar;