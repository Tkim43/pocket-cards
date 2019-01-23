import React, { Component, Fragment } from 'react';
import '../assets/css/FlashcardGeneration.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTopicsCards } from '../actions';
import { deleteCard} from '../actions';
import {endTutorial} from '../actions';
import {getTutorialCompleted} from '../actions';
import DeleteModal from './deleteModal';
import gif from '../assets/images/gif_final.gif';

class FlashcardGeneration extends Component {
    constructor(props) {
        super(props);

        this.state = {
          delete: false,
          cardId: null,
          show: false,
          tutorial: false,
          error: false,
          hasMore: true,
          isLoading: false,
          total_cards: [],
          page: 1,
          windowHeight: window.innerHeight,
          scrollPosition: document.documentElement.scrollTop,
          getDataHeight: document.documentElement.scrollHeight,
          loadingData: false
        };

    
        // Binds our scroll event handler

        window.onscroll = () => {
            const {
              loadCards,
              state: {
                error,
                isLoading,
                hasMore,
              },
            } = this;

            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if (error || isLoading || !hasMore) return;
    
            // Checks that the page has scrolled to the bottom
            
            //   this.state.windowHeight = window.innerHeight;
              const scrollPosition = document.documentElement.scrollTop;
            //   const getDataHeight = document.documentElement.scrollHeight;
            //   console.log("win height: ", windowHeight);
            //   console.log("scroll position: ", scrollPosition);
            //   console.log("getData height: ", getDataHeight);

            let calculated = scrollPosition + this.state.windowHeight;
            // debugger;
            if (calculated >= this.state.getDataHeight && this.state.loadingData === false && this.props.cards.length > 10) {
                this.setState({
                    // windowHeight: window.innerHeight,
                    // scrollPosition: document.documentElement.scrollTop,
                    // getDataHeight: document.documentElement.scrollHeight,
                    loadingData : true
                });
                
                setTimeout(function() {
                    loadCards();
                }, 1000);

            }
        }
    }
    componentDidMount = async()=>{
        const { getTutorialCompleted, getTopicsCards, match: { params } } = this.props;
        await getTutorialCompleted();
        if(this.props.tutorial === 0){
            this.setState({
                tutorial: true
            })
        }
        getTopicsCards(params.set_id, params.topic_id);
    }

    loadCards = () => {
        let page_counter = this.state.page + 1;
        this.setState({ page: page_counter,
                        loadingData: false});
        
        if(this.props.cards[((this.state.page * 10))] === undefined){
            this.setState({
                hasMore: false,
                loadingData : false
            });
        }
        //change loadingData back to false if more cards to show
        if(this.props.cards[page_counter * 10]){
            this.setState({
                loadingData : false
              });
        }

    }


    delete = async () =>{
        const {match: { params } } = this.props;
        await this.props.deleteCard(this.state.cardId, params.topic_id);
        this.updateCardList();
        this.hideModal();
    }
    endTutorial = async () =>{
        const{endTutorial} = this.props;
        await endTutorial();
    }
    async updateCardList(){
        try{
            const { getTopicsCards, match: { params } } = this.props;

            await getTopicsCards(params.set_id, params.topic_id);
        }catch(err){
            console.log("error getting list data")
        }
    }
    showModal = (cardId) =>{
        this.setState({
            delete: true,
            cardId,
            show: true,
            false: true,
        });
    }
    showTutorialModal = () => {
        this.setState({
            tutorial: true
        })
    }

    hideModal = () =>{
        this.setState({
            delete: false,
            show: false,
            tutorial: false
        })
    }

    showLoadingBar = () => {
        const scrollPosition = document.documentElement.scrollTop;
        let calculated = scrollPosition + this.state.windowHeight;
        if(this.state.hasMore && this.state.loadingData === true && calculated >= this.state.getDataHeight && this.props.cards[this.state.page * 10]){
            return (
                <div className="progress container">
                    <div className="indeterminate"></div>
                </div>
            );
        }
    }

    render () {
        if(this.props.error){
            return (
                <a onClick={M.toast({html: "Oops! Something went wrong"})} className="btn, center">{this.props.error}</a>
            )
        }
        if(this.state.tutorial){
            return (
                <div className="basic-modal" onClick={this.hideModal}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.hideModal} className="basic-modal-close center">X</div>
                            <div>
                                <form className="col s12">
                                        <div>
                                            <h3 className="center">How to Edit your Cards Example Below: </h3>
                                            <img className="gif" src={gif}/>
                                        </div>
                                        <div className = "row">
                                                <p>
                                                    <label>
                                                        <input onClick={this.endTutorial}type ="checkbox"/>
                                                        <span className="black-text">Do not show again</span>
                                                    </label>
                                                </p>
                                        </div>
                                </form>
                            </div>
                    </div>
                </div>
            )
        }
        console.log("these are your props", this.props);
        console.log("Page Counter: ", this.state);

