import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/card.css'
// whenver you're using redux use connect
import {connect} from 'react-redux';
// import your actions
import {getCardData} from '../actions';
import '../assets/css/card.css'

class displayCard extends Component{
    state = {
        flipped: true
    }
    componentDidMount(){
        // make sure to initialize the function ()
        console.log('URL PARAMS:', this.props.match.params);
        this.props.getCardData(this.props.match.params.set_id, this.props.match.params.topic_id);
    }
    flipCard =()=>{
        const { flipped } = this.state;

        this.setState({
            flipped: !flipped
        })
    }
    render(){
        console.log("this is your props", this.props);
        const {set_id, topic_id} = this.props.match.params
        return(
            <div className="container">
                <div className="row">
                    <h3 className = "white-text">{this.state.flipped ? "Front of Card" : "Back of Card"}</h3>
                </div>
                <div className={"card center cardflip " + (this.state.flipped ? "" : "flipped")}>
                    <div className="front">{this.props.front_description}</div>
                    <div className="back">{this.props.back_description}</div>
                </div>
                <div className="row down">
                    <i className="large material-icons white-text">arrow_back</i>
                    <button className="btn green darken-2 flip-btn" onClick={this.flipCard}>{this.state.flipped ? "Flip to Back" : "Flip to Front"}</button>
                    <i className="large material-icons white-text">arrow_forward</i>
                </div>
                <div className="row down">
                    <Link to ={`/flashcardGeneration/${set_id}/topic/${topic_id}`} className="btn green darken-2 edit-btn">Edit Cards</Link>
                    <Link to ="/sets" className="btn green darken-2 edit-btn">Return to Sets</Link>
                </div>
            </div>
        )
    }
}

// anytime you're pulling anything from redux use mapstate to props
function mapStateToProps(state){
    console.log("this is the state", state)
    return {
        front_description: state.sets.front_description,
        back_description: state.sets.back_description
    }
}

// then connect it 
export default connect(mapStateToProps,{
    getCardData
})(displayCard);
