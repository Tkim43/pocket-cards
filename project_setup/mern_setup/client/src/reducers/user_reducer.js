import types from '../actions/types';

const DEFAULT_STATE = {
    auth: false,
    signInError: "",
    signUpError: ""
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.SIGN_IN:
        case types.SIGN_UP:
            return { auth: true };
        case types.SIGN_IN_ERROR:
            return { auth: false, signInError: action.error, signUpError: '' };
        case types.SIGN_UP_ERROR:
            return { auth: false, signUpError: action.error, signInError: '' };
        case types.SIGN_OUT:
            return { auth: false };
        default:
            return state;
    }
}