import React, { Component } from 'react';
import '../assets/css/modal.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 
import { sendCategoryAndSubcategoryData } from '../actions';

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

    renderInput (props) {
        return (
            <div className= {`input-field col ${props.size}`}>
                <input {...props.input} type= {props.type || "text"} id = {props.input.name}/>
                <label htmlFor= {props.input.name} >{props.label}</label>
                <ul>
                    {(props.meta.touched || props.meta.dirty) && props.meta.error && props.meta.error.map ( (item, index) => {
                        return <li key = {index} className="red-text">{item}</li>
                    })}
                </ul>
            </div>
        );
    }

    handleClick = async (e) => {
        e.preventDefault();
        const { categoryId, subCategoryId } = await this.props.sendCategoryAndSubcategoryData({category: this.state.category},{subCategory: this.state.subCategory});


        this.props.history.push(`/createflashcards/${categoryId}/subcategory/${subCategoryId}`);
    }

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
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.updateCategory} type="text" className="validate" id="textarea1"></input>
                                                <label htmlFor="textarea1">Create Category</label>
                                            </div>
                                        </div>
                                        <div className="row"> 
                                            <div className="input-field col s12">
                                                <input onChange={this.updateSubCategory} type="text" className="validate" id="textarea2"></input>
                                                <label htmlFor="textarea2">Create Title</label>
                                            </div>  
                                        </div>
                                        <div className = "row">
                                            <button onClick={this.handleClick} className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                                                Create Card
                                            </button>
                                        </div>
                                </form>


                                {/* <form onSubmit = {handleSubmit(this.handleAddDefinition)}>
                                    <div className="row">
                                        <Field name = "frontText" size = "s12" type = "text" label = "Term" component = {this.renderInput}/>
                                    </div>
                                    <div className="row">
                                        <Field name = "backText" size = "s12" type = "text" label = "Definition" component = {this.renderInput}/>
                                    </div>
                                    <div className="row">
                                        
                                    </div>
                                    <div className = "buttonDiv">
                                        <button className="blue lighten-2 btn btn-large" name="action">Add Card
                                            <i className="material-icons right">add</i>
                                        </button>
                                    </div>
                                    <div className = "buttonDiv">
                                        <Link to = {`/flashCardGeneration/${params.set_id}/topic/${params.topic_id}`} className="green lighten-2 btn btn-large" type="done" name="action">Done
                                            <i className="material-icons right">done</i>
                                        </Link>
                                    </div>
                                </form> */}
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

function validate (formValues) {
    const error = {};

    console.log("THESE ARE THE FORM VALUES: ", formValues);

    if(!formValues.frontText){
        error.frontText = ['Please input a term'];
    }

    if(!formValues.backText){
        error.backText = ['Please input a definition'];
    }

    return error;

}


function mapStateToProps(state){
    return{
        category:state.sets.category,
        subCategory:state.sets.subCategory
    }
}

ButtonModal = reduxForm ({
    form: "button-modal",
    validate: validate
})(ButtonModal);

export default connect(mapStateToProps, {
    sendCategoryAndSubcategoryData
})(withRouter(ButtonModal));