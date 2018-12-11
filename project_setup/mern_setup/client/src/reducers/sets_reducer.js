import types from '../actions/types';

 const DEFAULT_STATE = {
    category: "",
    categories: [],
    sets: [],
    topics: [] 
};
 export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_SETS_DATA:
            console.log('Sets Reducer: ', action);
        
            return {...state, topics: action.sets};
        case types.SORT_ALPHABETICAL:
            return {...state, categories: action.payload };
        case types.SORT_BY_LATEST:
            return {...state, categories: action.payload };  
        default:
            return state;
    }
} 