        const { cardCount, cards, match: { params }, topic } = this.props;

        let start = 0;
        if(!cards[this.state.page * 10]){
            var end = cards.length;
        }else{
            end = this.state.page * 10;
        }

        let duplicate_arr = cards.slice(start,end);
        console.log("Number of cards displayed: ", duplicate_arr);

        let listCards = duplicate_arr.map((item,ID) =>{
            let frontText = item.frontText;
            let backText = item.backText;

            if(frontText.length > 50){
                frontText = item.frontText.substring(0,50) + "...";
            }
            if(backText.length > 50){
                backText = item.backText.substring(0,50) + "...";
            }

            const path = `/editMode/${params.set_id}/topic/${params.topic_id}/card/${item.ID}`;
            
            return(
                <div key = {item.ID}>
                    <div className="row container flashcard-row">
                        {/* {this.props.tutorial === 0 ? 
                        <Fragment>
                        <div className="col s5 card-container">
                            <div onClick={this.showTutorialModal} className="card-panel teal lighten-1 white-text text-inside-card">{frontText}</div>
                        </div>
                        <div className="col s5 card-container">
                            <div onClick={this.showTutorialModal} className="card-panel teal lighten-1 white-text text-inside-card">{backText}</div>
                        </div>
                        </Fragment>
                        :  */}
                        <Fragment>
                            <div className="col s5 card-container">
                                <Link to = {path} className="card-panel teal lighten-1 white-text text-inside-card" >
                                    <div className = "frontText">{frontText}</div>
                                </Link> 
                            </div>
                            <div className="col s5 card-container">
                                <Link to = {path} className="card-panel teal lighten-1 white-text text-inside-card">
                                    <div className = "backText">{backText}</div>
                                </Link>
                            </div> 
                        </Fragment>
                        {/* <div className="col s5 card-container">
                            <Link to = {path} className="card-panel teal lighten-1 white-text text-inside-card">
                                <div>{backText}</div>
                            </Link>
                            <div onClick ={this.showModal}className="card-panel teal lighten-1 white-text text-inside-card">backText</div>
                        </div> */}
                        <div className="col s2 card-container">
                        <button className="red lighten-2 btn-large" onClick={() => this.showModal(item.ID)}>
                                <i className = "large material-icons">delete</i>
                            </button>
                        </div>
                    </div>
                
                </div>
            )
        })

        return (

            <div className = "flashcard-container center">
                <h2 style={{textTransform: 'capitalize'}} className = "col s12 center white-text truncate">{topic && topic.subCategory || 'Category'}</h2>
                <h3 className = "col s12 center white-text">Cards: {cardCount || '0'}</h3>
                <div className="row container flashcard-row">                    
                    <div className="col s5 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Term</div> 
                    </div>
                    <div className="col s5 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Definition</div>
                    </div>
                    <div className="col s2 card-container">
                        {/* <div className="card-panel red lighten-2 white-text center">Delete</div> */}
                    </div>
                </div>
                {listCards}
                {this.showLoadingBar()}
                <div className = "buttonDiv center">
                    <Link className="blue lighten-2 btn btn-large col s6" to = {`/createflashcards/${params.set_id}/subcategory/${params.topic_id}`} name="action">
                        <i className="material-icons right">add</i>
                        Add Card
                    </Link>
                    <Link className="green lighten-2 btn btn-large col s6" to={`/sets/${params.set_id}`} name="action">
                        <i className="material-icons right">done</i>
                        Done
                    </Link>

                </div>
                { this.state.delete ? <DeleteModal hideModal={this.hideModal }deleteItem={this.delete} /> : '' }
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log("this is your state", state);
    const { sets} = state;

    return {
        topic: sets.currentTopic,
        cards: sets.topicsCards,
        cardCount: sets.topicsCardCount,
        on: sets.on,
        tutorial: sets.on
    }
}

export default connect(mapStateToProps, {
    getTopicsCards,
    deleteCard,
    endTutorial,
    getTutorialCompleted,
})(FlashcardGeneration);