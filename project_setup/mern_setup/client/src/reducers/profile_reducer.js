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
        default:
            return state;
    }
}