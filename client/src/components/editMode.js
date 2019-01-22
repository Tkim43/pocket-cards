import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCardData } from '../actions'; 
import { sendCardData } from '../actions';

class editMode extends Component{
    state = {
        frontText: '',
        backText: '',
        autoFill: false,
        show: false,

    }
    async componentDidMount(){
        const { card: {frontText, backText}, getCardData, match: { params } } = this.props;

        if(frontText && backText){
            this.setState({
                frontText,
                backText,
                autoFill: true
            });
        }

        await getCardData(params.topic_id, params.card_id);
    }
    cancel=()=>{
        this.props.getCardData(this.props.params.match.topic_id, this.props.params.match.card_id);
    }
    componentDidUpdate({card: prevCard}) {
        const { card } = this.props;
        const { frontText, backText } = this.state;

        if((prevCard.frontText !== card.frontText || prevCard.backText !== card.backText)){
            this.setState({
                backText: card.backText,
                frontText: card.frontText,
                autoFill: true
            });
        }
    }
    showModal=()=>{
        this.setState({
            show: true
        })
    }
    hideModal=()=>{
        this.setState({
            show: false
        })
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
        const { autoFill } = this.state;
        if(this.props.error){
            return (
                <a onClick={M.toast({html: "Oops! Something went wrong"})} className="btn, center">{this.props.error}</a>
            )
        }
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
        if(this.state.show){
            return (
                <div className="basic-modal" onClick={this.hideModal}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.hideModal} className="basic-modal-close center">X</div>
                            <div>
                                <form className="col s12">
                                        <div>
                                            <h6 className="center">Are you sure you want to discard the changes you made?</h6>
                                        </div>
                                        <div className = "row">
                                            <button onClick={this.cancel} className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                                                Yes
                                            </button>
                                            <Link to={this.hideModal} className="red lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                                                No
                                            </Link>
                                        </div>
                                </form>
                            </div>
                    </div>
                </div>
            )
        }
        
        return(
            <div className="container">
                <div className="row">
                    <h1>Edit Mode</h1>
                </div>
                <div className="input-field col s12">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea id="front" className="center materialize-textarea white-text" onChange={this.updateFrontValue} value={this.state.frontText}></textarea>
                    <label className={autoFill ? 'active' : ''} htmlFor="front">Term</label>
                </div>
                <div className ="input-field col s12">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea id="back" className="center materialize-textarea s6 white-text" onChange={this.updateBackValue} value={this.state.backText}></textarea>
                    <label className={autoFill ? 'active' : ''} htmlFor="back">Definition</label>
                </div>
                <div className="row">
                    
                        <button className="col s12 btn green darken-2" onClick = {this.sendCardData}>Save</button>
                        <button className="col s12 btn red darken-2" onClick = {this.showModal}>Reset</button>
                    
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
