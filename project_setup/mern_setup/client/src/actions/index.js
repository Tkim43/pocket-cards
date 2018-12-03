import axios from 'axios';
import types from './types';

const BASE_URL = '/api';
// const USER_ID = "?userID=2";

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
    // const resp = axios.get(BASE_URL + "/api/userhome/:userID");
    const resp = axios.get(`${BASE_URL}/userhome/2`);
    console.log("this is the response from axios ", resp);
    return {
        type: types.GET_PROFILE_DATA,
        payload: resp
    }
}

export function getCardData(){
    const resp = axios.get(`${BASE_URL}/cards/:setID`)
    console.log("Get Data resp", resp)
    return{
        type: types.GET_CARD_DATA,
        payload: resp
    }

}