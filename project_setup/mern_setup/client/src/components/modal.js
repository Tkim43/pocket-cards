import React from 'react'
// import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
   
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#root')

   
  class modal extends React.Component {
    constructor() {
      super();
   
      this.state = {
        modalIsOpen: false
      };
   
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
   
    openModal() {
      this.setState({modalIsOpen: true});
    }
   
    afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle1.style.color = '#f00';
      this.subtitle2.style.color = '#f00';
    }
   
    closeModal() {
      this.setState({modalIsOpen: false});
    }
   
    render() {

        const { term } = this.state;

      return (
        <div>
          <button onClick={this.openModal}>Create Category</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
   
            <button onClick={this.closeModal}>x</button>
            <form className="col s12">
            <div className="row">
            <div className="input-field col s12">
            <h5 ref={subtitle1 => this.subtitle1 = subtitle1}>Enter Category</h5>
            <textarea value={term} onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
            </div>
            </div>

            <div className="row"> 
                <div className="input-field col s12">
                <h5 ref={subtitle2 => this.subtitle2 = subtitle2}>Enter Title</h5>
                        <textarea value={term} onChange={ e => this.setState({term: e.target.value})}  className="materialize-textarea" id="textarea1"></textarea>
                </div>  
            </div>
            </form>
          </Modal>
        </div>
      );
    }
  }

export default modal;