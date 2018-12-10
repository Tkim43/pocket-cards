import types from '../actions/types';

const DEFAULT_STATE = {
    user: {},
    sets: [] 
};

export default (state = DEFAULT_STATE, action) => {
    console.log("Action in reducer: ", action);
    switch(action.type){
        case types.SORT_ALPHABETICAL:
            const alphabetical = action.payload.data.sets.slice().sort(function(a, b) {
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
            return {...state, sets: alphabetical };
        case types.SORT_BY_LATEST:
            console.log("this is the action", action);
            let sortByLatest = [];

            if(action.payload.data && action.payload.data.sets){
                sortByLatest = action.payload.data.sets.slice().sort().reverse();
            }
            
            console.log("sorted list:",sortByLatest)
            return {...state, sets: sortByLatest };     
        default:
            return state;
    }
}