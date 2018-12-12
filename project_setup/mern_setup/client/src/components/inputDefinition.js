import React, {Component, Fragment} from 'react';
import "../assets/css/inputDefinition.css";
import { Field, reduxForm} from 'redux-form'; 
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {sendCreateCardData, sendCategoryAndSubcategoryData} from '../actions';

class InputDefinition extends Component {
  
    state = {
        card_count: 0
    }
    
    cardCounter = () =>{
        this.setState={
            card_count: this.state.card_count++
        };
    }

    renderInput (props) {
        return (
            <div className= {`input-field col ${props.size}`}>
                <input {...props.input} type= {props.type || "text"} id = {props.input.name} autoComplete = "off"/>
                <label htmlFor= {props.input.name} >{props.label}</label>
            </div>
        );
    }

    handleAddDefinition = (values) => {
        console.log("THIS IS THIS PROPS: ", this.props);
        console.log("THIS IS THE VALUES", values);
        values.subCategoryId = this.props.subCategoryId;
        this.props.sendCreateCardData(values);
    }
    
    render () {

        console.log("=====PROPS====: ", this.props);

        const { handleSubmit, reset } = this.props;

        return (
            <Fragment>
                <div className = "container">
                    <h1>Cards Created: {this.state.card_count}</h1>
    
                    <form onSubmit = {handleSubmit(this.handleAddDefinition)}>
                        <div className="row">
                            <Field name = "frontText" size = "s12" type = "text" label = "Term" component = {this.renderInput}/>
                        </div>
                        <div className="row">
                            <Field name = "backText" size = "s12" type = "text" label = "Definition" component = {this.renderInput}/>
                        </div>
                        <div className="row">
                            
                        </div>
                        <div className = "buttonDiv">
                            <button className="blue lighten-2 btn waves-effect waves-light btn-large" name="action">Add Card
                                <i className="material-icons right">add</i>
                            </button>
                        </div>
                        {/* <div className = "buttonDiv">
                            <button onClick={this.handleEditClick}  className="red lighten-2 btn waves-effect waves-light btn-large" name="action">Edit Cards
                                <i className="material-icons right">create</i>
                            </button>
                        </div> */}
                        <div className = "buttonDiv">
                            <Link to = "/profile" className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">Done
                                <i className="material-icons right">done</i>
                            </Link>
                        </div>
                    </form>
                </div>
            </Fragment>
        ); 
    }
}


function mapStateToProps(state){
    console.log("====NEW PROPS CAT ID, SUB ID====:", state);
    return{
        frontText: state.sets.front_description,
        backText: state.sets.back_description,
        categoryId: state.sets.categoryId,
        subCategoryId: state.sets.subCategoryId
    }
}

InputDefinition = reduxForm ({
    form: "input-defintion",
})(InputDefinition);

export default connect(mapStateToProps,{
    sendCreateCardData,
    sendCategoryAndSubcategoryData
})(withRouter(InputDefinition));