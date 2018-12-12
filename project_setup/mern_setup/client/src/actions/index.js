import axios from 'axios';
import types from './types';
import { create } from 'domain';

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
    return async function(dispatch){
        try {
            console.log("====ID====: ", id);
            const { data: { sets } } = await axios.get(`/api/set_management/${id}`, authHeaders());

            console.log('======== Get Sets Data ==========:', sets);

            dispatch({
                type: types.GET_SETS_DATA,
                sets
            });
        } catch(err){
            console.log('Error getting set data');
        }
    }
}

export function getCardData(setId, topicId){
    return async function(dispatch){
        try{
            const{data:{card}} = await axios.get(`/api/cards/${setId}/topic/${topicId}`, authHeaders());
            dispatch({
                type: types.GET_CARD_DATA,
                payload: {card}
            })
        } catch(err){
            console.log('Error getting card data');
        }
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

//Vienna's
export function sendCategoryAndSubcategoryData(updatedCategory,updatedSubCategory){
    return async function(dispatch){
        const categoryCreationResponse = await axios.post(`/api/set_management/create_category`, updatedCategory, authHeaders());
        
        const { categoryId } = categoryCreationResponse.data;
        const subcategoryCreationResponse = await axios.post(`/api/set_management/create_subcategory/${categoryId}`, updatedSubCategory, authHeaders());

        console.log('Sub Cat Create Resp:', subcategoryCreationResponse);
        
        const { subCategoryId } = subcategoryCreationResponse.data;
        // .then(categoryCreationResponse => {
        //     console.log('category and subcategory response:', categoryCreationResponse);
        //     updatedSubCategory.setID = categoryCreationResponse.data.data.insertId;
        //     return 

        // });
        return {
            categoryId: categoryId,
            subCategoryId: subCategoryId
        };
    }
}

// export function deleteCardData(ID){
//     console.log("action param", ID)
//     const resp = axios.post(`/api/set_management/delete_set`, ID);
//     return{
//         type: types.DELETE_CARD_DATA,
//         payload: resp
//     }
// }

//Vienna's
export function sendCreateCardData(createCard){
    return async function(dispatch){
        console.log("THIS IS CREATECARD: ", createCard);
        const { subCategoryId, frontText, backText } = createCard;

        console.log('Sub Cat ID:', subCategoryId);

        // const createdCard = await axios.post(`/api/set_management/create_card/topics/${subCategoryId}`,createCard, authHeaders());


        // console.log('Created Card:', createdCard);

    // dispatch({
    //     type:types.SEND_CREATE_CARD_DATA,
    //     payload: {front_description: frontText, back_description: backText, subCategoryId: subCategoryId}
    //     });
    }
}

