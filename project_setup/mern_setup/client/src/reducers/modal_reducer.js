import types from '../actions/types';
 const DEFAULT_STATE = {
    category:'',
    subCategory: [  ]
};
 export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
            case types.SEND_CATEGORY_AND_SUBCATEGORY_DATA:
                console.log('Category and SubCategory Reducer:', action);
                return {...state, category: '', subCategory:[]};
        default:
            return state;
    }
}