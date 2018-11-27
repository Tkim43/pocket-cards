import React, {Component} from 'react';
import "../assets/css/inputDefinition.css";
import { Link } from 'react-router-dom';


class inputDefinition extends Component {
    state = {
        term: '',
        defintion: ''
    }

    render () {

        const { term, defintion } = this.state;

        return (
            <div className = "container">
                <h1>Cards Created: 10</h1>

                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea value={term} onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
                                <label htmlFor="textarea1">Term</label>
                                <div className="right-align">{term.length}/50</div>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea value={defintion} onChange={ e => this.setState({defintion: e.target.value})}  className="materialize-textarea" id="textarea2"></textarea>
                                <label htmlFor="textarea2">Definition</label>
                                <div className="right-align">{defintion.length}/150</div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className = "buttonDiv">
                    <Link to="/createflashcards" className="blue lighten-2 btn waves-effect waves-light btn-large" name="action">Add Card
                        <i className="material-icons right">add</i>
                    </Link>
                </div>
                <div className = "buttonDiv">
                    <Link to="/flashcardGeneration" className="red lighten-2 btn waves-effect waves-light btn-large" name="action">Edit Cards
                        <i className="material-icons right">create</i>
                    </Link>
                </div>
                <div className = "buttonDiv">
                    <Link to="/sets" className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">Done
                        <i className="material-icons right">done</i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default inputDefinition;