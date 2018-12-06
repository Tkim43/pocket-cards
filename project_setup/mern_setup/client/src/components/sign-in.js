import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { userSignIn } from '../actions';
import { connect } from 'react-redux';


class Signin extends Component {
    renderInput (props) {
        console.log("THIS IS THE PROPS: ", props);
        return (
            <div className= {`input-field col ${props.size}`}>
                <input {...props.input} type= {props.type || "text"} id = {props.input.name}/>
                <label htmlFor= {props.input.name} >{props.label}</label>
                <div className = "red-text">{(props.meta.touched || props.meta.dirty) && props.meta.error}</div>
            </div>
        );
    }
    renderPassword1 (props) {

    }

    handleSignIn = (values) => {
        console.log('sign in form values: ', values);
        this.props.userSignIn(values);
    }

    render () {
        const { handleSubmit} = this.props;
        console.log("sign in error:", this.props);

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
                            {/* <div className = "red-text text-darken-2">{signInError}</div> */}
                            <div className = "red-text text-darken-2">{}</div>
                        </div>
                    </div>
                </form>
            </div>
            
        );
    }
}

function validate (formValues) {
    const error = {
    };

    // if(!formValues.username){
    //     error.username = "Please enter a valid username";
    // }

    if(!formValues.email){
        error.email = "Please enter an email";
    }
    // if(!formValues.password){
    //     error.password = "Please enter a valid password";
    // }

    checkIfValidEmail (formValues.email, error);
    checkIfPasswordStartsWithLetter (formValues.password, error);
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

function checkIfPasswordStartsWithLetter (password, error){
    const regex = /^([a-zA-Z]{1})/g;
    const testIfStartWithLetter = regex.test(password);

    console.log("ERROR:", error);
    
    if(testIfStartWithLetter === true){
        console.log("your password starts with a letter");
    }else{
        error.pwStartWithLetter = "password needs to start with letter"
    }
}

function checkIfValidPassword(password, error){
    const regex = /^([a-zA-Z]{1})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])).{6,32}$/g;
    const testPassword = regex.test(password);

    if(testPassword === true) {
        console.log('your password was accepted');
    }
    else {
        error.password = "Password must contain at least 1 capital letter, 1 lowercase letter, and 1 number";
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
 
