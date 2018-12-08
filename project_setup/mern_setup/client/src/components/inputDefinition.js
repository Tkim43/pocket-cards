import React, {Component} from 'react';
import "../assets/css/inputDefinition.css";
// import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendCreateCardData} from '../actions';


class inputDefinition extends Component {
    state = {
        term: '',
        defintion: ''
    }

    async componentDidMount(){
        this.setState({
            term:this.props.term,
            definition:this.props.definition
        });
    }

    updateTerm = event => {
        this.setState({
            term: event.currentTarget.value
        });
    }

    updateDefinition = event => {
        this.setState({
            definition: event.currentTarget.value
        })
    }

    sendCreateCardDataAdd = async (e) => {
        e.preventDefault();
        await this.props.sendCreateCardData({topicID:1, frontText:"who is the CSS instructor at LFZ", backText:"Cody"});
        this.props.history.push('/createflashcards');
    }

    sendCreateCardDataEdit = async (e) => {
        e.preventDefault();
        await this.props.sendCreateCardData({topicID:1, frontText:"who is the React instructor at LFZ", backText:"Scott"});

        this.props.history.push('/flashcardGeneration');
    }

    sendCreateCardDataDone = async (e) => {
        e.preventDefault();
        await this.props.sendCreateCardData({topicID:1, frontText:"who is the React instructor at LFZ", backText:"Scott"});

        this.props.history.push('/sets');
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
                                <textarea value={this.term} onChange={this.updateTerm}  className="materialize-textarea" id="textarea1"></textarea>
                                <label htmlFor="textarea1">Term</label>
                                {/* <div className="right-align">{this.term.length}/50</div> */}
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea value={this.defintion} onChange={this.updateDefinition}  className="materialize-textarea" id="textarea2"></textarea>
                                <label htmlFor="textarea2">Definition</label>
                                {/* <div className="right-align">{defintion.length}/150</div> */}
                            </div>
                        </div>
                    </form>
                </div>
                <div className = "buttonDiv">
                    <button onClick={this.sendCreateCardDataAdd} className="blue lighten-2 btn waves-effect waves-light btn-large" name="action">Add Card
                        <i className="material-icons right">add</i>
                    </button>
                </div>
                <div className = "buttonDiv">
                    <button onClick={this.sendCreateCardDataEdit}  className="red lighten-2 btn waves-effect waves-light btn-large" name="action">Edit Cards
                        <i className="material-icons right">create</i>
                    </button>
                </div>
                <div className = "buttonDiv">
                    <button onClick={this.sendCreateCardDataDone} className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">Done
                        <i className="material-icons right">done</i>
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log("create card State:", state)
    return{

    }
}

export default connect(mapStateToProps,{
    sendCreateCardData
})(withRouter(inputDefinition));