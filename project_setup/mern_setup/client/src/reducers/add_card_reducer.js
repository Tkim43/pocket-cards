import types from '../actions/types';

const DEFAULT_STATE = {
    all: [],
    single:{}
};

export default (state = DEFAULT_STATE,action) => {
    switch(action.type){
        case types.CREATE_CARD_DATA:
            console.log('create card reducer:', action);
            return state;
        default:
            return state;
    }
}