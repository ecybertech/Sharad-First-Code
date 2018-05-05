import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
const intialState ={
  loading:false,
  error:null,
  feedId:null,
  submit_after:false 
}
const productInventoryStart =  (state,action) =>{
    return updateObject(state,{error:null,loading:false,feedId:null,   submit_after:false, });
}
const productInventorySuccess = (state,action) =>{
    return updateObject(state,
    {
        error:null,
        loading:false,
        submit_after:true,
        feedId:action.feedId 
       
    });
}
const productInventoryFail= (state,action) =>{
    return updateObject(state,
        { 
             error:action.error,
             submit_after:false,
           
        });
}


const reducer = (state=intialState,action) =>{
       switch(action.type)
        {
            case actionType.PRODUCT_INVENTORY_START:
               return productInventoryStart(state,action);
            case actionType.PRODUCT_INVENTORY_SUCCESS:
                return   productInventorySuccess(state,action);
            case actionType.PRODUCT_INVENTORY_FAIL:
                 return productInventoryFail(state,action);   
            default:
            return state    
        }
};

export default reducer;