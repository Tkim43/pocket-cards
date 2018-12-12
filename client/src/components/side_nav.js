import React from 'react';

export default props => {
    return (
        <ul ref = {props.setRef} id = "side-nav" className = "sidenav">
            {props.links}
        </ul>
    );
}