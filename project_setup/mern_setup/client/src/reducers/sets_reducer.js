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
    currentTopic: {}
};
 export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.SEND_CATEGORY_AND_SUBCATEGORY_DATA:
            // console.log('Category and SubCategory Reducer:', action);
            return {...state, categoryId: action.payload.categoryId, subCategoryId: action.payload.subCategoryId};
        case types.SEND_CREATE_CARD_DATA:
            console.log('create card reducer:', action);
            debugger;
            return {...state, front_description: action.payload.frontText, back_description: action.payload.backText};
        case types.GET_TOPICS_CARDS:
            console.log('Action:', action);
            return { ...state, topicsCards: action.cards, topicsCardCount: action.cardCount, currentTopic: action.topic };
        case types.GET_CARD_DATA:
            console.log("get_card_data", action.payload.card);
            return {...state, card:action.payload.card, front_description: action.payload.card[0].frontText, back_description: action.payload.card[0].backText}
        case types.SEND_CARD_DATA:
            return{...state, front_description: '',back_description: ''}
        case types.GET_SETS_DATA:
            console.log('Sets Reducer: ', action);
            return {...state, category: action.sets[0].category, topics: action.sets};
        case types.SORT_ALPHABETICAL:
            return {...state, categories: action.payload };
        case types.SORT_BY_LATEST:
            return {...state, categories: action.payload };
        default:
            return state;
    }
} 
