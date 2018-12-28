import React, { Component } from 'react';
import '../assets/css/FlashcardGeneration.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTopicsCards } from '../actions';
import { deleteCard} from '../actions';
import DeleteModal from './deleteModal';

class FlashcardGeneration extends Component {
    state = {
        delete: false,
    };
    componentDidMount(){
        const { getTopicsCards, match: { params } } = this.props;
        getTopicsCards(params.set_id, params.topic_id);
    }
    delete = async (cardId) =>{
        const {match: { params } } = this.props;
        await this.props.deleteCard(cardId, params.topic_id);
        this.updateCardList();
        this.hideModal();
    }
    async updateCardList(){
        try{
            const { getTopicsCards, match: { params } } = this.props;

            await getTopicsCards(params.set_id, params.topic_id);
        }catch(err){
            console.log("error getting list data")
        }
    }
    showModal = () =>{
        this.setState({
            delete: true,
        });
    }

    hideModal = () =>{
        this.setState({
            delete: false
        })
    }
    render () {
        console.log("these are your props", this.props);
        const { cardCount, cards, match: { params }, topic } = this.props;

        const listCards = cards.map((item,ID) =>{
            let frontText = item.frontText;
            let backText = item.backText;

            if(frontText.length > 80){
                frontText = item.frontText.substring(0,80) + "...";
            }
            if(backText.length > 80){
                backText = item.backText.substring(0,80) + "...";
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
                            <button className="red lighten-2 btn-large" onClick={this.showModal}>
                                <i className = "large material-icons">delete</i>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })

        return (

            <div className = "flashcard-container center">
                <h2 style={{textTransform: 'capitalize'}} className = "col s12 center white-text">{topic && topic.subCategory || 'Category'}</h2>
                <h3 className = "col s12 center white-text">Cards: {cardCount || '...'}</h3>
                <div className="row container flashcard-row">                    
                    <div className="col s5 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Term</div> 
                    </div>
                    <div className="col s5 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Definition</div>
                    </div>
                    <div className="col s2 card-container">
                        {/* <div className="card-panel red lighten-2 white-text center">Delete</div> */}
                    </div>
                </div>
                {listCards}
                <div className = "buttonDiv center">
                    <Link className="blue lighten-2 btn btn-large col s6" to = {`/createflashcards/${params.set_id}/subcategory/${params.topic_id}`} name="action">
                        <i className="material-icons right">add</i>
                        Add Card
                    </Link>
                    <Link className="green lighten-2 btn btn-large col s6" to={`/sets/${params.set_id}`} name="action">
                        <i className="material-icons right">done</i>
                        Done
                    </Link>

                </div>
                { this.state.delete ? <DeleteModal hideModal={this.hideModal }deleteItem={this.delete} /> : '' }
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