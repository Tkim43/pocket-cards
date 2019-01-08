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
                <input {...props.input} className = "black-text" type= {props.type || "text"} id = {props.input.name}/>
                <label htmlFor= {props.input.name} >{props.label}</label>
                <ul>
                    {(props.meta.touched || props.meta.dirty) && props.meta.error && props.meta.error.map ( (item, index) => {
                        return <li key = {index} className="red-text text-size">{item}</li>
                    })}
                </ul>
            </div>
        );
    }

    handleClick = async (values) => {
        console.log("SIgn up values: ", values);

        this.setState({
            category: category.value,
            subCategory: subCategory.value
        });

        const { categoryId, subCategoryId } = await this.props.sendCategoryAndSubcategoryData({category: values.category},{subCategory: values.subCategory});


        this.props.history.push(`/createflashcards/${categoryId}/subcategory/${subCategoryId}`);
    }

    open = () => this.setState({isOpen: true});

    close = () => this.setState({isOpen: false});

    render(){
        const { handleSubmit, match: { params }, reset } = this.props;

        console.log("THIS IS PROPS: ", this.props);
        console.log("THIS IS STATE: ", this.state);

        if(this.state.isOpen){
            return (
                <div className="basic-modal" onClick={this.close}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.close} className="basic-modal-close center">X</div>
                            <div>
                                <form onSubmit = {handleSubmit(this.handleClick)}>
                                    <div className="row text-black">
                                        <Field className = "text-black" name = "category" size = "s12" type = "text" label = "Create Category" component = {this.renderInput}/>
                                    </div>
                                    <div className="row text-black">
                                        <Field className = "text-black" name = "subCategory" size = "s12" type = "text" label = "Create Subcategory" component = {this.renderInput}/>
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
                <button onClick ={this.open} className="col s12 bold-text blue lighten-2 btn-large">Create Cards    <i className="material-icons large">add_box</i>
            </button>
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

    if(!formValues.category){
        error.category = ['Please input a category title'];
    }

    if(!formValues.subCategory){
        error.subCategory = ['Please input a subcategory title'];
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