
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Sets extends Component{
    constructor(props){
        super(props)
        this.state ={
        }
    }
    delete(){
        this.setState({
            delete:'delete'
        })
    }
    render(){
        return(
            <div>
                <div className="border">
                    <h1>Sets</h1>
                </div>
                <Link>EDIT</Link>
            </div>
        )
    }
}

export default Sets;

import React from 'react';


export default props => (
    <div>
        <h1>My Sets</h1>
        <p>lorem ipsum dummy datat</p>
    </div>
);
