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

export const CreateCategoryStart = () =>{ 
    return {
        type:actionTypes.CREATE_CATEGORY_START
 };
}

export const createCategorySucces = (id,siteData) =>{
   
    return {
         type:actionTypes.ADD_CATEGORY_SUCCESS,
         categoryId:id,
         categoryData:siteData 
    };
};
export const createCategoryFail = (error) =>{
    return {
        type:actionTypes.ADD_CATEGORY_FAIL,
        error:error 
   };
}
export const CreateCategory = (categorydata,token) => {
    return dispatch=>{
        dispatch(CreateCategoryStart());
       
        axios.post('/categories',categorydata,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(
            response => {
                dispatch(createCategorySucces(response.data.id,categorydata));
            })
        .catch(error => {
         dispatch(createCategoryFail(error));
        }); 
      
   }
}
export const deleteCategoryStart =() =>{
    return {
        type:actionTypes.DELETE_CATEGORY_START
       };
}

export const deleteCategorySuccess =() =>{
    return {
        type:actionTypes.DELETE_CATEGORY_SUCCESS
       };
}
export const deleteCategoryFail = (error) =>{
    return {
        type:actionTypes.DELETE_CATEGORY_FAIL,
        error:error
 };
}
export const deleteCategroy = (id,token,siteid) =>{
    return dispatch=>{
      
        dispatch(deleteCategoryStart());
       
      axios.delete('/categories/'+id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
          response => {
            dispatch(deleteCategorySuccess());
            // console.log(this.props.siteid)
            dispatch(fetchCategories(token,siteid));
            
          })
      .catch(error => {
         dispatch(deleteCategoryFail(error));
      });
    } 
}

export const editFetchCategoryStart =() =>{
    return {
        type:actionTypes.EDIT_FETCH_CATEGORY_START,
        loading:true
       };
}

export const editCategoryfetchSuccess =(fetchCategory,fetchBrowsenodeList) =>{
   


    return {
        type:actionTypes.EDIT_CATEGORY_FETCH_SUCCESS,
       
        categories:fetchCategory,
        categoryname:fetchCategory.category_name,
        department:fetchCategory.department,
        amazonitemtype:fetchCategory.amazonitemtype,
        amazontargetaudience:fetchCategory.amazontargetaudience,
        category_id: fetchCategory.parent_id,
        browse_node:fetchBrowsenodeList,
        loading:false

       };
}

export const editFetchCategoryFail = (error) =>{
    return {
        type:actionTypes.EDIT_FETCH_CATEGORY_FAIL,
        error:error
 };
}

export const EditCategory = (Id,token) =>{
    return dispatch=>{
        dispatch(editFetchCategoryStart());
      
       // axios.get('/sites/'+Id+'.json?auth='+token)
       axios.get('/categories/'+Id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
        res => {
              const fetchBrowsenodeList =[];
              let ijk =0;
              res.data[0].wrapper_list[res.data[0].id].map((key) => {
               fetchBrowsenodeList[key.wrapper_id] = key.browse_node;
              });
             dispatch(editCategoryfetchSuccess(res.data[0],fetchBrowsenodeList));
              // dispatch(fetchSites());
          })
      .catch(error => {
         dispatch(editFetchCategoryFail(error));
      });
    }
}

export const EditSubmitCategoryStart = () =>{ 
    return {
        type:actionTypes.EDIT_SUBMIT_CATEGORY_START
 };
}

export const EditSubmitCategorySucces = (id,siteData) =>{
   
    return {
         type:actionTypes.EDIT_SUBMIT_CATEGORY_SUCCESS,
         categoryId:id,
         categoryData:siteData 
    };
};
export const EditSubmitCategoryFail = (error) =>{
    return {
        type:actionTypes.EDIT_SUBMIT_CATEGORY_FAIL,
        error:error 
   };
}
export const EditSubmitCategory = (categorydata,token,id) => {
    return dispatch=>{
        dispatch(EditSubmitCategoryStart());
       
        axios.put('/categories/'+id,categorydata,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(
            response => {
                dispatch(EditSubmitCategorySucces(response.data.id,categorydata));
            })
        .catch(error => {
         dispatch(EditSubmitCategoryFail(error));
        }); 
      
   }
}

export const SetIntialState=()=>{
    return {
        type:actionTypes.SET_INITINAL_STATE,
   };
}
export const GetInitialStateCategory = (token,siteid) => { 
    return dispatch=>{
        
        dispatch(SetIntialState());
   }
}