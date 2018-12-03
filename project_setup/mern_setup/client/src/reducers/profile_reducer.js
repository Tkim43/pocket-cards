import types from '../actions/types';

const DEFAULT_STATE = {
    user: {},
    sets: [] 
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.SORT_ALPHABETICAL:
            console.log('Profile Alphabetical Reducer: ', action);
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
            return {...state, sets: alphabetical, user: action.payload.data.users[0]};
        case types.SORT_BY_LATEST:
             console.log('Sort by Latest Reducer ',action);
             const sortByLatest = action.payload.data.sets.slice().sort(function(a, b) {
                return a.created - b.created;
             });
             return {...state, sets: sortByLatest, user: action.payload.data.users[0]};
        default:
            return state;
    }
}