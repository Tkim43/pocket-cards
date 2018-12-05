import types from '../actions/types';
 const DEFAULT_STATE = {
    all: []
};
 export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_SETS_DATA:
            console.log('Sets Reducer: ', action);
            return {...state, all:action.payload.data.data};
        default:
            return state;
    }
} 