
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/sets.css'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'; 
import { getSetsData , deleteSubcategory, createSubcategory} from '../actions';
import DeleteModal from './deleteModal';
import { getTopicsCards } from '../actions';

class Sets extends Component{
    state = {
        show: false,
        delete: false,
        index: null,
    };
    componentDidMount(){
        this.props.getSetsData(this.props.match.params.set_id);
    }
    startSets= async ()=>{
        return(
            <div>

            </div>
        )
    }
    delete = async ()=>{
        this.setState({
            delete: true
        })
        const {deleteSubcategory} = this.props
        await deleteSubcategory(this.props.topics[this.state.index].topicID, this.props.match.params.set_id);
        this.props.getSetsData(this.props.match.params.set_id);
        this.hideModal();
    }

    async updateSubcategoryList(){
        try{
            const {getSetsData, match: {params}} = this.props
            await getSetsData(params.set_id);
        }catch(err){
            dispatch({
                type: types.ERROR,
                error: "Error updating subcategory list"
            });
        }
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
                        return <li key = {index} className="red-text">{item}</li>
                    })}
                </ul>
            </div>
        );
    }


    createSubcategory  = async (values) => {
            this.setState({
                subCategory: subCategory.value
            });
    
        const {createSubcategory, match:{params}} = this.props
        createSubcategory(params.set_id, {subCategory: values.subCategory})
        this.updateSubcategoryList();
        this.hideModal();
    }

    showModal = (event, index) =>{
        const buttonType = event.target.classList[0];
        let show = null;
        let remove = null;
        if (buttonType === 'green') {
            show = true;
            remove = false;
        } else {
            show = false;
            remove = true;
        }
        this.setState({
            show: show,
            delete: remove,
            index
        });
    }

    hideModal = () =>{
        this.props.untouch('category', 'subCategory');
        this.setState({
            show: false,
            delete: false
        });
        this.props.reset();
    }

    render(){
        const { handleSubmit, match: { params }, reset } = this.props;
        if(this.props.error){
            return (
                <a onClick={M.toast({html: "Oops! Something went wrong"})} className="btn, center">{this.props.error}</a>
            )
        }
        if(this.state.show){
            return (
                <div className="basic-modal" onClick={this.hideModal}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.hideModal} className="basic-modal-close center">X</div>
                        <div>

                            <form onSubmit = {handleSubmit(this.createSubcategory)}>
                                <div className="row text-black">
                                    <Field className = "text-black" name = "subCategory" size = "s12" type = "text" label = "Create Topic" component = {this.renderInput}/>
                                </div>
                                <div className = "row">
                                    <button className="green lighten-2 btn btn-large" type="done" name="action">
                                        Create Subcategory
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        
        const { category} = this.props;
        const userSubCategories = this.props.topics.map ((item, index) => {
            return(
                <div key= {index}>
                    <div className = "row set">
                    {this.props.topics[index].cardCount > 0 ?
                        <Link to={`/displayCard/${item.setID}/topic/${item.topicID}/card/0`} className ="btn blue darken-3 ">
                        <div className="container">
                            <div className="title-name">{item.subCategory}</div>
                            <div className="terms">{`${this.props.topics[index].cardCount} terms`} <i className="material-icons">view_list</i></div>
                            
                        </div>
                        </Link> : 
                        <Link to={`/flashcardGeneration/${item.setID}/topic/${item.topicID}/`} className ="btn blue darken-3 ">
                        <div>
                            <div className="title-name">{item.subCategory}</div>
                            <div className="terms">{`${this.props.topics[index].cardCount} terms`} <i className="material-icons">view_list</i></div>
                        </div>
                        </Link>
                    }
                    
                        <button className="delete-button red lighten-2 set btn-large" onClick={(e)=>{this.showModal(e, index)}}>
                            <i className= "large material-icons">delete</i>
                        </button>
                    </div>
                </div>
            );  
        });
        return(
        <div className="container">
            <div className="center set-container">
                <h3 className="white-text truncate">Category: {category}</h3>
                <div className="col s12">
                    {/* {userSubCategories} */}
                    {this.props.topics[0] ? userSubCategories :
                    <div>
                    <p className="white-text center">Welcome to PocketCards!</p>
                    <p className="white-text center">Create a topic below to begin</p>
                    </div>
                    }
                </div>
                <div className="set-buttons row">
                    <div className="col s12">
                        <button onClick = {this.showModal} className="green btn lighten-2 wide-btn">Add Topic</button>
                    </div>
                    <div className="col s12">
                        <Link to="/profile" className="btn yellow darken-2 wide-btn">Home</Link>
                    </div>
                </div>
                { this.state.delete ? <DeleteModal hideModal={this.hideModal }deleteItem={this.delete} /> : '' }
            </div>
        </div>
        );
    }
}

function validate (formValues) {
    const error = {};
    const subCategoryError = [];

    if(!formValues.subCategory){
        error.subCategory = ['Please input a subcategory title'];
    }

    checkIfSubCategoryIsLongEnough (formValues.subCategory, subCategoryError);

    if(subCategoryError.length){
        error.subCategory = subCategoryError;
    }

    return error;

    

}

function checkIfSubCategoryIsLongEnough (subcategory = "", error){
    const regex = /^\S.{1,40}$/;
    const testIfSubcategoryIsLongEnough = regex.test(subcategory);
    
    if(!testIfSubcategoryIsLongEnough){
        error.push("Topic needs to have between 1 to 40 chars");
    }
}

function mapStateToProps(state){
    const initialValues = {};

    if(state.form['button-modal']){
        initialValues.category = '';
        initialValues.subCategory = '';
    }
    return{
        category: state.sets.category,
        topics: state.sets.topics,
        cards: state.sets,
        error: state.sets.error,
        initialValues
    }
}

Sets = reduxForm ({
    form: "sets-modal",
    validate: validate,
    shouldError: function(params){
        if (params.initialRender) { return false; }
        if(params.nextProps.submitting === true && params.props.submitting === false){
            return true;
        }
        return true;
    }
})(Sets);

export default connect(mapStateToProps, {
    getSetsData,
    deleteSubcategory,
    createSubcategory,
})(Sets);

