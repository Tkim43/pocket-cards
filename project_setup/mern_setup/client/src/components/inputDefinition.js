import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import "../assets/css/inputDefinition.css";
// import $ from 'jquery';


class inputDefinition extends Component {

    // componentDidMount () {
    //     $('textarea#textarea1, textarea#textarea2').characterCounter();
    // }

    render () {
        return (
            <div>
                <h1>Cards Created: 10</h1>

                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <label htmlFor="textarea1">Term</label>
                            <textarea className="materialize-textarea" id="textarea1" data-length="50"></textarea>
                        </div>
                        <div className="row">
                            <label htmlFor="textarea2">Definition</label>
                            <textarea className="materialize-textarea" id="textarea2" data-length="120"></textarea>
                        </div>
                    </form>
                </div>
                <div className = "buttonDiv">
                    <button className="blue lighten-2 btn waves-effect waves-light btn-large" name="action">Add Card
                        <i className="material-icons right">add</i>
                    </button>
                </div>
                <div className = "buttonDiv">
                    <button className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">Done
                        <i className="material-icons right">done</i>
                    </button>
                </div>
                <div className = "buttonDiv">
                    <button className="red lighten-2 btn waves-effect waves-light btn-large" name="action">Edit Cards
                        <i className="material-icons right">create</i>
                    </button>
                </div>
            </div>
        );
    }
}

export default inputDefinition;