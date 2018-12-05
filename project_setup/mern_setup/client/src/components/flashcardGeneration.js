import React, {Component} from 'react';
import '../assets/css/FlashcardGeneration.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getAllCardData} from '../actions'

class FlashcardGeneration extends Component {
    componentDidMount(){
        this.props.getAllCardData()
    }
    render () {
        console.log("this is your props", this.props)
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

        return (

            <div className = "flashcard-container">
                <h1 className = "col s12 center">Cartoons</h1>
                <h2 className = "col s12 center">Cards Created: 3</h2>
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
    return state
}

export default connect(mapStateToProps, {
    getAllCardData
})(FlashcardGeneration);