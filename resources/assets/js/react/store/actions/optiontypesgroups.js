import * as actionTypes from './actionTypes';
import axios from '../../axios-url';
//import {fetchSites}  from './index';
export const fetchOptiontypegroupStart = () =>{
    return {
        type:actionTypes.FETCH_OPTION_TYPES_GROUP_START

   }  
}


export const fetchOptiontypegroupSuccess = (fetchCategories) =>{ 
    
    return {
        type:actionTypes.FETCH_OPTION_TYPES_GROUP_SUCCESS,
        optiontypegroups:fetchCategories
   };
}

export const fetchOptiontypegroupFail = (error) =>{ 
    return {
        type:actionTypes.FETCH_OPTION_TYPES_GROUP_FAIL,
        error:error
 };

    
}


export const fetchOptiontypegroups = (token,siteid) =>{
    return dispatch=>{
        dispatch(fetchOptiontypegroupStart());
        
    axios.get('/optiontypegroup/sitewisegrouptype/'+siteid,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(res=>{
         
           
           
            dispatch(fetchOptiontypegroupSuccess(res.data.data));
           // this.setState({loading:false});
           // this.setState({orders:fetchOrders})
        }).catch(err =>{
          //  this.setState({loading:false});
          dispatch(fetchOptiontypegroupFail(err));
        })
      
   }
}

export const CreateOptiongroupStart = () =>{ 
    return {
        type:actionTypes.CREATE_OPTION_GROUP_START
 };
}

export const createOptionGroupSucces = (id,siteData) =>{
   
    return {
         type:actionTypes.ADD_OPTION_GROUP_SUCCESS,
         groupId:id,
         optionData:siteData 
    };
};

export const createOptiongroupFail = (error) =>{
    return {
        type:actionTypes.ADD_OPTION_GROUP_FAIL,
        error:error 
   };
}


export const CreateOptiongroup = (categorydata,token) => {
    return dispatch=>{
        dispatch(CreateOptiongroupStart());
       
        axios.post('/optiontypegroup',categorydata,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(
            response => {
                dispatch(createOptionGroupSucces(response.data.id,categorydata));
            })
        .catch(error => {
         dispatch(createOptiongroupFail(error));
        }); 
      
   }
}


export const deleteOptiongroupStart =() =>{
    return {
        type:actionTypes.DELETE_OPTION_GROUP_START
       };
}

export const deleteOptiongroupSuccess =() =>{
    return {
        type:actionTypes.DELETE_OPTION_GROUP_SUCCESS
       };
}
export const deleteOptiongroupFail = (error) =>{
    return {
        type:actionTypes.DELETE_OPTION_GROUP_FAIL,
        error:error
 };
}
export const deleteOptiongroup = (id,token,siteid) =>{
    return dispatch=>{
      
        dispatch(deleteOptiongroupStart());
       
      axios.delete('/optiontypegroup/'+id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
          response => {
            dispatch(deleteOptiongroupSuccess());
            // console.log(this.props.siteid)
            dispatch(fetchOptiontypegroups(token,siteid));
            
          })
      .catch(error => {
         dispatch(deleteOptiongroupFail(error));
      });
    } 
}

export const editFetchOptiongroupStart =() =>{
    return {
        type:actionTypes.EDIT_FETCH_OPTION_GROUP_START,
        loading:true
       };
}

export const editfetchOptiongroupSuccess =(fetchCategory) =>{
   


    return {
        type:actionTypes.EDIT_FETCH_OPTION_GROUP_SUCCESS,
       
        optiontypegroups:fetchCategory,
        group_name:fetchCategory.group_name,
        parent_id:fetchCategory.parent_id,
        loading:false

       };
}

export const editFetchOptiongroupFail = (error) =>{
    return {
        type:actionTypes.EDIT_FETCH_OPTION_GROUP_FAIL,
        error:error
 };
}

export const FetchEditOptiongroup = (Id,token) =>{
    return dispatch=>{
        dispatch(editFetchOptiongroupStart());
      
       // axios.get('/sites/'+Id+'.json?auth='+token)
       axios.get('/optiontypegroup/'+Id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
        res => {
              
             dispatch(editfetchOptiongroupSuccess(res.data));
              // dispatch(fetchSites());
          })
      .catch(error => {
         dispatch(editFetchOptiongroupFail(error));
      });
    }
}

export const EditSubmitOptiongroupStart = () =>{ 
    return {
        type:actionTypes.EDIT_SUBMIT_OPTION_GROUP_START
 };
}

export const EditSubmitOptiongroupSucces = (id,siteData) =>{
   
    return {
         type:actionTypes.EDIT_SUBMIT_OPTION_GROUP_SUCCESS,
         optiontypeid:id,
         optiongroupData:siteData 
    };
};
export const EditSubmitOptiongroupFail = (error) =>{
    return {
        type:actionTypes.EDIT_SUBMIT_OPTION_GROUP_FAIL,
        error:error 
   };
}
export const EditSubmitOptiongroup = (categorydata,token,id) => {
    return dispatch=>{
        dispatch(EditSubmitOptiongroupStart());
       
        axios.put('/optiontypegroup/'+id,categorydata,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(
            response => {
                dispatch(EditSubmitOptiongroupSucces(response.data.id,categorydata));
            })
        .catch(error => {
         dispatch(EditSubmitOptiongroupFail(error));
        }); 
      
   }
}