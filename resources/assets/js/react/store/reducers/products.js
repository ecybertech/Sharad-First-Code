import * as actionTypes from '../actions/actionTypes';
const intialState ={
    products:[],
    loading:false,
};



const reducer = (state = intialState,action) => {

    switch(action.type){
        
        case actionTypes.FETCH_PRODUCTS_START:
        return {
             ...state,
             loading:true
        };  
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
        return {
             ...state,
             products:action.products,
             loading:false
        }; 
       case actionTypes.FETCH_PRODUCTS_FAIL:
        return {
            ...state,
           loading:false
        };

      case actionTypes.DELETE_PRODUCTS_START:
      return{
         ...state,
         loading:true
     }
     case actionTypes.DELETE_PRODUCT_SUCCESS:
     return{
        ...state,
        loading:false
    }
    case actionTypes.DELETE_PRODUCT_FAIL:
     return{
        ...state,
        loading:true
    } 
    case actionTypes.SUBMIT_PRODUCTS_ON_WRAPPERS_START:
    return {
        ...state,
        feedId:null,
        loading:true
        
    }    
     case actionTypes.SUBMIT_PRODUCTS_ON_WRAPPERS_SUCCESS:
       const newOrder ={
           ...action.productData,
           feedId:action.feedId
           
       }  
     
     return{
            ...state,
            loading:false,
            products:state.products.concat(newOrder),
            feedId:action.feedId,
       }
     case actionTypes.SUBMIT_PRODUCTS_ON_WRAPPERS_FAIL:
      return{
          ...state,
          loading:false,
        
      }  
    default :
        return state
        
   } 
}
export default reducer;