import React, { Component } from 'react';

class DeleteModal extends Component {


    render() {
        const {deleteItem, hideModal} = this.props;

        return (
            <div className="basic-modal" onClick={hideModal}>
                <div className="basic-modal-content">
                    <div onClick={ hideModal } className="basic-modal-close center">X</div>
                        <div>
                            <form className="col s12" onClick={e => e.preventDefault()}>
                                <div className="row"> 
                                    <div className="input-field col s12">
                                        <h6 className="center">Are you sure?</h6>
                                        <div className = "row">
                                            <button className="green lighten-2 btn waves-effect waves-light btn-large" onClick={deleteItem}>Yes</button>
                                            <button className="red lighten-2 btn waves-effect waves-light btn-large" onClick={ hideModal }>No</button>
                                        </div>
                                    </div>  
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        )
    }
}

export default DeleteModal;