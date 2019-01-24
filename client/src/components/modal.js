import React, { Component } from 'react';
import '../assets/css/modal.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 
import { sendCategoryAndSubcategoryData } from '../actions';
import RenderInput from '../components/renderInputs';

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


    handleClick = async (values) => {

        if(values[0] || values[1] === ""){
            return;
        }

        this.setState({
            category: category.value,
            subCategory: subCategory.value
        });

        const { categoryId, subCategoryId } = await this.props.sendCategoryAndSubcategoryData({category: values.category},{subCategory: values.subCategory});


        this.props.history.push(`/createflashcards/${categoryId}/subcategory/${subCategoryId}`);
    }

    open = () => this.setState({isOpen: true});

    close = () => {
        this.props.untouch('category', 'subCategory');
        this.setState({isOpen: false});
        this.props.reset();
    }

    render(){
        const { handleSubmit, match: { params }, reset } = this.props;

        if(this.state.isOpen){
            return (
                <div className="basic-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.close} className="basic-modal-close center">X</div>
                            <div>
                                <form onSubmit = {handleSubmit(this.handleClick)}>
                                    <div className="row text-black">
                                        <Field className = "text-black" name = "category" getRenderedComponent={true} size = "s12" type = "text" label = "Create Category" component = {RenderInput}/>
                                    </div>
                                    <div className="row text-black">
                                        <Field className = "text-black" name = "subCategory" size = "s12" type = "text" label = "Create Subcategory" component = {RenderInput}/>
                                    </div>
                                    <div className = "row">
                                        <button className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                                            Create Card
                                        </button>
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
            )
        }

        if (this.props.createCards) {
            return(
                <button onClick ={this.open} className="create-card col s12 bold-text blue lighten-2 btn-large">Create Cards    <i className="material-icons large">add_box</i>
            </button>
            )
        }

        return (
          
            <div onClick={this.open} className = "create-category-bold-text card-panel orange lighten-2 white-text center" >Create Category</div>
            
    
        );
    }
}

function validate (formValues) {
    const error = {};
    const categoryError = [];
    const subCategoryError = [];

    if(!formValues.category){
        error.category = ['Please input a category title'];
    }

    if(!formValues.subCategory){
        error.subCategory = ['Please input a subcategory title'];
    }

    checkIfSubCategoryIsLongEnough (formValues.subCategory, subCategoryError);
    checkIfCategoryIsLongEnough (formValues.category, categoryError);

    if(subCategoryError.length){
        error.subCategory = subCategoryError;
    }

    if(categoryError.length){
        error.category = categoryError;
    }

    return error;

}

function checkIfSubCategoryIsLongEnough (subcategory = "", error){
    const regex = /^\w{1,40}$/;
    const testIfSubcategoryIsLongEnough = regex.test(subcategory);
    
    if(!testIfSubcategoryIsLongEnough){
        error.push("Subcategory needs to have between 1 to 40 chars");
    }
}

function checkIfCategoryIsLongEnough (category = "", error){
    const regex = /^\w{1,50}$/;
    const testIfCategoryIsLongEnough = regex.test(category);
    
    if(!testIfCategoryIsLongEnough){
        error.push("Category needs to have between 1 to 50 chars");
    }
}


function mapStateToProps(state){

    const initialValues = {};

    if(state.form['button-modal']){
        initialValues.category = '';
        initialValues.subCategory = '';
    }
    return{
        category:state.sets.category,
        subCategory:state.sets.subCategory,
        initialValues
    }
}

ButtonModal = reduxForm ({
    form: "button-modal",
    validate: validate,
    shouldError: function(params){
        if (params.initialRender) { return false; }
        if(params.nextProps.submitting === true && params.props.submitting === false){
            return true;
        }
        return true;
    }
})(ButtonModal);

export default withRouter(connect(mapStateToProps, {
    sendCategoryAndSubcategoryData
})(ButtonModal));