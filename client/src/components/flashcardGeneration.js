import React, {Component} from 'react';
import '../assets/css/FlashcardGeneration.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getTopicsCards} from '../actions';
import {deleteCard} from '../actions';
import Axios from 'axios';

class FlashcardGeneration extends Component {
    componentDidMount(){
        const { getTopicsCards, match: { params } } = this.props;
        getTopicsCards(params.set_id, params.topic_id);
    }
    delete = async (cardId) =>{
        console.log("these are your props", this.props)
        const { match: { params } } = this.props;
        // deletes the card
        await this.props.deleteCard(cardId, params.topic_id);
        // then updates the card list by calling the server 
        this.updateCardList();
    }
    async updateCardList(){
        try{
            const { getTopicsCards, match: { params } } = this.props;
            // calls the server to get the new list
            // we are calling the function to get the response 
            getTopicsCards(params.set_id, params.topic_id);
        }catch(err){
            console.log("error getting list data")
        }
    }
    render () {
        const { cardCount, cards, match: { params }, topic } = this.props;

        const listCards = cards.map((item,ID) =>{
            let frontText = item.frontText;
            let backText = item.backText;

            if(frontText.length > 20){
                frontText = item.frontText.substring(0,20) + "...";
            }
            if(backText.length > 20){
                backText = item.backText.substring(0,20) + "...";
            }

            const path = `/editMode/${params.set_id}/topic/${params.topic_id}/card/${item.ID}`;
            
            return(
                <div key = {item.ID}>
                    <div className="row container flashcard-row">
                        <div className="col s5 card-container">
                            <Link to = {path} className="card-panel teal lighten-1 white-text text-inside-card" >
                                <div>{frontText}</div>
                            </Link> 
                        </div>
                        <div className="col s5 card-container">
                            <Link to = {path} className="card-panel teal lighten-1 white-text text-inside-card">
                                <div>{backText}</div>
                            </Link>
                        </div>
                        <div className="col s2 card-container">
                            <button className="red lighten-2 btn" onClick={() => this.delete(item.ID)}>
                                <i className = "material-icons">delete</i>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })

        return (

            <div className = "flashcard-container center">
                <h2 style={{textTransform: 'capitalize'}} className = "col s12 center white-text">{topic && topic.subCategory || 'Category'}</h2>
                <h3 className = "col s12 center white-text">Cards In Set: {cardCount || '...'}</h3>
                <div className="row container flashcard-row">                    
                    <div className="col s5 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Term</div> 
                    </div>
                    <div className="col s5 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Definition</div>
                    </div>
                    <div className="col s2 card-container">
                        <div className="card-panel red lighten-2 white-text center">Delete</div>
                    </div>
                </div>
                {listCards}
                <div className = "buttonDiv center">
                    <Link className="blue lighten-2 btn waves-effect waves-light btn-large col s6 " to = {`/createflashcards/${params.set_id}/subcategory/${params.topic_id}`} name="action">
                        <i className="material-icons right">add</i>
                        Add Card
                    </Link>
                    <Link className="green lighten-2 btn waves-effect waves-light btn-large col s6 " to={`/sets/${params.set_id}`} name="action">
                        <i className="material-icons right">done</i>
                        Done
                    </Link>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state){
    const { sets } = state;

    return {
        topic: sets.currentTopic,
        cards: sets.topicsCards,
        cardCount: sets.topicsCardCount
    }
}

export default connect(mapStateToProps, {
    getTopicsCards,
    deleteCard
})(FlashcardGeneration);