import types from '../actions/types';

const DEFAULT_STATE = {
    back_description: '',
    front_description: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case types.type.GET_CARD_DATA:
            console.log("card data action", action)
            return {...state}
        default:
            return state;
    }
}