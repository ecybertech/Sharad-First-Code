import * as actionTypes from './actionTypes';
import axiosClient from '../../axios-url';

export const productInventoryStart = () =>{
    return {
         type:actionTypes.PRODUCT_INVENTORY_START
    };
};
export const productInventoryFail = (error) =>{
    return {
        type:actionTypes.PRODUCT_INVENTORY_FAIL,
        error:error
    };
};
export const ProductInventorySuccess = (data) =>{
     return {
        type:actionTypes.PRODUCT_INVENTORY_SUCCESS,
        data:data
     }
}
export const ProductInventory = (productdata,token) =>{
    return  dispatch =>{
         dispatch(productInventoryStart());
      
        const productArray={
            'submitdata':productdata
        }
        axiosClient.post('products/submitxls',productArray,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
         .then(res=>{
             console.log("data submited")
             console.log(res);
            dispatch(ProductInventorySuccess(res));
         })
         .catch(err=>{
              dispatch(productInventoryFail(err.response.data.error));
         });
    }
}

