import React, {Component} from 'react';
import '../assets/css/FlashcardGeneration.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getAllCardData} from '../actions';
import {deleteCardData} from '../actions';

class FlashcardGeneration extends Component {
    componentDidMount(){
        this.props.getAllCardData();
    }
    delete = () =>{
        // console.log("ID for delete", ID);
        console.log("these are your props", this.props)
        this.props.deleteCardData({ID: 9, topicID: 1});
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
            var frontText = item.frontText;
            var backText = item.backText;
            if(item.frontText.length > 20){
                frontText = item.frontText.substring(0,20) + "...";
            }
            if(item.backText.length > 20){
                backText = item.backText.substring(0,20) + "...";
            }
            
            return(
                <div key = {ID}>
                    <div className="row container flashcard-row">
                        <div className="col s5 card-container">
                            <Link to = "/editMode" className="card-panel teal lighten-1 white-text text-inside-card" >
                                <div>{frontText}</div>
                            </Link> 
                        </div>
                        <div className="col s5 card-container">
                            <Link to = "/editMode" className="card-panel teal lighten-1 white-text text-inside-card">
                                <div>{backText}</div>
                            </Link>
                        </div>
                        <div className="col s2 card-container">
                            <button className="red lighten-2 btn" onClick={this.delete}>
                                <i className = "material-icons">delete</i>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
        const category = this.props.card.all_descriptions[0].subCategory
        return (

            <div className = "flashcard-container center">
                <h2 className = "col s12 center white-text">{category}</h2>
                <h3 className = "col s12 center white-text">Card Counter: {cardCounter}</h3>
                <div className="row container flashcard-row">                    
                    <div className="col s5 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Term</div> 
                    </div>
                    <div className="col s5 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Definition</div>
                    </div>
                    <div className="col s2 card-container">
                        <div className="card-panel red lighten-2 white-text center">Del</div>
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
    deleteCardData
})(FlashcardGeneration);