import React, {Component} from 'react';
import '../assets/css/FlashcardGeneration.css';

class FlashcardGeneration extends Component {
    render () {
        return (
            <div>
                <h1 className = "col s12 center">Cartoons</h1>
                <h2 className = "col s12 center">Cards Created: 3</h2>
                <div className="row">
                    <div className="col s6 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Term</div> 
                    </div>
                    <div className="col s6 card-container">
                        <div className="card-panel blue lighten-2 white-text center">Definition</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 card-container">
                        <div className="card-panel teal lighten-1 white-text card">Lorem ipsum</div> 
                    </div>
                    <div className="col s6 card-container">
                        <div className="card-panel teal lighten-1 white-text card">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 card-container">
                        <div className="card-panel teal lighten-1 white-text card">Lorem ipsum</div> 
                    </div>
                    <div className="col s6 card-container">
                        <div className="card-panel teal lighten-1 white-text card">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 card-container">
                        <div className="card-panel teal lighten-1 white-text card">Lorem ipsum</div> 
                    </div>
                    <div className="col s6 card-container">
                        <div className="card-panel teal lighten-1 white-text card">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FlashcardGeneration;