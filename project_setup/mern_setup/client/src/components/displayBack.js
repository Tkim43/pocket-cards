import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getCardData} from '../actions'; 

class displayBack extends Component{
    componentDidMount(){
        this.props.getCardData();
    }
    render(){
        console.log("back description props",this.props)
        const back_description = this.props.back_description
        return(
            <div className="container center">
                <div className="row">
                    <h1>Back of Card</h1>
                </div>
                <div className="card center">{back_description}</div>
                <div className="row">
                    <Link to ="/displayFront" className="btn green darken-2">Flip to Front</Link>
                    <Link to ="/sets" className="btn green darken-2">Card Set Complete</Link>
                    <Link to ="/flashcardGeneration" className="btn green darken-2">Edit More Cards</Link>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log("this is the state", state)
    return {
        back_description: state.card.back_description
    }
}

// then connect it 
export default connect(mapStateToProps,{
    getCardData
})(displayBack);