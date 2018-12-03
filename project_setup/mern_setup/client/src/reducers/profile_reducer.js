import types from '../actions/types';

const DEFAULT_STATE = {
    user: {},
    sets: [] 
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_PROFILE_DATA:
            console.log('Profile Reducer: ', action);
            return {...state, sets: action.payload.data.sets, user: action.payload.data.users[0]};
        case types.SORT_ALPHABETICAL:
            console.log('Profile Alphabetical Reducer: ', action);
            const alphabetical = action.payload.data.sets.slice().sort(function(a, b) {
                if (a.category > b.category){
                    return 1;
                }
                else if (a.category < b.category){
                    return -1;
                }
                else if (a.category === b.category){
                    return 0;
                }
             });
             return {...state, sets: alphabetical, user: action.payload.data.users[0]};
        default:
            return state;
    }
}