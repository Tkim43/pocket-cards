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

        console.log('Card:', card);
        console.log('Location:', location);
        dispatch({
            type: types.GET_CARD_DATA,
            card,
            location
        });
        return card.ID;
    } catch(err){
        console.log(`Error getting ${direction} card`);
    }
}

export const getCardData = (topicId, cardId) => async dispatch => {
    try {
        const { data: { card, location } } = await axios.get(`/api/topic/${topicId}/card/${cardId}`);

        console.log('Card:', card);
        console.log('Location:', location);

        dispatch({ 
            type: types.GET_CARD_DATA,
            card,location
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
            console.log("Error updating user avatar");
        }
    }
}


export function getSetsData (id){
    return async function(dispatch){
        try {
            const { data: { sets = [] } } = await axios.get(`/api/set_management/${id}`, authHeaders());

            console.log('SETS:', sets);

            dispatch({
                type: types.GET_SETS_DATA,
                sets
            });
        } catch(err){
            console.log('Error getting sets data');
            console.log(err);
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
            console.log('Error with tutorial on front end');
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
            console.log('Error with tutorial on front end');
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

export function deleteSubcategory(topicID, setID){
    return async function(dispatch){
        try{
            const resp = await axios.post(`/api/set_management/delete_subCategory_set`, {ID: topicID, setID}, authHeaders());

            return true;
        }catch{
            console.log("this is the error from subcategory delete")
        }
    }
}

export function createSubcategory(setID, subCategory){
    return async function(dispatch){
        try{
            const resp = await axios.post(`/api/set_management/create_subcategory/${setID}`, subCategory, authHeaders());
        }catch{
            console.log("error creating a subcategory");
        }
    }
}
