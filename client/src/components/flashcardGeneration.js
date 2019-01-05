import React, { Component } from 'react';
import '../assets/css/FlashcardGeneration.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTopicsCards } from '../actions';
import { deleteCard} from '../actions';
import DeleteModal from './deleteModal';

class FlashcardGeneration extends Component {
    constructor(props) {
        super(props);

        this.state = {
          error: false,
          hasMore: true,
          isLoading: false,
          total_cards: [],
          page: 1,
          windowHeight: null,
          scrollPosition: null,
          getDataHeight: null,
          loadingData: false
        };

    
        // Binds our scroll event handler
        window.onscroll = this.checkScroll.bind(this);
      }

    componentDidMount(){
        const { getTopicsCards, match: { params } } = this.props;
        getTopicsCards(params.set_id, params.topic_id);
    }

    checkScroll = () => {
        const {
          showSpinner,
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
        this.setState({
            windowHeight: window.innerHeight,
            scrollPosition: document.documentElement.scrollTop,
            getDataHeight: document.documentElement.scrollHeight
        });
      //   this.state.windowHeight = window.innerHeight;
      //   const scrollPosition = document.documentElement.scrollTop;
      //   const getDataHeight = document.documentElement.scrollHeight;
      //   console.log("win height: ", windowHeight);
      //   console.log("scroll position: ", scrollPosition);
      //   console.log("getData height: ", getDataHeight);

        let calculated = this.state.scrollPosition + this.state.windowHeight;
        
        if (calculated >= this.state.getDataHeight && this.state.loadingData === false && this.props.cards) {
          this.setState({
            loadingData : true
          });
        //   console.log('=============== GET MORE DATA ===============');
          
          setTimeout(function() {
              loadCards();
          }, 1000);

        }
      };

    loadCards = () => {
        let page_counter = this.state.page + 1;
        this.setState({ page: page_counter,
                        loadingData: false});
        
        if(this.props.cards[((this.state.page * 10))] === undefined){
            this.setState({
                hasMore: false
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
            cardId
        });
    }

    hideModal = () =>{
        this.setState({
            delete: false
        })
    }

    showLoadingBar = () => {
        return (
            <div className="progress container">
                <div className="indeterminate"></div>
            </div>
        );
    }

    render () {

        console.log("these are your props", this.props);
        console.log("Page Counter: ", this.state);

        if(this.state.loadingData === true && this.state.hasMore){
            let calculated = this.state.scrollPosition + this.state.windowHeight;

            if(this.state.loadingData === true && calculated >= this.state.getDataHeight){
                var showLoadingBarVariable = this.showLoadingBar();
            }
            
        }


        const { cardCount, cards, match: { params }, topic } = this.props;

        let start = this.state.page - 1;
        let end = this.state.page * 10;

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
                        <div className="col s5 card-container">
                            <Link to = {path} className="card-panel teal lighten-1 white-text text-inside-card" >
                                <div>{frontText}</div>
                            </Link> 
                        </div>
                        <div className="col s5 card-container">
                            <Link to = {path} className="card-panel teal lighten-1 white-text text-inside-card">
                                <div>{backText}</div>
                            </Link>
                        </div>
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
                <h2 style={{textTransform: 'capitalize'}} className = "col s12 center white-text">{topic && topic.subCategory || 'Category'}</h2>
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
                {showLoadingBarVariable}
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
    const { sets } = state;

    return {
        topic: sets.currentTopic,
        cards: sets.topicsCards,
        cardCount: sets.topicsCardCount
    }
}

export default connect(mapStateToProps, {
    getTopicsCards,
    deleteCard
})(FlashcardGeneration);