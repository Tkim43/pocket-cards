import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userSignUp } from '../actions';
import AvatarImages from './avatarList';
import crab_img from '../assets/images/avatarImages/crab.png';
import crocodile_img from '../assets/images/avatarImages/crocodile.png';
import fish_img from '../assets/images/avatarImages/fish.png';
import frog_img from '../assets/images/avatarImages/frog.png';
import rabbit_img from '../assets/images/avatarImages/rabbit.png';
import reindeer_img from '../assets/images/avatarImages/reindeer.png';
import turtle_img from '../assets/images/avatarImages/turtle.png';


class Signup extends Component {
    renderInput (props) {
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
        this.props.userSignUp(values);
    }

    render () {
        const { handleSubmit} = this.props;

        return (
            <div className = "container">
                <h1>Sign Up</h1>
                <h5 className = "white-text">Please Select Your Desired Avatar</h5>
                <AvatarImages
                    avatars = {[
                        {value: 'crab', id: 1},
                        {value: 'crocodile', id: 2},
                        {value: 'fish', id: 3},
                        {value: 'frog', id: 4},
                        {value: 'rabbit', id: 5},
                        {value: 'reindeer', id: 6},
                        {value: 'turtle', id: 7},
                    ]}
                />
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

function checkIfValidEmail(email){
    const regex = /^(\S)*[@]{1}(\w)+[.]{1}(\w)+$/g;
    const testEmail = regex.test(email);

    if(testEmail){
        return null
    }
    
    return [ "Please input an email that ends with @[your-email-provider]"];
}

function checkIfPasswordStartsWithLetter (password = "", error){
    const regex = /^[a-zA-Z]/g;
    const testIfStartWithLetter = regex.test(password);
    
    if(!testIfStartWithLetter){
        error.push("Password needs to start with letter");
    }
}

function checkIfPasswordHasANum (password = "", error){
    const regex = /\d/g;
    const testIfStartWithLetter = regex.test(password);
    
    if(!testIfStartWithLetter){
        error.push("Password needs to have at least one number");
    }
}

function checkIfPasswordIsLongEnough (password = "", error){
    const regex = /[\W]{6,32}/g;
    const testIfStartWithLetter = regex.test(password);
    
    if(!testIfStartWithLetter){
        error.push("Password needs to have between 6 to 32 chars");
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