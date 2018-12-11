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
        this.props.getCardData();
    }
    flipCard =()=>{
        const { flipped } = this.state;

        this.setState({
            flipped: !flipped
        })
    }
    render(){
        console.log("displayfront", this.props)
        console.log("what is the state", this.state)
        const front_description = this.props.front_description
        const back_description = this.props.back_description
        return(
            <div className="container">
                <div className="row">
                    <h3 className = "white-text">{this.state.flipped ? "Front of Card" : "Back of Card"}</h3>
                </div>
                <div className={"card center cardflip " + (this.state.flipped ? "" : "flipped")}>
                    <div className="front">{front_description}</div>
                    <div className="back">{back_description}</div>
                </div>
                <div className="row down">
                    <i className="large material-icons white-text">arrow_back</i>
                    <button className="btn green darken-2 flip-btn" onClick={this.flipCard}>{this.state.flipped ? "Flip to Back" : "Flip to Front"}</button>
                    <i className="large material-icons white-text">arrow_forward</i>
                </div>
                <div className="row down">
                    <Link to ="/flashcardGeneration" className="btn green darken-2 edit-btn">Edit Cards</Link>
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
        front_description: state.card.front_description,
        back_description: state.card.back_description
    }
}

// then connect it 
export default connect(mapStateToProps,{
    getCardData
})(displayCard);
