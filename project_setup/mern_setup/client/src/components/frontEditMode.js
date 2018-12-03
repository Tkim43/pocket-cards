import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getCardData} from '../actions'; 
import {sendCardData} from '../actions';

class editFrontMode extends Component{
    state = {
        frontText: ''
    }
    async componentDidMount(){
        await this.props.getCardData();
        this.setState({
            frontText: this.props.front_description
        })
    }
    updateValue = event => {
        // debugger;
        // console.log(event);
        this.setState({
            frontText: event.currentTarget.value
        })
    }
    sendUpdate = () =>{
        this.props.sendCardData();
    }
    render(){
        if(this.state.frontText === '' || this.state.frontText === undefined){
            return (
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
        const front_description = this.props.front_description
        return(
            <div className="container">
                <div className="row">
                    <h1>Edit Mode Front of Card</h1>
                </div>
                <div className="input-field col s12">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea className="center active materialize-textarea" onChange={this.updateValue} value={this.state.frontText}></textarea>
                </div>
                <div className="row">
                    <Link to ="/backEditMode" className="btn green darken-2">Flip to Back</Link>
                    <Link to ="/sets" className="btn grey darken-2" onClick = {this.sendUpdate()}>Done</Link>
                    <Link to ="/flashcardGeneration" className="btn green darken-2">Edit More Cards</Link>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        front_description: state.card.front_description,
        back_description: state.card.back_description
    }
}

export default connect(mapStateToProps,{
    getCardData,
    sendCardData
})(editFrontMode);