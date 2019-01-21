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
        const { data: { card, location } } = await axios.get(`/api/topic/${topicId}/card/${currentCardId}/${direction}`);
        dispatch({
            type: types.GET_CARD_DATA,
            card,
            location
        });
        
        return card.ID;
    } catch(err){
        dispatch({
            type: types.ERROR,
            error: `Error getting ${direction} card`
        });
    }
}

export const getCardData = (topicId, cardId) => async dispatch => {
    try {
        const { data: { card, location } } = await axios.get(`/api/topic/${topicId}/card/${cardId}`);
        dispatch({ 
            type: types.GET_CARD_DATA,
            card,location
        });
        return card.ID;
    } catch(err){
        dispatch({
            type: types.ERROR,
            error: `Error getting card information`
        });
    }
    
}

export function userSignOut(){

    localStorage.removeItem("token");

    return {
        type: types.SIGN_OUT
    }
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

// export function sendAvatar (avatar){
//     return async function (dispatch){
//         try {
//             console.log("This is the data from sendAvatar: ", data);
//             const { data: { user: {userAvatar} } } = await axios.post('/auth/sign-up', avatar);
//             dispatch({
//                 type: types.SEND_AVATAR,
//                 userAvatar
//             });
//         } catch(err){
//             console.log('Error sending avatar data');
//         }
//     }
// }

export function updateAvatar (updatedAvatar){
    return async function (dispatch){
        try {
            const avatarPath = { avatar: updatedAvatar };
            
            const response = await axios.patch(`/api/user/avatar`, avatarPath, authHeaders());

            dispatch({
                type: types.UPDATE_AVATAR,
                avatar: updatedAvatar
            });

        } catch(err){
            dispatch({
                type: types.ERROR,
                error: "Error updating Avatar"
            });
        }
    }
}


export function getSetsData (id){
    return async function(dispatch){
        try {
            const { data: { sets = [] } } = await axios.get(`/api/set_management/${id}`, authHeaders());

            dispatch({
                type: types.GET_SETS_DATA,
                sets
            });

        } catch(err){
            dispatch({
                type: types.ERROR,
                error: `Error getting sets data`
            });
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
            dispatch({
                type: types.ERROR,
                error: "Error getting card data"
            });
        }
    }
      
    
}

export function endTutorial(){
    return async function(dispatch){
        try{
            const { data: { success, tutorial }} = await axios.patch("/api/tutorial", true, authHeaders());

            dispatch({
                type: types.END_TUTORIAL,
                success,
                tutorial,
            });
        
        } catch(err){
            dispatch({
                type: types.ERROR,
                error: "Error completing tutorial"
            });
        }
    }
      
    
}

export function getTutorialCompleted(){
    return async function(dispatch){
        try{
            const { data: {tutorialCompleted}} = await axios.get("/api/usertutorial", authHeaders());
            console.log("tutorial completed", tutorialCompleted)
            dispatch({
                type: types.TUTORIAL_COMPLETED,
                tutorialCompleted,
            });
           
        } catch(err){
            dispatch({
                type: types.ERROR,
                error: "Error completing tutorial"
            });
        }
    }
      
    
}

export function userSignUp(newUser){
    console.log("this is new user: ", newUser);
    return async function (dispatch){
        try {
            const { data: { token, user } } = await axios.post('/auth/sign-up', newUser).catch(err => {
                throw err;
            });

            localStorage.setItem('token', token);
            
            dispatch({
                type: types.SIGN_UP,
                user
            });

        } catch (err){
            dispatch ({
                type: types.SIGN_UP_ERROR,
                errors: err.response.data.errors
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
                error: "Invalid email and/or password"
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
            dispatch({
                type: types.ERROR,
                error: "Error deleting card"
            });
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
            dispatch({
                type: types.ERROR,
                error: "Error deleting category"
            });
        }
    }
}

export function deleteSubcategory(topicID, setID){
    return async function(dispatch){
        try{
            const resp = await axios.post(`/api/set_management/delete_subCategory_set`, {ID: topicID, setID}, authHeaders());
            
            return true;
        }catch{
            dispatch({
                type: types.ERROR,
                error: "Error deleting subcategory"
            });
        }
    }
}

export function createSubcategory(setID, subCategory){
    return async function(dispatch){
        try{
            const resp = await axios.post(`/api/set_management/create_subcategory/${setID}`, subCategory, authHeaders());
           
        }catch{
            dispatch({
                type: types.ERROR,
                error: "Error creating a subcategory"
            });
        }
    }
}
