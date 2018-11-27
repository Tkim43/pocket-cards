import React, { Component } from 'react';

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
                                <h5 ref={subtitle1 => this.subtitle1 = subtitle1}>Enter Category</h5>
                                <textarea onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
                                </div>
                                </div>

                                <div className="row"> 
                                <div className="input-field col s12">
                                <h5 ref={subtitle2 => this.subtitle2 = subtitle2}>Enter Title</h5>
                                <textarea onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
                                </div>  
                                </div>

                                <div className = "buttonDiv">
                    <div to = "/createflashcards" className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                    Create Card
                    </div>
                </div>
                                </form>
                            </div>
                    </div>
                </div>
            )
        }

        return (
            <button onClick={this.open} className="btn btn-outline-primary">Create Category</button>
        );
    }
}

export default ButtonModal;