import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/card.css'
// whenver you're using redux use connect
import {connect} from 'react-redux';
// import your actions
import {getCardData} from '../actions'; 

class displayFront extends Component{
    componentDidMount(){
        // make sure to initialize the function ()
        this.props.getCardData();
    }
    render(){
        console.log("displayfront", this.props)
        const front_description = this.props.front_description
        return(
            <div className="container">
                <div className="row">
                    <h1>Front of Card</h1>
                </div>
                <div className="card center">{front_description}</div>
                <div className="row">
                    <Link to ="/displayBack" className="btn green darken-2">Flip to Back</Link>
                    <Link to ="/sets" className="btn green darken-2">Card Set Complete</Link>
                    <Link to ="/flashcardGeneration" className="btn green darken-2">Edit More Cards</Link>
                </div>
                
            </div>
        )
    }
}

// anytime you're pulling anything from redux use mapstate to props
function mapStateToProps(state){
    console.log("this is the state", state)
    return {
        front_description: state.card.front_description
    }
}

// then connect it 
export default connect(mapStateToProps,{
    getCardData
})(displayFront);