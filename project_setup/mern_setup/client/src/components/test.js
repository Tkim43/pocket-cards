import React, {Component} from 'react';
import axios from 'axios';

class Test extends Component {
    async componentDidMount () {
        const resp = await axios.get('/api/test');

        console.log('Server response: ', resp);

        const user = await axios.get('/api/user');

        console.log('user response: ', user);
    }
    render () {
        return <h1>This is the Test component</h1>;
    }
}

export default Test;