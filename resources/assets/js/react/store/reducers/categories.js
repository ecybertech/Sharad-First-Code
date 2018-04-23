import * as actionTypes from '../actions/actionTypes';
const intialState ={
    categories:[],
    categoriesdropdown:[],
    loading:false,
    category_id:null,
    edit:false,
    category_name:'',
    main_category_name:'',
    message:''
};



const reducer = (state = intialState,action) => {

    switch(action.type){

        case actionTypes.FETCH_CATEGORIES_START:
        return {
             ...state,
             loading:true
        };  
        case actionTypes.FETCH_CATEGORIES_SUCCESS:
        return {
             ...state,
             categories:action.categories,
             loading:false
        }; 
       case actionTypes.FETCH_CATEGORIES_FAIL:
        return {
            ...state,
           loading:false
        };

         case actionTypes.FETCH_DROP_CATEGORIES_START:
        return {
             ...state,
             loading:true
        };  
        case actionTypes.FETCH_DROP_CATEGORIES_SUCCESS:
        
        return {
             ...state,
             categoriesdropdown:action.categoriesdropdown,
             loading:false
        }; 
       case actionTypes.FETCH_DROP_CATEGORIES_FAIL:
        return {
            ...state,
           loading:false
        };
        default :
        return state
        
   } 
}
export default reducer;