import React, {Component} from 'react';
import profileInfo from '../dummy_data/profile_info';
import "../assets/css/profile.css";
import picture from "../assets/images/profile_pic.jpg";
import {Link} from 'react-router-dom';
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

Modal.setAppElement('#root')

class Profile extends Component {

    constructor (props){
        super(props);
        this.state = {
            list : [],
            modalIsOpen: false
        };
        
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
    
    componentDidMount () {
        this.getListData ();
        // console.log("test: ", this.state.list.data[0]);
    }
    
    getListData () {
        //Call server to get data
        this.setState ({
            list: profileInfo
        });
        // console.log(this.state.list.data[0].username);
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

    render () {

        const profileInformation = this.state.list.map( (item,index) => {
            return (
                <div key = {item.id} className="row">
                    <div className="col s2 profile-heading">
                        <img src= {picture} alt="" className="circle responsive-img"></img>
                    </div>
                    <div className="col s10 profile-heading">
                        <div className="black-text">{item.username}</div>
                        <div className="button-profile-heading">
                            <button className = "btn-small light-blue lighten-3">Latest</button>
                            <button className = "btn-small light-blue lighten-3">Alphabetical</button>
                        </div>
                    </div>
                </div>
            );
        } );

        // console.log(this.state.list.data);
        const { term } = this.state;
        return (
    <div>
            <div className = "container profile-container">
                {profileInformation}
                <div className = "sort-row row">
                    <div className="sort">Sort: </div>
                    <button className = "btn light-blue lighten-3">Alphabetical</button>
                </div>
                <div className="row">
                    <div className="col s12 card-container">
                        <div onClick={this.openModal} to = "/modal" className = "card-panel orange lighten-2 white-text center hoverable modal-trigger">Create a New Category +</div>
                        
                    </div>
                </div>

                <div className="row">
                    <div className="col s12 card-container">
                        <Link to = "/sets" className = "card-panel green lighten-2 white-text center">Physics</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 card-container">
                        <Link to = "/sets" className = "card-panel green lighten-2 white-text center">Math</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 card-container">
                        <Link to = "/sets" className = "card-panel green lighten-2 white-text center">Ginger Rebellion</Link>
                    </div>
                </div>
            </div>

    <div>
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
                            <textarea ref={e => this.text2 = e} className="materialize-textarea" id="textarea2"></textarea>
                    </div>  
                </div>
                <div className = "buttonDiv">
                    <Link to = "/createflashcards" className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                    Create Card
                    </Link>
                </div>
            </form>
        </Modal> 
    </div>
</div>
        );
    }
}


export default Profile;