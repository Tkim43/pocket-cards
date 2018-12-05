import React, {Component} from 'react';
import '../assets/css/FlashcardGeneration.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getAllCardData} from '../actions'

class FlashcardGeneration extends Component {
    componentDidMount(){
        this.props.getAllCardData();
    }
    render () {
        console.log("this is your card", this.props.card)
        if(!this.props.card.all_descriptions[0]){
            return(
                <div className="loading-container">
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                            <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        const cardCounter = this.props.card.all_descriptions.length
        const listCards = this.props.card.all_descriptions.map((item,ID) =>{
            return(
                 <div key = {item.ID} className="row">
                    <div className="col s5 card-container">
                       <Link to = "/editMode" className="card-panel teal lighten-1 white-text card" >
                            <div>{item.frontText}</div>
                       </Link> 
                   </div>
                    <div className="col s5 card-container">
                       <Link to = "/editMode" className="card-panel teal lighten-1 white-text card">
                            <div>{item.backText}</div>
                        </Link>
                   </div>
                    <div className="col s2 card-container">
                      <div className = "card-panel red lighten-2 white-text center">
                      Delete
                          <i className="material-icons right">delete</i>
                       </div>
                   </div>
                </div>
            )
        })
        const category = this.props.card.all_descriptions[0].subCategory
        return (

            <div className = "flashcard-container">
                <h1 className = "col s12 center">{category}</h1>
                <h2 className = "col s12 center">Card Counter: {cardCounter}</h2>
                <div className="row">                    
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
                    <Link className="blue lighten-2 btn waves-effect waves-light btn-large col s6 " to = "/createflashcards" name="action">
                        <i className="material-icons right">add</i>
                        Add Card
                    </Link>
                    <Link className="green lighten-2 btn waves-effect waves-light btn-large col s6 " to = "/sets" name="action">
                        <i className="material-icons right">done</i>
                        Done
                    </Link>

                </div>

            </div>
        );
    }
}

function mapStateToProps(state){
    console.log("this is the state", state)
    return state
}

export default connect(mapStateToProps, {
    getAllCardData,
})(FlashcardGeneration);