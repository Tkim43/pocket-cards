import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/card.css';
import {connect} from 'react-redux';
import {getCardData, getNextOrPrevCard} from '../actions';

class displayCard extends Component{
    state = {
        flipped: true,
        isLoading: false
    }
    async componentDidMount(){
        const { getCardData, history, match: { params } } = this.props;
        
        const cardId = await getCardData(params.topic_id, params.card_id);

        history.push(`/displayCard/${params.set_id}/topic/${params.topic_id}/card/${cardId}`);
    }

    async nextPrevCard(direction){
        const { card, getNextOrPrevCard, history, match: { params } } = this.props;

        this.setState({ flipped: true, isLoading: true });

        const cardId = await getNextOrPrevCard(direction, params.topic_id, card.ID);

        history.push(`/displayCard/${params.set_id}/topic/${params.topic_id}/card/${cardId}`);

        setTimeout(() => this.setState({ isLoading: false }), 1000);        
    }

    flipCard =()=>{
        const { flipped } = this.state;

        this.setState({
            flipped: !flipped
        })
    }
    render(){
        const {card, match: { params: {set_id, topic_id} } } = this.props;
        const { isLoading, flipped } = this.state;

        return(
            <div className="container">
                <div className="row">
                    <h4 style={{ textTransform: 'capitalize' }} className="center grey-text text-lighten-1">{card.subCategory}</h4>
                </div>
                {/* <div className="row">
                    <h3 className = "white-text">{flipped ? "Front of Card" : "Back of Card"}</h3>
                </div> */}
                <div className={"cardBox flow-text center cardflip " + (flipped ? "" : "flipped")}>
                    <p id ="cardFont" className="front flow-text">{card.frontText}</p>
                    <p id ="cardFont" className="back flow-text">{isLoading ? '' : card.backText}</p>
                </div>
                <div className="row col s12">
                    <i className="nav-btn large material-icons white-text" onClick={() => this.nextPrevCard('previous')}>arrow_back</i>
                    <button className="btn green darken-2 flip-btn" onClick={this.flipCard}>{flipped ? "Flip to Back" : "Flip to Front"}</button>
                    <i className="nav-btn large material-icons white-text" onClick={() => this.nextPrevCard('next')}>arrow_forward</i>
                </div>
                <div className="row down">
                    <Link to ={`/flashcardGeneration/${set_id}/topic/${topic_id}`} className="btn green darken-2 edit-btn">Edit Cards</Link>
                    <Link to={`/sets/${set_id}`} className="btn green darken-2 edit-btn">Return to Sets</Link>
                </div>
            </div>
        )
    }
}

// anytime you're pulling anything from redux use mapstate to props
function mapStateToProps(state){
    const { sets } = state;
    return {
        card: sets.singleCard
    }
}

// then connect it 
export default connect(mapStateToProps,{
    getCardData,
    getNextOrPrevCard
})(displayCard);
