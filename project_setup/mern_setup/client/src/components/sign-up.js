import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';


class Signup extends Component {
    renderInput (props) {
        return (
            <div className= {`input-field col ${props.size}`}>
                <input {...props.input} type="text"/>
                <label htmlFor="">{props.label}</label>
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
                <h1>this is the signup page</h1>
                <form onSubmit = {handleSubmit(this.handleSubmitUsername)}>
                    <div className="row">
                        <Field size = "s12" name = "username" label = "username" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <Field size = "s12" name = "password" label = "password" component = {this.renderInput}/>
                    </div>
                    <div className="row">
                        <Field size = "s12" name = "email" label = "email" component = {this.renderInput}/>
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

    if(!formValues.username){
        error.username = "Please enter a valid username";
    }
    if(formValues.password && (formValues.password.length < 8 || formValues.password.length > 32)){
        error.password = "Please enter a password that is greater than 8 characters, but less than or equal to 32 characters";
    }
    if(!formValues.password){
        error.password = "Please enter a valid password";
    }
    if(!formValues.email){
        error.email = "Please enter a valid email address";
    }

    return error;
}

export default reduxForm ({
    form: 'sign-up',
    validate: validate
})(Signup);

