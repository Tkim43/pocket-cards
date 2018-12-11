import axios from 'axios';
import types from './types';

function authHeaders(){
    return {
        headers: {
            authorization: localStorage.getItem('token')
        }
    }
}

export function userSignOut(){

    localStorage.removeItem("token");

    return {
        type: types.SIGN_OUT
    }
}


export function getProfileData () {
    const resp = axios.get('/api/userhome', authHeaders());

    console.log("this is the response from axios ", resp);
}

// export function sortAlphabetical () {
//     const resp = axios.get('/api/userhome', authHeaders());
    
//     return {
//         type: types.SORT_ALPHABETICAL,
//         payload: resp
//     }
// }


// export function sortByLatest () {
//     const resp = axios.get('/api/userhome', authHeaders());

//     return {
//         type: types.SORT_BY_LATEST,
//         payload: resp
//     }
// }

export async function sortAlphabetical () {
    const resp = await axios.get('/api/userhome', authHeaders());

    const alphabetical = resp.data.sets.slice().sort(function(a, b) {
        var categoryA = a.category.toLowerCase(), categoryB = b.category.toLowerCase()
        if (categoryA > categoryB){
            return 1;
        }
        else if (categoryA < categoryB){
            return -1;
        }
        else if (categoryA === categoryB){
            return 0;
        }
    });
    
    return {
        type: types.SORT_ALPHABETICAL,
        payload: alphabetical
    }
}

export async function sortByLatest () {
    const resp = await axios.get('/api/userhome', authHeaders());

    let sortByLatest = [];

    if(resp.data && resp.data.sets){
        sortByLatest = resp.data.sets.slice().sort().reverse();
    }

    return {
        type: types.SORT_BY_LATEST,
        payload: sortByLatest
    }
}


//Vienna's
export function getSetsData (id){
    const resp = axios.get(`/api/set_management/${id}`, authHeaders());
    
    return{
        type: types.GET_SETS_DATA,
        payload: resp
    }
}

export function getCardData(){
    const resp = axios.get(`/api/cards/:setID/topic/:topicID`, authHeaders());

    return{
        type: types.GET_CARD_DATA,
        payload: resp
    }
}

export function userSignUp(newUser){
    return async function (dispatch){
        try {
            const { data: { token, user } } = await axios.post('/auth/sign-up', newUser);

            localStorage.setItem('token', token);

            dispatch({
                type: types.SIGN_UP,
                user
            });

        } catch (err){
            console.log('Sign Up Error:', err.response);
            dispatch ({
                type: types.SIGN_UP_ERROR,
                // error: "email address already exists"
            });
        }
    }
}

export function userSignIn(userInfo){
    return async function (dispatch){
        try {
            const { data: { token, user } } = await axios.post("/auth/sign-in",userInfo);
    
            localStorage.setItem('token', token);
    
            dispatch({
                type: types.SIGN_IN,
                user
            });
        } catch (err){
            dispatch({
                type: types.SIGN_IN_ERROR,
                // error: "Invalid email and/or password"
            });
        }
        
    }
}

export const userJwtSignIn = async dispatch => {
    try {
        const { data: { user } } = await axios.get('/auth/sign-in', authHeaders());

        dispatch({
            type: types.SIGN_IN,
            user
        });
    } catch(err){
        dispatch({
            type: types.SIGN_IN_ERROR
        });
    }
}

export function sendCardData(updatedFrontDescription){
    const resp = axios.patch(`/api/update_cards/:userID`, updatedFrontDescription);
    
    return {
        type: types.SEND_CARD_DATA,
        payload: resp
    }
}

export function getAllCardData(){
    const resp = axios.get(`/api/cards/:setID/topic/:topicID`, authHeaders());

    return{
        type: types.GET_ALL_CARD_DATA,
        payload: resp
    }
}

//Vienna's
export function sendCategoryAndSubcategoryData(updatedCategory,updatedSubCategory){
    return async function(dispatch){
        const categoryCreationResponse = await axios.post(`/api/set_management/create_category`, updatedCategory, authHeaders());
        
        const { categoryId } = categoryCreationResponse.data;
        const subcategoryCreationResponse = await axios.post(`/api/set_management/create_subcategory/${categoryId}`, updatedSubCategory, authHeaders());
        
        // .then(categoryCreationResponse => {
        //     console.log('category and subcategory response:', categoryCreationResponse);
        //     updatedSubCategory.setID = categoryCreationResponse.data.data.insertId;
        //     return 

        // });
        return {
            type: types.SEND_CATEGORY_AND_SUBCATEGORY_DATA,
            payload: subcategoryCreationResponse
        }
    }
}

export function deleteCardData(ID){
    console.log("action param", ID)
    const resp = axios.post(`/api/set_management/delete_set`, ID);
    return{
        type: types.DELETE_CARD_DATA,
        payload: resp
    }
}

//Vienna's
export function sendCreateCardData(createCard){
    const { topicID } = createCard;

    const resp = axios.post(`/api/set_management/create_card/topics/${topicID}`,createCard, authHeaders());
    console.log("this is the response from axios for card creation", resp);
    return{
        type:types.CREATE_CARD_DATA,
        payload: resp
    }
}
