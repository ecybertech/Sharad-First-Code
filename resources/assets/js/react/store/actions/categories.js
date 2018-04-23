import * as actionTypes from './actionTypes';
import axios from '../../axios-url';
//import {fetchSites}  from './index';
export const fetchCategoryStart = () =>{
    return {
        type:actionTypes.FETCH_CATEGORIES_START

   }  
}
export const fetchCategorySuccess = (fetchCategories) =>{ 
    
    return {
        type:actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories:fetchCategories
   };
}

export const fetchCategoryFail = (error) =>{ 
    return {
        type:actionTypes.FETCH_CATEGORIES_FAIL,
        error:error
 };

    
}
export const fetchCategories = (token,siteid) =>{
    return dispatch=>{
        dispatch(fetchdropCategoryStart());
        
    axios.get('/categories/sitecategories/'+siteid,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(res=>{
         
           const fetchCategories =[];
          
            for(let key in res.data)
             {
                fetchCategories.push({
                   ...res.data[key],
                   id:res.data[key].id,
                   category_name:res.data[key].category_name,
                   main_category_name:res.data[key].main_cat_name,
                });
             }
           
            dispatch(fetchCategorySuccess(fetchCategories));
           // this.setState({loading:false});
           // this.setState({orders:fetchOrders})
        }).catch(err =>{
          //  this.setState({loading:false});
          dispatch(fetchCategoryFail(err));
        })
      
   }
}

/* Category drop down */

export const fetchdropCategoryStart = () =>{
    return {
        type:actionTypes.FETCH_DROP_CATEGORIES_START

   }  
}
export const fetchdropCategorySuccess = (fetchCategories) =>{ 
    
    return {
        type:actionTypes.FETCH_DROP_CATEGORIES_SUCCESS,
        categoriesdropdown:fetchCategories
   };
}

export const fetchdropCategoryFail = (error) =>{ 
    return {
        type:actionTypes.FETCH_DROP_CATEGORIES_FAIL,
        error:error
 };

    
}

export const fecthdropCategories = (siteid,token) =>{
    return dispatch=>{
        dispatch(fetchdropCategoryStart());
        
    axios.get('/categories/categoryList/'+siteid,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(res=>{
         
            const  fetchCategories = [];
            for(let key in res.data)
            {
             
                    fetchCategories.push({
                        ...res.data[key],
                     });
               
            }
            
           
            dispatch(fetchdropCategorySuccess(fetchCategories));
           // this.setState({loading:false});
           // this.setState({orders:fetchOrders})
        }).catch(err =>{
          //  this.setState({loading:false});
          dispatch(fetchdropCategoryFail(err));
        })
      
   }
}
