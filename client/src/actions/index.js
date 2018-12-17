import axios from 'axios';
import types from './types';

function authHeaders(){
    return {
        headers: {
            authorization: localStorage.getItem('token')
        }
    }
}

export const getNextOrPrevCard = (direction = 'next', topicId, currentCardId) => async dispatch => {
    try {
        const { data: { card } } = await axios.get(`/api/topic/${topicId}/card/${currentCardId}/${direction}`);

        dispatch({
            type: types.GET_CARD_DATA,
            card
        });
        return card.ID;
    } catch(err){
        console.log(`Error getting ${direction} card`);
    }
}

export const getCardData = (topicId, cardId) => async dispatch => {
    try {
        const { data: { card } } = await axios.get(`/api/topic/${topicId}/card/${cardId}`);

        dispatch({
            type: types.GET_CARD_DATA,
            card
        });
        return card.ID;
    } catch(err){
        console.log('Error Getting Card:', err);
    }
    
}

export function userSignOut(){

    localStorage.removeItem("token");

    return {
        type: types.SIGN_OUT
    }
}

// export function getProfileData () {
//     const resp = axios.get('/api/userhome', authHeaders());
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


export function getSetsData (id){
    return async function(dispatch){
        try {
            const { data: { sets } } = await axios.get(`/api/set_management/${id}`, authHeaders());

            dispatch({
                type: types.GET_SETS_DATA,
                sets
            });
        } catch(err){
            console.log('Error getting set data');
        }
    }
}

export function getTopicsCards(setId, topicId){
    return async function(dispatch){
        try{
            const { data: { success, ...cardsData }} = await axios.get(`/api/cards/${setId}/topic/${topicId}`, authHeaders());

            dispatch({
                type: types.GET_TOPICS_CARDS,
                ...cardsData
            });
        } catch(err){
            console.log('Error getting topic\'s cards data');
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

export function sendCardData(cardId, card){
    return async function(dispatch){
        await axios.patch(`/api/update_card/${cardId}`, card, authHeaders());

        return true;
    }
}

export function sendCategoryAndSubcategoryData(updatedCategory,updatedSubCategory){
    return async function(dispatch){
        const categoryCreationResponse = await axios.post(`/api/set_management/create_category`, updatedCategory, authHeaders());
        
        const { categoryId } = categoryCreationResponse.data;
        const subcategoryCreationResponse = await axios.post(`/api/set_management/create_subcategory/${categoryId}`, updatedSubCategory, authHeaders());
        
        const { subCategoryId } = subcategoryCreationResponse.data;
 
        return {
            categoryId: categoryId,
            subCategoryId: subCategoryId
        };
    }
}

export function deleteCard(ID, topicID){
    return async function(dispatch) {
        try{
            const resp = await axios.post(`/api/set_management/delete_card`, {ID, topicID}, authHeaders());

        }catch(err){
            console.log("this is the error from the delete");
        }
    }
}

export function sendCreateCardData(topicId, cardData){
    return async function(dispatch){
        await axios.post(`/api/set_management/create_card/topics/${topicId}`, cardData, authHeaders());
        return true;
    }
}

export function deleteCategory(cardID, userID){
    return async function(dispatch) {
        try{
            const resp = await axios.delete(`/api/set_management/ID/${cardID}/userID/${userID}`, authHeaders());
        }catch(err){
            console.log("this is the error from the category delete");
        }
    }
}

export function deleteSubCategory(){
    return async function(dispatch){
        try{
            const resp = await axios.post(`/api/set_management/delete_subCategory_set`, {ID,setID}, authHeaders());
        }catch{
            console.log("this is the error from subcategory delete")
        }
    }
}