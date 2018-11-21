import React, {Component} from 'react';
import "../assets/css/inputDefinition.css";
// import $ from 'jquery';


class inputDefinition extends Component {
    state = {
        term: ''
    }

    render () {

        const { term } = this.state;

        return (
            <div className = "container">
                <h1>Cards Created: 10</h1>

                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea value={term} onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
                                <label htmlFor="textarea1">Term</label>
                                <p className="right-align">{term.length}/50</p>
                            </div>
                            
                        </div>
                        <div className="row">
                            <label htmlFor="textarea2">Definition</label>
                            <textarea ref={e => this.text2 = e} className="materialize-textarea" id="textarea2" data-length="120"></textarea>
                        </div>
                    </form>
                </div>
                <div className = "buttonDiv">
                    <button className="blue lighten-2 btn waves-effect waves-light btn-large" name="action">Add Card
                        <i className="material-icons right">add</i>
                    </button>
                </div>
                <div className = "buttonDiv">
                    <button className="red lighten-2 btn waves-effect waves-light btn-large" name="action">Edit Cards
                        <i className="material-icons right">create</i>
                    </button>
                </div>
                <div className = "buttonDiv">
                    <button className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">Done
                        <i className="material-icons right">done</i>
                    </button>
                </div>
            </div>
        );
    }
}

export default inputDefinition;