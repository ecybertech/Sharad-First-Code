import * as actionTypes from './actionTypes';
import axios from '../../axios-url';


export const createUsertmarketplaceSucces = (id,wrapperData) =>{
   
    return {
         type:actionTypes.ADD_USER_MARKETPLACE_SUCCESS,
         
    };
};
export const createUsermarketplaceFail = (error) =>{
  
    return {
         type:actionTypes.ADD_USER_MARKETPLACE_FAIL,
         error:error 
    };
}
export const createUsermarketplaceStart = () =>{
    return {
     type:actionTypes.ADD_USER_MARKETPLACE_START
    };
};

export const createUsermarketplace = (wrapperdata,token) => {
    return dispatch => {
        dispatch(createUsermarketplaceStart());
     // 'https://myfirebase.firebaseio.com/ds_api/sites/type2.json'

  
      axios.post('/sites/updatemarketplace',wrapperdata,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
          response => {
                   
             dispatch(createUsertmarketplaceSucces(response.data,wrapperdata));
           // dispatch(fetchClientwrappers(token,wrapperdata.site_id));
          })
      .catch(error => {
         dispatch(createUsermarketplaceFail(error));
      });

    };
}


/*User settings of sites  */


export const fetchClietnwrapperStart = () =>{
    return {
        type:actionTypes.FETCH_CLIENT_WRAPPERS_START

   }  
}
export const fetchClientwrapperSuccess = (fetchClientwrappers) =>{ 
    
    return {
        type:actionTypes.FETCH_CLIENT_WRAPPERS_SUCCESS,
        clientwrappers:fetchClientwrappers,
        
   };
}

export const fetchClientwrapperFail = (error) =>{ 
    return {
        type:actionTypes.FETCH_CLIENT_WRAPPERS_FAIL,
        error:error
 };

    
}

export const fetchClientwrappers = (token,siteid) =>{
    return dispatch=>{
        dispatch(fetchClietnwrapperStart());
      
       // axios.get('/sites/'+Id+'.json?auth='+token)
       axios.get('/sites/sitewrappers/'+siteid,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
        res => {
           
             //console.log(res.data);
           

               dispatch(fetchClientwrapperSuccess(res.data));
              // dispatch(fetchSites());
          })
      .catch(error => {
         dispatch(fetchClientwrapperFail(error));
      });
    }
}
/* user setting table data */


export const editUsersettingStart =() =>{
    return {
        type:actionTypes.EDIT_USER_SETTING_START,
        edit:true
       };
}
export const editUsersettingfetchSuccess =(fetchSite) =>{
    
    return {
        type:actionTypes.EDIT_USER_SETTING_SUCCESS,
        seller_id:fetchSite.seller_id,
        mwsauth:fetchSite.mws_authorize_token
       };
}

export const editUsersettingFail = (error) =>{
    return {
        type:actionTypes.EDIT_USER_SETTING_FAIL,
        error:error
 };
}


export const fetchUsersettingdata = (siteid,token) =>{
    return dispatch=>{
        dispatch(editUsersettingStart());
      
       // axios.get('/sites/'+Id+'.json?auth='+token)
       axios.get('/sites/updatesite/'+siteid,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
        res => {
            // console.log("beforedispatch");
             //console.log(res.data);
               dispatch(editUsersettingfetchSuccess(res.data.data));
              // dispatch(fetchSites());
          })
      .catch(error => {
         dispatch(editUsersettingFail(error));
      });
    }
}
/*end */