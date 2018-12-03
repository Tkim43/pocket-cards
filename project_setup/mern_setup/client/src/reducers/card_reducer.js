import types from '../actions/types';

const DEFAULT_STATE = {
    back_description: '',
    front_description: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case types.GET_CARD_DATA:
            console.log("card data action", action.payload)
            return {...state, front_description: action.payload.data.data[0].frontText, back_description: action.payload.data.data[0].backText}
        case types.SEND_CARD_DATA:
            console.log("Card sending action", action)
            return{...state, front_description: '', back_description: ''}
        default:
            console.log("card data action", action)
            return state;
    }
}