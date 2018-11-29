import axios from 'axios';
import types from './types';

export function userSignIn(){
    console.log("user sign in called");
    return {
        type: types.SIGN_IN
    }
}

export function userSignOut(){
    return {
        type: types.SIGN_OUT
    }
}

export function userSignUp(){
    return {
        type: types.SIGN_UP
    }
}
