import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userSignUp } from '../actions';


class Signup extends Component {
    renderInput (props) {
        console.log("THIS IS THE PROPS: ", props);
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

    handleSignUp = (values) => {
        console.log('Form values: ', values);
        this.props.userSignUp(values);
    }

    render () {
        const { handleSubmit} = this.props;

        return (
            <div className = "container">
                <h1>this is the signup page</h1>
                <form onSubmit = {handleSubmit(this.handleSignUp)}>
                    <div className="row">
                        <Field size = "s12" name = "displayName" label = "Username" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <Field size = "s12" name = "email" label = "email" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <Field size = "s12" name = "password" type = "password" label = "password" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <div className="col s12 right-align">
                            <button className = "green lighten-2 btn">Sign up</button>
                        </div>
                    </div>
                </form>
            </div>
            
        );
    }
}

function validate (formValues) {
    const error = {};
    const passwordErrors = [];

    if(!formValues.displayName){
        error.displayName = ['Please choose a username'];
    }

    error.email = checkIfValidEmail (formValues.email, error);
    checkIfPasswordStartsWithLetter (formValues.password, passwordErrors);
    checkIfPasswordHasANum (formValues.password, passwordErrors);
    checkIfPasswordIsLongEnough (formValues.password, passwordErrors);

    if(passwordErrors.length){
        error.password = passwordErrors;
    }

    return error;
}

function checkIfValidEmail(email, error){
    const regex = /^(\w)*[@]{1}(\w)+[.]{1}(\w)+$/g;
    const testEmail = regex.test(email);

    if(testEmail === true){
        console.log("valid email satisfied");
        return null
    }
    
    return [ "Please input an email that ends with @[your-email-provider]"];
}

function checkIfPasswordStartsWithLetter (password = "", error){
    const regex = /^[a-zA-Z]/g;
    const testIfStartWithLetter = regex.test(password);

    console.log("ERROR:", error);
    
    if(testIfStartWithLetter === true){
        console.log("your password starts with a letter");
    }else{
        error.push("Password needs to start with letter");
    }
}

function checkIfPasswordHasANum (password = "", error){
    const regex = /\d/g;
    const testIfStartWithLetter = regex.test(password);
    
    if(testIfStartWithLetter === true){
        console.log("your password has at least one number");
    }else{
        error.push("Password needs to have at least one number");
    }
}

function checkIfPasswordIsLongEnough (password = "", error){
    const regex = /[\w]{6,32}/g;
    const testIfStartWithLetter = regex.test(password);
    
    if(testIfStartWithLetter === true){
        console.log("your password has 6 - 32 chars");
    }else{
        error.push("Password needs to have between 6 to 32 chars");
    }
}

Signup = reduxForm ({
    form: 'sign-up',
    validate: validate,
    initialValues: {
        displayName: 'Scoot',
        email: 'scoot@mail.com',
        password: 'asdf1234'
    }
})(Signup);

function mapStateToProps (state){
    return {
        signUpError: state.user.signUpError
    }
}
 
export default connect (mapStateToProps, {
    userSignUp: userSignUp
})(Signup);