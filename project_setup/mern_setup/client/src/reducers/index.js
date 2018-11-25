import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import exampleReducer from './example_reducer';

const rootReducer = combineReducers ({
    list: exampleReducer,
    form: formReducer
});

export default rootReducer;