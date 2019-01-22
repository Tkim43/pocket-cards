import React, { Component } from 'react';
import '../assets/css/modal.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendCategoryAndSubcategoryData } from '../actions';

class ButtonModal extends Component {
    state = {
        isOpen: false,
        category: '',
        subCategory: ''
    };

    open = () => this.setState({isOpen: true});

    close = () => this.setState({isOpen: false});

    render(){

        if(this.state.isOpen){
            return (
                <div className="basic-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.close} className="basic-modal-close center">X</div>
                            <div>
                                <form className="col s12">
                                        <div>
                                            <h6 className="center">Are you sure you want to discard the changes you made?</h6>
                                        </div>
                                        <div className = "row">
                                            <button onClick={this.handleClick} className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                                                Yes
                                            </button>
                                            <button onClick={this.handleClick} className="red lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                                                No
                                            </button>
                                        </div>
                                </form>
                            </div>
                    </div>
                </div>
            )
        }

        return (
            <React.Fragment>
                <button onClick={this.open} className = "col s12 btn red darken-2">Cancel</button>
            </React.Fragment>
        );
    }
}


export default ButtonModal;