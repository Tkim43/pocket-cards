import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import exampleReducer from './example_reducer';
import userReducer from './user_reducer';
import profileReducer from './profile_reducer';

const rootReducer = combineReducers ({
    user: userReducer,
    profile: profileReducer,
    form: formReducer
});

export default rootReducer;