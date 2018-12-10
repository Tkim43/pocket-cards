import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import think from './middleware/think';
import rootReducer from './reducers';
import types from './actions/types';
import { userJwtSignIn } from './actions';

import App from './components/app';

const store = createStore(rootReducer, {}, applyMiddleware(reduxPromise, think));

if(localStorage.getItem('token')){
    store.dispatch({
        type: types.SIGN_IN
    });

    userJwtSignIn(store.dispatch);
}

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

