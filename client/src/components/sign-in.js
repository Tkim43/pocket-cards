import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { userSignIn } from '../actions';
import { connect } from 'react-redux';


class Signin extends Component {
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

    handleSignIn = (values) => {
        this.props.userSignIn(values);
    }

    render () {
        const { handleSubmit, signInError} = this.props;

        return (
            <div className = "container">
                <h1>Sign In</h1>
                <form onSubmit = {handleSubmit(this.handleSignIn)}>
                    <div className="row">
                        <Field size = "s12" name = "email" label = "email" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <Field size = "s12" type = "password" name = "password" label = "password" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <div className="red-text text-darken-2">{signInError}</div>
                    </div>
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

function validate ({email, password}) {
    const error = {};

    if(!email) error.email = ['Please enter your email'];
    if(!password) error.password = ['Please enter your password'];

    return error;
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
 
