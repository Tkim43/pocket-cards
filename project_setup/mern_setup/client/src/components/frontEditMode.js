import React, {Component} from 'react'
import { Link } from 'react-router-dom';

class displayFront extends Component{
    componentDidMount(){

    }
    componentDidUpdate() {
        // console.log("State after using set state ", this.state);
    }
    render(){
        console.log(this.props)
        return(
            <div className="container">
                <div className="row">
                    <h1>Edit Mode Front of Card</h1>
                </div>
                <input className="card center"></input>
                <div className="row">
                    <Link to ="/backEditMode" className="btn green darken-2">Flip to Back</Link>
                    <Link to ="/sets" className="btn green darken-2">Card Set Complete</Link>
                    <Link to ="/flashcardGeneration" className="btn green darken-2">Edit More Cards</Link>
                </div>
                
            </div>
        )
    }
}

export default displayFront;