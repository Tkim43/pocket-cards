import types from '../actions/types';

const DEFAULT_STATE = {
    back_description: '',
    front_description: '',
    all_descriptions: []
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case types.GET_ALL_CARD_DATA:
            console.log("get all card data action:", action);
            return {...state, all_descriptions: action.payload.data.card}
        case types.GET_CARD_DATA:
            return {...state, front_description: action.payload.data.card[0].frontText, back_description: action.payload.data.card[0].backText}
        case types.SEND_CARD_DATA:
            return{...state, front_description: '', back_description: ''}
        default:
            return state;
    }
}