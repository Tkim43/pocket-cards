import React, {Component} from 'react'

class Sets extends Component{
    constructor(props){
        super(props)
        this.state ={
            'delete': '',
            'edit':'',
            'add':'',
            'log in':'',
            'submit':'',
            'create card':''
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
                <button onClick="">Add</button>
            </div>
        )
    }
}

export default Sets;