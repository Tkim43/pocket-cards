import React, {Component} from 'react';
import '../assets/css/FlashcardGeneration.css';
import listData from '../dummy_data/list';

class FlashcardGeneration extends Component {

    constructor (props){
        super(props);
        this.state = {
            list : []
        }
    }

    componentDidMount () {
        this.getListData ();
    }

    getListData () {
        //Call server to get data
        this.setState ({
            list: listData
        });
    }


    render () {

        const listCards = this.state.list.map( (item,index) => {
            return (

                <div key = {item.id} className="row">
                    <div className="col s5 card-container">
                        <div className="card-panel teal lighten-1 white-text card" >
                            <p>{item.term}</p>
                        </div> 
                    </div>
                    <div className="col s5 card-container">
                        <div className="card-panel teal lighten-1 white-text card">
                            <p>{item.definition}</p>
                        </div>
                    </div>
                    <div className="col s2 card-container">
                        <div className = "card-panel red lighten-2 white-text center">Trashcan</div>
                    </div>
                </div>
                );
        } );

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
                <div className = "buttonDiv">
                    <button className="blue lighten-2 btn waves-effect waves-light btn-large col s6 left-align" name="action">Add Card
                        <i className="material-icons right">add</i>
                    </button>
                    <button className="green lighten-2 btn waves-effect waves-light btn-large col s6 right-align" type="done" name="action">Done
                        <i className="material-icons right">done</i>
                    </button>
                </div>

            </div>
        );
    }
}

export default FlashcardGeneration;