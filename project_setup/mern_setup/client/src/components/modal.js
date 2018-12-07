import React, { Component } from 'react';
import '../assets/css/modal.css';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {sendCategoryData} from '../actions';
import {sendSubCategoryData} from '../actions';

class ButtonModal extends Component {
    state = {
        isOpen: false,
        category: '',
        subCategory: ''
    };

    async componentDidMount(){
        this.setState({
            category: this.props.category,
            subCategory: this.props.subCategory
        });
    }


    updateCategory = event =>{
        this.setState({
            category: event.currentTarget.value
        });
    }

    updateSubCategory = event =>{
        this.setState({
            subCategory: event.currentTarget.value
        });
    }

    handleClick = async (e) => {
        e.preventDefault();
        await this.props.sendCategoryData({userID: 1,category: this.state.category});
        await this.props.sendSubCategoryData({setID: 1,subCategory: this.state.subCategory});

        this.props.history.push('/createflashcards');
    }

    open = () => this.setState({isOpen: true});

    close = () => this.setState({isOpen: false});

    render(){
        console.log("Category Props:", this.props);

        if(this.state.isOpen){
            return (
                <div className="basic-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.close} className="basic-modal-close center">X</div>
                            <div>
                                <form className="col s12">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea onChange={this.updateCategory} className="materialize-textarea" id="textarea1"></textarea>
                                                <label htmlFor="textarea1">Create Category</label>
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="input-field col s12">
                                                <textarea onChange={this.updateSubCategory}  className="materialize-textarea" id="textarea1"></textarea>
                                                <label htmlFor="textarea1">Create Title</label>
                                            </div>  
                                        </div>
                                        <div className = "row">
                                            <button onClick={this.handleClick} className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                                                Create Card
                                            </button>
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

function mapStateToProps(state){
    console.log("category and subcategory state", state)
    return{
        category:state.sets.category,
        sets:state.sets.sets
    }
}

export default connect(mapStateToProps, {
    sendCategoryData: sendCategoryData,
    sendSubCategoryData: sendSubCategoryData 
})(withRouter(ButtonModal));