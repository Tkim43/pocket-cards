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
                <ul>
                    {(props.meta.dirty) || props.meta.error.map ( (item, index) => {
                        return <li key = {index} className="red-text">{item}</li>
                    })}
                </ul>
            </div>
        );
    }

    handleSignIn = (values) => {
        console.log('sign in form values: ', values);
        this.props.userSignIn(values);
    }

    render () {
        const { handleSubmit} = this.props;
        console.log("sign in error:", this.props);
        console.log("this is PW ERRORS: ", this.props.pwErrors);

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
                    {/* <div className="row">
                        {this.renderPassword1()}
                    </div> */}
                    <div className="row">
                        <div className="col s12 right-align">
                            <button className = "btn green lighten-2">Sign In</button>
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

    // if(!formValues.username){
    //     error.username = "Please enter a valid username";
    // }

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

function checkIfPasswordStartsWithLetter (password='', error){
    const regex = /^[a-zA-Z]\S*/g;
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
 
