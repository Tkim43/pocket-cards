import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user_reducer';
import setsReducer from './sets_reducer';

const rootReducer = combineReducers ({
    user: userReducer,
    form: formReducer,
    sets:setsReducer
});

export default rootReducer;