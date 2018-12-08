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
export function getSetsData (id){
    const resp = axios.get(`${BASE_URL}/set_management/1/${id}`);
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
                // error: "email address already exists"
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
                // error: "Invalid email and/or password"
            });
        }
        
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

//Vienna's
export function sendCategoryAndSubcategoryData(updatedCategory,updatedSubCategory){
    const subcategoryCreationResponse= axios.post(`${BASE_URL}/set_management/create_category`, updatedCategory ).then(categoryCreationResponse => {
        console.log('category and subcategory response:', categoryCreationResponse);
        updatedSubCategory.setID = categoryCreationResponse.data.data.insertId;
        return axios.post(`${BASE_URL}/set_management/create_subcategory`,updatedSubCategory )

    });
    return{
        type:types.SEND_CATEGORY_AND_SUBCATEGORY_DATA,
        payload:subcategoryCreationResponse
    }
}

export function deleteCardData(ID){
    console.log("action param", ID)
    const resp = axios.post(`${BASE_URL}/set_management/delete_card`, ID);
    return{
        type: types.DELETE_CARD_DATA,
        payload: resp
    }
}

//Vienna's
export function sendCreateCardData(createCard){
    const resp = axios.post(`${BASE_URL}/set_management/create_card`,createCard);
    console.log("this is the response from axios for card creation", resp);
    return{
        type:types.CREATE_CARD_DATA,
        payload: resp
    }
}
