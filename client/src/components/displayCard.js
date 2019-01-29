import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCardData, getNextOrPrevCard } from '../actions';
import '../assets/css/card.css'

class displayCard extends Component{
    state = {
        flipped: true,
        isLoading: false
    }

    handleKeyDown = (event) => {
        if(event.keyCode === 32){
            const { flipped } = this.state; 
            this.setState({
                flipped: !flipped
            });
        }else if(event.keyCode === 37){
            this.nextPrevCard('previous');
        }else if(event.keyCode === 39){
            this.nextPrevCard('next');
        }
    }

    componentWillMount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    async componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown);

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
    flipCard = () =>{
        const { flipped } = this.state;
        this.setState({
            flipped: !flipped
        })
    }

    render(){
        const {card, match: { params: {set_id, topic_id} } } = this.props;
        const { isLoading, flipped } = this.state;
        const location = this.props.location;
        if(this.props.error){
            return (
                <a onClick={M.toast({html: "Oops! Something went wrong"})} className="btn, center">{this.props.error}</a>
            )
        }
        return(
            <div className="container">
                <div className="row">
                    <h4 style={{ textTransform: 'capitalize' }} className="center grey-text text-lighten-1 card-subcategory-title truncate">{card.subCategory}</h4>
                </div>
                <p className="numeric">{location}</p>

            
                <div className={"cardBox flow-text center cardflip " + (flipped ? "" : "flipped")}>
                    <p id ="cardFont" className="front flow-text">{card.frontText}</p>
                    <p id ="cardFont" className="back flow-text">{isLoading ? '' : card.backText}</p>
                </div>
                <div className="row col s12">
                    <i className="nav-btn large material-icons white-text" onKeyDown = {() => this.handleKeyDown} onClick={() => this.nextPrevCard('previous')}>arrow_back</i>
                    <button className="btn green darken-2 flip-btn" onKeyDown = {this.handleKeyDown} onClick={this.flipCard}>{flipped ? "Flip to Back" : "Flip to Front"}</button>
                    <i className="nav-btn large material-icons white-text" onKeyDown = {() => this.handleKeyDown} onClick={() => this.nextPrevCard('next')}>arrow_forward</i>
                </div>
                <div className="row down">
                    <Link to ={`/flashcardGeneration/${set_id}/topic/${topic_id}`} className="btn green darken-2 edit-btn">Edit Cards</Link>
                    <Link to={`/sets/${set_id}`} className="btn green darken-2 edit-btn">To Sets</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { sets } = state;
    return {
        card: sets.singleCard,
        location: sets.location,
        error: sets.error,
    }
}

export default connect(mapStateToProps,{
    getCardData,
    getNextOrPrevCard
})(displayCard);
