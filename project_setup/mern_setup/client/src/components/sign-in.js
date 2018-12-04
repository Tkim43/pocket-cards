import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';


class Signin extends Component {
    renderInput (props) {
        return (
            <div className= {`input-field col ${props.size}`}>
                <input {...props.input} type="text" id = {props.input}/>
                <label htmlFor= {props.input} >{props.label}</label>
                <div className = "red-text">{(props.meta.touched || props.meta.dirty) && props.meta.error}</div>
            </div>
        );
    }

    handleSubmitUsername (values) {
        console.log('Form values: ', values);
    }

    render () {
        const { handleSubmit } = this.props;

        return (
            <div className = "container">
                <h1>this is the log in page</h1>
                <form onSubmit = {handleSubmit(this.handleSubmitUsername)}>
                    <div className="row">
                        <Field size = "s12" name = "username" label = "username" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <Field size = "s12" name = "password" label = "password" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <div className="col s12 right-align">
                            <Link to = "/" className = "green lighten-2 btn">Log In</Link>
                        </div>
                    </div>
                </form>
            </div>
            
        );
    }
}

function validate (formValues) {
    const error = {};

    if(!formValues.username){
        error.username = "Please enter a valid username";
    }
    if(formValues.password && (formValues.password.length < 8 || formValues.password.length > 32)){
        error.password = "Please enter a password that is greater than 8 characters, but less than or equal to 32 characters";
    }
    if(!formValues.password){
        error.password = "Please enter a valid password";
    }

    return error;
}

export default reduxForm ({
    form: 'sign-in',
    validate: validate
})(Signin);
 
