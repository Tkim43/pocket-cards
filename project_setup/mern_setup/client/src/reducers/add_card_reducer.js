import types from '../actions/types';

const DEFAULT_STATE = {
    back_description: '',
    front_description: '',
};

export default (state = DEFAULT_STATE,action) => {
    switch(action.type){
        case types.CREATE_CARD_DATA:
            console.log('create card reducer:', action);
            return{...state, front_description: '', back_description: ''}
        default:
            return state;
    }
}