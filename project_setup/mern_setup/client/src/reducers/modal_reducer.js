import types from '../actions/types';
 const DEFAULT_STATE = {
    all:[],
    single: {}
};
 export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
            case types.SEND_CATEGORY_AND_SUBCATEGORY_DATA:
                console.log('Category and SubCategory Reducer:', action);
                return state;
        default:
            return state;
    }
}