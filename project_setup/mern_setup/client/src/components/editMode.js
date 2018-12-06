import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getCardData} from '../actions'; 
import {sendCardData} from '../actions';

class editMode extends Component{
    state = {
        frontText: '',
        backText: ''
    }
    async componentDidMount(){
        await this.props.getCardData();
        this.setState({
            frontText: this.props.front_description,
            backText: this.props.back_description
        })
    }

    componentDidUpdate() {
        console.log("hellooooooo" ,this.props);
    }
    updateFrontValue = event => {
        this.setState({
            frontText: event.currentTarget.value
        })
    }
    updateBackValue = event => {
        this.setState({
            backText: event.currentTarget.value
        })
    }
    sendCardData = () =>{
        debugger;
        this.props.sendCardData({ID: 1, frontText: this.state.frontText, backText: this.state.backText})
    }
    render(){
        if(this.state.frontText === undefined){
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
        const back_description = this.props.backText
        console.log("back", back_description)
        return(
            <div className="container">
                <div className="row">
                    <h1>Edit Mode</h1>
                </div>
                <div className="input-field col s12">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea className="center active materialize-textarea s6" onChange={this.updateFrontValue} value={this.state.frontText}></textarea>
                    <label>Front</label>
                </div>
                <div className ="input-field col s12">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea className="center active materialize-textarea s6" onChange={this.updateBackValue} value={this.state.backText}></textarea>
                    <label>Back</label>
                </div>
                <div className="row">
                    <Link to ="/displayCard" className="btn grey darken-2" onClick = {this.sendCardData}>Done</Link>
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
})(editMode);