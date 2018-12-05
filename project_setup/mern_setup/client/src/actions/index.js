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
    // const resp = axios.get(BASE_URL + "/userhome/:userID");
    const resp = axios.get(`${BASE_URL}/userhome/1`);
    console.log("this is the response from axios ", resp);
}

export function sortAlphabetical () {
    // const resp = axios.get(BASE_URL + "/api/userhome/:userID");
    const resp = axios.get(`${BASE_URL}/userhome/1`);
    return {
        type: types.SORT_ALPHABETICAL,
        payload: resp
    }
}

//Vienna's
export function getSetsData (){
    const resp = axios.get(`${BASE_URL}/set_managing/1`);
    console.log("this is the response from axios for sets:", resp);
    return{
        type: types.GET_SETS_DATA,
        payload: resp
    }
}

export function sortByLatest () {
    // const resp = axios.get(BASE_URL + "/api/userhome/:userID");
    const resp = axios.get(`${BASE_URL}/userhome/1`);
    return {
        type: types.SORT_BY_LATEST,
        payload: resp
    }
}

export function getCardData(){
    const resp = axios.get(`${BASE_URL}/cards/1/1`);
    return{
        type: types.GET_CARD_DATA,
        payload: resp
    }
}

export function sendCardData(updatedFrontDescription){
    const resp = axios.patch(`${BASE_URL}/update_cards/1`, updatedFrontDescription);
    console.log("Update Cards Sever response", resp)
    return {
        type: types.SEND_CARD_DATA,
        payload: resp
    }
}

export function getAllCardData(){
    const resp = axios.get(`${BASE_URL}/cards/1/1`);
    return{
        type: types.GET_ALL_CARD_DATA,
        payload: resp
    }
}