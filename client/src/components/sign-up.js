import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userSignUp } from '../actions';
import '../assets/css/dropdown.css';

class Signup extends Component {
    state = {
        avatars: [
            {value: 'default', img: '/avatars/default_avatar.png', id: 0},
            {value: 'crab', img: '/avatars/crab.png', id: 1},
            {value: 'crocodile', img: '/avatars/crocodile.png', id: 2},
            {value: 'fish', img: '/avatars/fish.png' ,id: 3},
            {value: 'frog', img: '/avatars/frog.png' ,id: 4},
            {value: 'rabbit', img: '/avatars/rabbit.png' , id: 5},
            {value: 'reindeer', img: '/avatars/reindeer.png', id: 6},
            {value: 'turtle', img: '/avatars/turtle.png' ,id: 7},
        ],
        showItems: false,
        selectedItem: "default"
    }

    closeDropDown = () => {
        if(document.querySelector(".select-box--arrow-up")){
            this.setState({
                showItems: false
            });
        }
    }
    
    dropDown = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems
        }))
    }

    selectItem = (item) => {
        this.setState({
            selectedItem: item,
            showItems: false,
        })
    }


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
        values.avatar = this.state.selectedItem.value;
        this.props.userSignUp(values);
    }

    render () {

        const { handleSubmit} = this.props;

        return (
            <div onClick = {this.closeDropDown} className = "container">
                <h1>Sign Up</h1>
                <h5 className = "white-text">Please Select An Avatar</h5>

                <div>
                    <div className="select-box--box">
                        <div className="select-box--container">
                            <div className="select-box--selected-item" onClick={this.dropDown}>
                                { this.state.selectedItem.value || this.state.avatars[0].value }
                            </div>
                            <div
                                className="select-box--arrow"
                                onClick={this.dropDown}
                            ><div className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}/></div>
                        </div>
                        <div
                            className="select-box--items"
                            style={{display: this.state.showItems ? 'block' : 'none'}}
                        >
                            {
                                this.state.avatars.map(item => <div
                                    key={item.id}
                                    onClick={() => this.selectItem(item)}
                                    className={this.state.selectedItem === item ? 'selected' : ''}
                            >
                                { item.value}
                                <img className = "icon_image" src={item.img} alt=""/> 
                            </div>)
                        }
                        </div>
                    </div>
                </div>


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
                        <Field size = "s12" name = "confirmpassword" type = "password" label = "confirm password" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <div className="col s12 red-text">{this.props.repeatUserError[1]}</div>
                    </div>
                    <div className="row">
                        <div className="col s12 red-text">{this.props.repeatUserError[0]}</div>
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
    const confirmPasswordError = [];

    if(!formValues.displayName){
        error.displayName = ['Please choose a username'];
    }

    error.email = checkIfValidEmail (formValues.email, error);
    checkIfPasswordStartsWithLetter (formValues.password, passwordErrors);
    checkIfPasswordHasANum (formValues.password, passwordErrors);
    checkIfPasswordIsLongEnough (formValues.password, passwordErrors);
    checkIfPasswordsMatch (formValues.password, formValues.confirmpassword, confirmPasswordError);

    if(passwordErrors.length){
        error.password = passwordErrors;
    }

    if(confirmPasswordError.length){
        error.confirmpassword = confirmPasswordError;
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

function checkIfPasswordsMatch (password = "", confirmpassword = "", error){
    
    if(password !== confirmpassword || confirmpassword !== password){
        error.push("Passwords need to match");
    }
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
    const regex = /[\w]{6,32}/g;
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
        signUpError: state.user.signUpError,
        repeatUserError: state.user.repeatUserError
    }
}
 
export default connect (mapStateToProps, {
    userSignUp: userSignUp
})(Signup);