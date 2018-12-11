import types from '../actions/types';

 const DEFAULT_STATE = {
    category: "",
    categories: [],
    sets: [] 
};
 export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_SETS_DATA:
        console.log('Sets Reducer: ', action);
        const sets = action.payload.data.sets.map(item=>item.subCategory)
        const category = action.payload.data.sets.length
                        ? action.payload.data.sets[0].category
                        : "No data available";
            return {...state,sets, category};
        case types.SORT_ALPHABETICAL:
            return {...state, categories: action.payload };
        case types.SORT_BY_LATEST:
            return {...state, categories: action.payload };  
        default:
            return state;
    }
} 