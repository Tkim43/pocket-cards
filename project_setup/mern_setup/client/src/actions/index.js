import axios from 'axios';
import types from './types';

const BASE_URL = '/api';

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

export function getProfileData () {
    const resp = axios.get(BASE_URL + "/userhome");
    console.log("this is the response from axios ", resp);
    return {
        type: types.GET_PROFILE_DATA,
        payload: resp
    }
}
