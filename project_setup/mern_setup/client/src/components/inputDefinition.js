import React, {Component} from 'react';
import "../assets/css/inputDefinition.css";
// import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendCreateCardData} from '../actions';


class inputDefinition extends Component {
    state = {
        card_count: 0
    }
    cardCounter = () =>{
        this.setState={
            card_count: this.state.card_count++
        };
    }
    sendCreateCardDataAdd = async (e) => {
        e.preventDefault();
        await this.props.sendCreateCardData({topicID:1, frontText:'font text', backText:'back text'});
        this.cardCounter();
        this.props.history.push('/createflashcards');
    }
    sendCreateCardDataEdit = async (e) => {
        e.preventDefault();
        await this.props.sendCreateCardData({topicID:1, frontText:'this.state.frontText', backText:'hello'});

        this.props.history.push('/flashcardGeneration');
    }

    sendCreateCardDataDone = async (e) => {
        e.preventDefault();
        await this.props.sendCreateCardData({topicID:1, frontText:'this.state.frontText', backText:'hello'});

        this.props.history.push('/sets');
    }
    render () {

        // const { frontText, backText } = this.state;
        console.log("this is your props", this.props);

        return (
            <div className = "container">
                <h1>Cards Created: {this.state.card_count}</h1>

                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea value={this.props.front_description} onChange={this.updateTerm}  className="materialize-textarea" id="modal-textarea1"></textarea>
                                <label htmlFor="modal-textarea1">Enter Term</label>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea value={this.props.back_description} onChange={this.updateDefinition}  className="materialize-textarea" id="modal-textarea2"></textarea>
                                <label htmlFor="modal-textarea2">Enter Definition</label>
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
        frontText: state.sets.front_description,
        backText: state.sets.back_description
    }
}

export default connect(mapStateToProps,{
    sendCreateCardData
})(withRouter(inputDefinition));