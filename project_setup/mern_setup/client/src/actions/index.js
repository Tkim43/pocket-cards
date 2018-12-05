import axios from 'axios';
import types from './types';

const BASE_URL = '/api';
// const USER_ID = "?userID=2";

export function userSignOut(){

    localStorage.removeItem("token");

    return {
        type: types.SIGN_OUT
    }
}

export function sortAlphabetical () {
    // const resp = axios.get(BASE_URL + "/api/userhome/:userID");
    const resp = axios.get(`${BASE_URL}/userhome/1`);
    return {
        type: types.SORT_ALPHABETICAL,
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
    const resp = axios.get(`${BASE_URL}/cards/1`);
    return{
        type: types.GET_CARD_DATA,
        payload: resp
    }
}

export function userSignUp(user){
    return async function (dispatch){
        try {
            const resp = await axios.post("http://api.reactprototypes.com/signup",user);

            console.log("sign up response",resp);

            localStorage.setItem('token', resp.data.token);

            dispatch({
                type: types.SIGN_UP
            });

        } catch (err){
            dispatch ({
                type: types.SIGN_UP_ERROR,
                error: "email address already exists"
            });
        }
    }
}

export function userSignIn(user){
    return async function (dispatch){
        try {
            const resp = await axios.post("http://api.reactprototypes.com/signin",user);

            console.log("sign in response",resp);
    
            localStorage.setItem('token', resp.data.token);
    
            dispatch({
                type: types.SIGN_IN
            });
        } catch (err){
            dispatch({
                type: types.SIGN_IN_ERROR,
                error: "Invalid email and/or password"
            });
        }
        
    }
}
