import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { userSignIn } from '../actions';
import { connect } from 'react-redux';


class Signin extends Component {
    renderInput (props) {
        return (
            <div className= {`input-field col ${props.size}`}>
                <input {...props.input} type= {props.type || "text"} id = {props.input.name}/>
                <label htmlFor= {props.input.name} >{props.label}</label>
                <div className = "red-text">{(props.meta.touched || props.meta.dirty) && props.meta.error}</div>
            </div>
        );
    }

    handleSignIn = (values) => {
        console.log('sign in form values: ', values);
        this.props.userSignIn(values);
    }

    render () {
        const { handleSubmit, signInError} = this.props;

        return (
            <div className = "container">
                <h1>this is the log in page</h1>
                <form onSubmit = {handleSubmit(this.handleSignIn)}>
                    {/* <div className="row">
                        <Field size = "s12" name = "username" label = "username" component = {this.renderInput}/>
                    </div> */}
                    <div className="row">
                        <Field size = "s12" name = "email" label = "email" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <Field size = "s12" type = "password" name = "password" label = "password" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <div className="col s12 right-align">
                            <button className = "btn green lighten-2">Sign In</button>
                            <div className = "red-text text-darken-2">{signInError}</div>
                        </div>
                    </div>
                </form>
            </div>
            
        );
    }
}

function validate (formValues) {
    const error = {};

    // if(!formValues.username){
    //     error.username = "Please enter a valid username";
    // }

    if(!formValues.email){
        error.email = "Please enter an email";
    }
    if(!formValues.password){
        error.password = "Please enter a valid password";
    }
    if(formValues.password && (formValues.password.length < 8 || formValues.password.length > 32)){
        error.password = "Please enter a password that is greater than 8 characters, but less than or equal to 32 characters";
    }

    checkIfValidEmail (formValues.email, error);
    checkIfValidPassword (formValues.password, error);

    return error;
}

function checkIfValidEmail(email, error){
    const regex = /^(\w)*[@]{1}(\w)+[.]{1}(\w)+$/g;
    const testEmail = regex.test(email);

    if(testEmail === true){
        console.log("valid email satisfied");
    }
    else {
        error.email = "Please input an email that ends with @[your-email-provider]";
    }
}

function checkIfValidPassword(password, error){
    const regex = /^([a-zA-Z]{1})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])).{6,32}$/g;
    const testPassword = regex.test(password);

    if(testPassword === true) {
        console.log('your password was accepted');
    }
    else {
        error.password = "Please input a password that is between 6 - 32 characters";
    }
}

Signin = reduxForm ({
    form: 'signin',
    validate: validate,
})(Signin);

function mapStateToProps (state){
    return {
        signInError: state.user.signInError
    }
}

export default connect(mapStateToProps, {
    userSignIn: userSignIn
})(Signin);
 
