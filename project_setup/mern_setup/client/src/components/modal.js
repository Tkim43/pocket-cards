import React, {Component} from 'react'
import { Link } from 'react-router-dom';

class modal extends Component {

    state = {
        term: ''
    }

    render () {

        const { term } = this.state;

        return (
            <div className = "container">

                <div className="row">
                    <form className="col s12">
                        <div className="row"> 
                            <div className="input-field col s12">
                            <h5>Enter Category</h5>
                                <textarea value={term} onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
                            </div>  
                        </div>
                        <div className="row"> 
                            <div className="input-field col s12">
                            <h5>Enter Title</h5>
                                <textarea value={term} onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
                            </div>  
                        </div>
                    </form>
                </div>
                <div className = "buttonDiv">
                    <Link to = "/createflashcards" className = "blue lighten-2 btn waves-effect waves-light btn-large">Create Flashcard</Link>
                </div>
               
            </div>
        );
    }
}


export default modal;