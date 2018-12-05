import types from '../actions/types';

 const DEFAULT_STATE = {
    category: "",
    sets: [] 
};
 export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_SETS_DATA:
            console.log('Sets Reducer: ', action);
            const sets = action.payload.data.data.map(item=>item.subCategory)
            return {...state,sets, category: action.payload.data.data[0].category};
        default:
            return state;
    }
} 