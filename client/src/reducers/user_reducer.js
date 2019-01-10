import types from '../actions/types';

const DEFAULT_STATE = {
    auth: false,
    info: {},
    signInError: "",
    signUpError: "",
    repeatUserError: ""
};

export default (state = DEFAULT_STATE, action) => {
    // console.log("this is the action: ",action);
    switch(action.type){
        case types.SIGN_IN:
        case types.SIGN_UP:
            return { ...DEFAULT_STATE, auth: true, info: action.user || {} };
        // case types.SEND_AVATAR:
        //     console.log('this is the action: ',action);
        //     return { ...state }
        case types.UPDATE_AVATAR:
            return { ...state, info: { ...state.info, avatar: action.avatar} };
        case types.SIGN_IN_ERROR:
            return { ...DEFAULT_STATE, signInError: action.error };
        case types.SIGN_UP_ERROR:
            return { ...DEFAULT_STATE, signUpError: action.error, repeatUserError: action.errors };
        case types.SIGN_OUT:
            return { ...DEFAULT_STATE };
        default:
            return state;
    }
}