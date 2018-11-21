import React, {Component} from 'react';
import '../assets/css/FlashcardGeneration.css';
import Front from '../../../server/editFront.json';
import Back from '../../../server/editBack.json';

class FlashcardGeneration extends Component {

    constructor (props){
        super(props);
        this.state = {
            term: Front,
            definition: Back
        }
    }

    // makeFlashcards (props) {
    //     console.log(props);
    //     return (
    //         <div className="row">
    //             <div className="col s6 card-container">
    //                 <div className="card-panel teal lighten-1 white-text card">Lorem ipsum</div> 
    //             </div>
    //             <div className="col s6 card-container">
    //                 <div className="card-panel teal lighten-1 white-text card">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
    //             </div>
    //         </div>
    //     );
    // }

    // populateListData () {
    //     {this.state.map( () => (
    //         <div className="col s6 card-container">
    //             <div className="card-panel blue lighten-2 white-text center">{front_description}</div>
    //         </div>
    //     ))}
    // }


    render () {
        console.log("State: ", this.state);
        console.log("Back: ", Back);
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
                <div className="row">
                    <div className="col s5 card-container">
                        <div className="card-panel teal lighten-1 white-text card" >
                            <p>{Front[0].front_description}</p>
                        </div> 
                    </div>
                    <div className="col s5 card-container">
                        <div className="card-panel teal lighten-1 white-text card">
                            <p>{Back[0].back_description}</p>
                        </div>
                    </div>
                    <div className="col s2 card-container">
                        <div className = "card-panel red lighten-2 white-text center">Trashcan</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s5 card-container">
                        <div className="card-panel teal lighten-1 white-text card" >
                            <p>{Front[1].front_description}</p>
                        </div> 
                    </div>
                    <div className="col s5 card-container">
                        <div className="card-panel teal lighten-1 white-text card">
                            <p>{Back[1].back_description}</p>
                        </div>
                    </div>
                    <div className="col s2 card-container">
                        <div className = "card-panel red lighten-2 white-text center">Trashcan</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s5 card-container">
                        <div className="card-panel teal lighten-1 white-text card" >
                            <p>{Front[2].front_description}</p>
                        </div> 
                    </div>
                    <div className="col s5 card-container">
                        <div className="card-panel teal lighten-1 white-text card">
                            <p>{Back[2].back_description}</p>
                        </div>
                    </div>
                    <div className="col s2 card-container">
                        <div className = "card-panel red lighten-2 white-text center">Trashcan</div>
                    </div>
                </div>


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