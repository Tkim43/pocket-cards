import React, {Component} from 'react';
import auth from '../hoc/auth';

class Flashcards extends Component {
    render () {
        return (
            <div>
                <h1>My Flashcards</h1>
                <p>lorem ipsum dummy datat</p>
            </div>
        );
    }
}

export default auth(Flashcards);