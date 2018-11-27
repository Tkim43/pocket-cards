import React, { Component } from 'react';
import './modal.css';
import {Link} from 'react-router-dom';

class ButtonModal extends Component {
    state = {
        isOpen: false
    };

    open = () => this.setState({isOpen: true});

    close = () => this.setState({isOpen: false});

    render(){

        if(this.state.isOpen){
            return (
                <div className="basic-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.close} className="basic-modal-close">X</div>
                            <div>
                                <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
                                                <label htmlFor="textarea1">Create Category</label>
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="input-field col s12">
                                                <textarea onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
                                                <label htmlFor="textarea1">Create Title</label>
                                            </div>  
                                        </div>
                                        <div className = "buttonDiv">
                                            <Link to = "/createflashcards" className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                                                Create Card
                                            </Link>
                                        </div>
                                </form>
                            </div>
                    </div>
                </div>
            )
        }

        return (
          
            <div onClick={this.open} className = "card-panel orange lighten-2 white-text center" >Create Category</div>
            
    
        );
    }
}

export default ButtonModal;