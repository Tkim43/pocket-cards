import types from '../actions/types';

 const DEFAULT_STATE = {
    category: "",
    categories: [],
    subCategory: [],
    sets: [],
    topics: [],
    card: [],
    categoryId: {},
    subCategoryId: {},
    front_description: '',
    back_description: '',
    topicsCards: [],
    topicsCardCount: 0,
    currentTopic: {},
    singleCard: {},
    location:'',
    tutorial: [],
    error: ''
};
 export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.SEND_CATEGORY_AND_SUBCATEGORY_DATA:
            return {...state, categoryId: action.payload.categoryId, subCategoryId: action.payload.subCategoryId};
        case types.SEND_CREATE_CARD_DATA:
            return {...state, front_description: action.payload.frontText, back_description: action.payload.backText};
        case types.GET_TOPICS_CARDS:
            return { ...state, topicsCards: action.cards, topicsCardCount: action.cardCount, currentTopic: action.topic, tutorial: action.tutorial };
        case types.GET_CARD_DATA:
            return { ...state, singleCard: action.card,location:action.location};
        case types.ERROR:
            return { ...state, error: action.error};
        case types.DELETE_CARD:
            return{...state}
        case types.END_TUTORIAL:
            return{...state, on: action.success}
        case types.TUTORIAL_COMPLETED:
        console.log("action", action)
            return{...state, on: action.tutorialCompleted[0].tutorial}
        case types.SEND_CARD_DATA:
            return{...state, front_description: '',back_description: ''}
        case types.GET_SETS_DATA:
            return {...state, category: action.sets.length ? action.sets[0].category : '', topics: action.sets};
        case types.SORT_ALPHABETICAL:
            return {...state, categories: action.payload };
        case types.SORT_BY_LATEST:
            return {...state, categories: action.payload };
        case types.SIGN_OUT:
            return { ...DEFAULT_STATE };
        default:
            return state;
    }
} 
