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
                    {(props.meta.touched || props.meta.dirty) && props.meta.error.map ( (item, index) => {
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
                    {/* <div className="row">
                        <Field size = "s12" name = "username" label = "username" component = {this.renderInput}/>
                    </div> */}
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
    const error = {
        email: [],
        password: []
    };

    checkIfValidEmail (formValues.email, error);
    checkIfPasswordStartsWithLetter (formValues.password, error);
    checkIfPasswordHasANum (formValues.password, error);
    checkIfPasswordIsLongEnough (formValues.password, error);

    return error;
}

function checkIfValidEmail(email, error){
    const regex = /^(\w)*[@]{1}(\w)+[.]{1}(\w)+$/g;
    const testEmail = regex.test(email);

    if(testEmail === true){
        console.log("valid email satisfied");
    }
    else {
        error.email.push( "Please input an email that ends with @[your-email-provider]");
    }
}

function checkIfPasswordStartsWithLetter (password = "", error){
    const regex = /^[a-zA-Z]/g;
    const testIfStartWithLetter = regex.test(password);

    console.log("ERROR:", error);
    
    if(testIfStartWithLetter === true){
        console.log("your password starts with a letter");
    }else{
        error.password.push("Password needs to start with letter");
    }
}

function checkIfPasswordHasANum (password = "", error){
    const regex = /\d/g;
    const testIfStartWithLetter = regex.test(password);
    
    if(testIfStartWithLetter === true){
        console.log("your password has at least one number");
    }else{
        error.password.push("Password needs to have at least one number");
    }
}

function checkIfPasswordIsLongEnough (password = "", error){
    const regex = /[\w]{6,32}/g;
    const testIfStartWithLetter = regex.test(password);
    
    if(testIfStartWithLetter === true){
        console.log("your password has 6 - 32 chars");
    }else{
        error.password.push("Password needs to have between 6 to 32 chars");
    }
}

Signup = reduxForm ({
    form: 'sign-up',
    validate: validate
})(Signup);

function mapStateToProps (state){
    return {
        signUpError: state.user.signUpError
    }
}
 
export default connect (mapStateToProps, {
    userSignUp: userSignUp
})(Signup);