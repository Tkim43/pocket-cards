import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';


class Signup extends Component {
    constructor (props) {
        super(props);

        this.state= {};
    }

    render () {
        return (
            <div>
                <h1>this is the signup page</h1>
                <form>
                    <div className="input-field">
                        <Field name = "username" component = "input"/>
                        <label>Username</label>
                    </div>
                </form>
            </div>
            
        );
    }
}

export default reduxForm ({form: 'sign-up'})(Signup);

