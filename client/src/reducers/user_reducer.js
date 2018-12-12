import types from '../actions/types';

const DEFAULT_STATE = {
    auth: false,
    info: {},
    signInError: "",
    signUpError: ""
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.SIGN_IN:
        case types.SIGN_UP:
            return { ...DEFAULT_STATE, auth: true, info: action.user || {} };
        case types.SIGN_IN_ERROR:
            return { ...DEFAULT_STATE, signInError: action.error };
        case types.SIGN_UP_ERROR:
            return { ...DEFAULT_STATE, signUpError: action.error };
        case types.SIGN_OUT:
            return { ...DEFAULT_STATE };
        default:
            return state;
    }
}