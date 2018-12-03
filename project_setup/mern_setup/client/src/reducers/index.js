import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user_reducer';
import profileReducer from './profile_reducer';
import cardReducer from './card_reducer';

const rootReducer = combineReducers ({
    user: userReducer,
    profile: profileReducer,
    form: formReducer,
    card: cardReducer
});

export default rootReducer;