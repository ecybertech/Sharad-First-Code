import * as actionTypes from './actionTypes';
import axios from '../../axios-url';
//import {fetchSites}  from './index';

export const fetchProductsStart = () =>{
    return {
        type:actionTypes.FETCH_PRODUCTS_START

   }  
}
export const fetchProductsSuccess = (fetchCategories) =>{ 
    
    return {
        type:actionTypes.FETCH_PRODUCTS_SUCCESS,
        products:fetchCategories
   };
}

export const fetchProductsFail = (error) =>{ 
    return {
        type:actionTypes.FETCH_PRODUCTS_FAIL,
        error:error
 };

    
}

export const fetchProducts = (token,siteid) =>{
    return dispatch=>{
        dispatch(fetchProductsStart());
        
    axios.get('/products/siteproducts/'+siteid,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(res=>{
         
           const fetchCategories =[];
         
            for(let key in res.data)
             {
                
                fetchCategories.push({
                   ...res.data[key],
                   id:res.data[key].id,
                   product_name:res.data[key].product_name,
                   category_name:res.data[key].category_name
                });
             }
           
            dispatch(fetchProductsSuccess(fetchCategories));
           // this.setState({loading:false});
           // this.setState({orders:fetchOrders})
        }).catch(err =>{
          //  this.setState({loading:false});
          dispatch(fetchProductsFail(err));
        })
      
   }
}

export const deleteProductStart =() =>{
    return {
        type:actionTypes.DELETE_PRODUCTS_START
       };
}

export const deleteProductSuccess =() =>{
    return {
        type:actionTypes.DELETE_PRODUCT_SUCCESS
       };
}
export const deleteProductFail = (error) =>{
    return {
        type:actionTypes.DELETE_PRODUCT_FAIL,
        error:error
 };
}
export const deleteProduct = (id,token,siteid) =>{
    return dispatch=>{
      
        dispatch(deleteProductStart());
       
      axios.delete('/products/'+id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
          response => {
            dispatch(deleteProductSuccess());
            // console.log(this.props.siteid)
            dispatch(fetchProducts(token,siteid));
            
          })
      .catch(error => {
         dispatch(deleteProductFail(error));
      });
    } 
}



export const submitProductonwrapperStart = () =>{ 
    return {
        type:actionTypes.SUBMIT_PRODUCTS_ON_WRAPPERS_START
 };
}

export const submitProductonWrappersuccess = (id,siteData) =>{
   
    return {
         type:actionTypes.SUBMIT_PRODUCTS_ON_WRAPPERS_SUCCESS,
         feedId:id,
         productData:siteData 
    };
};
export const submitProductonwrapperFail = (error) =>{
    return {
        type:actionTypes.SUBMIT_PRODUCTS_ON_WRAPPERS_FAIL,
        error:error 
   };
}
export const submitProductsonwrappers = (categorydata,token) => {
    return dispatch=>{
        dispatch(submitProductonwrapperStart());
       
        axios.post('/products',categorydata,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(
            response => {
                dispatch(submitProductonWrappersuccess(response.data.id,categorydata));
            })
        .catch(error => {
         dispatch(submitProductonwrapperFail(error));
        }); 
      
   }
}