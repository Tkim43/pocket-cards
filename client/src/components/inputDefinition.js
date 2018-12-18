import React, { Component, Fragment } from 'react';
import "../assets/css/inputDefinition.css";
import { Field, reduxForm } from 'redux-form'; 
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopicsCards, sendCreateCardData, sendCategoryAndSubcategoryData } from '../actions';

class InputDefinition extends Component {

    componentDidMount(){
        this.updateCards();
    }

    updateCards(){
        const { getTopicsCards, match: { params } } = this.props;

        getTopicsCards(params.set_id, params.topic_id);
    }

    renderInput (props) {
        return (
            <div className= {`input-field col ${props.size}`}>
                <input {...props.input} type= {props.type || "text"} id = {props.input.name} autoComplete = "off"/>
                <label htmlFor= {props.input.name} >{props.label}</label>
            </div>
        );
    }

    handleAddDefinition = async (values) => {
        const { match: { params }, reset, sendCreateCardData } = this.props;
        
        await sendCreateCardData(params.topic_id, values);

        this.updateCards();
        
        reset();
    }
    
    render () {
        const { cardCount, cards, handleSubmit, match: { params }, reset, topic = {} } = this.props;

        let cardElements = <h4 className="center grey-text">No Cards</h4>;

        if(cards && cards.length){
            cardElements = cards.map((card, i) => {
                if(card.frontText.length > 80){
                    card.frontText = card.frontText.substring(0,60) + "...";
                }
                if(card.backText.length > 80){
                    card.backText = card.backText.substring(0,60) + "...";
                }
                return (
                    <div className="row center grey-text" key={i}>
                        <div className="col s6">{card.frontText}</div>
                        <div className="col s6">{card.backText}</div>
                    </div>
                );
            });
        }

        return (
            <Fragment>
                <div className = "add-card container">
                    <h5 style={{textTransform: 'capitalize'}} className="center white-text">{topic.subCategory || 'Category'}</h5>
                    <h1>Cards Created: {cardCount || '...'}</h1>
    
                    <form onSubmit = {handleSubmit(this.handleAddDefinition)}>
                        <div className="row">
                            <Field name = "frontText" size = "s12" type = "text" label = "Term" component = {this.renderInput}/>
                        </div>
                        <div className="row">
                            <Field name = "backText" size = "s12" type = "text" label = "Definition" component = {this.renderInput}/>
                        </div>
                        <div className="row">
                            
                        </div>
                        <div className = "buttonDiv">
                            <button className="blue lighten-2 btn btn-large" name="action">Add Card
                                <i className="material-icons right">add</i>
                            </button>
                        </div>
                        <div className = "buttonDiv">
                            <Link to = {`/flashCardGeneration/${params.set_id}/topic/${params.topic_id}`} className="green lighten-2 btn btn-large" type="done" name="action">Done
                                <i className="material-icons right">done</i>
                            </Link>
                        </div>
                    </form>
                    <div className="center white-text">Previous Cards:</div>
                    <div className="row center white-text">
                        <div className="col s6">Card Front</div>
                        <div className="col s6">Card Back</div>
                    </div>
                    {cardElements}
                </div>
            </Fragment>
        ); 
    }
}


function mapStateToProps(state){
    const { sets } = state;
    return {
        topic: sets.currentTopic || {},
        cards: sets.topicsCards,
        cardCount: sets.topicsCardCount
    }
}

InputDefinition = reduxForm ({
    form: "input-defintion",
})(InputDefinition);

export default connect(mapStateToProps,{
    getTopicsCards,
    sendCreateCardData,
    sendCategoryAndSubcategoryData
})(withRouter(InputDefinition));
