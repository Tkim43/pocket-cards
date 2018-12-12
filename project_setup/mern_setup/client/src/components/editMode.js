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
        const { getCardData, match: { params } } = this.props;
        
        getCardData(params.topic_id, params.card_id);
    }

    componentDidUpdate({card: prevCard}) {
        console.log("hellooooooo" ,this.props);
        const { card } = this.props;
        const { frontText, backText } = this.state;

        if((!frontText || !backText) && (prevCard.frontText !== card.frontText || prevCard.backText !== card.backText)){
            this.setState({
                backText: card.backText,
                frontText: card.frontText
            });
        }
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
    sendCardData = async () =>{
        const { card, history, match: { params }, sendCardData} = this.props;
        const { backText, frontText } = this.state;

        await sendCardData(card.ID, { frontText, backText });

        history.push(`/flashcardGeneration/${params.set_id}/topic/${params.topic_id}`);
    }
    render(){
        const { match: { params } } = this.props;

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
                    <button className="btn grey darken-2" onClick = {this.sendCardData}>Save</button>
                    <Link to={`/flashcardGeneration/${params.set_id}/topic/${params.topic_id}`} className="btn green darken-2">Edit More Cards</Link>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    const { singleCard } = state.sets;
    return{
        card: singleCard
    }
}

export default connect(mapStateToProps,{
    getCardData,
    sendCardData
})(editMode);