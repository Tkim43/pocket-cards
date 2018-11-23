import { combineReducers } from 'redux';
import exampleReducer from './example_reducer';

const rootReducer = combineReducers ({
    list: exampleReducer
});

export default rootReducer;