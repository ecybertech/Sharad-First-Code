import * as actionTypes from './actionTypes';
import axios from '../../axios-url';

export const createSiteSucces = (id,siteData) =>{
   
    return {
         type:actionTypes.ADD_SITE_SUCCESS,
         siteId:id,
         siteData:siteData 
    };
};
export const createSiteFail = (error) =>{
    return {
         type:actionTypes.ADD_SITE_FAIL,
         error:error 
    };
}
export const createSiteStart = () =>{
    return {
     type:actionTypes.ADD_SITE_START
    };
};

export const createSite = (siteData,token) =>{
    return dispatch=>{
        dispatch(createSiteStart());

        const authData={
            email:siteData.username,
            password:siteData.password,
            sitename:siteData.sitename,
            siteurl:siteData.siteurl,
            is_admin:0,
            returnSecureToken: true
        };

    /*Post users */

    //axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBsO3RnQcPvEOEq2Ao7_4kB9scabjPSB8o&auth='+token,authData)
    axios.post('/sites',authData,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
    .then(
        response => {
         // dispatch(createSiteSucces(response.data.name,siteData));
         dispatch(createSiteSucces(response.data.name,siteData));

          /*
            const  siteUserdata={
                    sitename:siteData.sitename,
                    siteurl:siteData.siteurl,
                    userId:response.data.localId       
                    }
                axios.post('/sites.json?auth='+token,siteUserdata)
            .then(
                response => {
                
                    dispatch(createSiteSucces(response.data.name,siteData));
                })
            .catch(error => {
                dispatch(createSiteFail(error));
            });
          */

        })
    .catch(error => {
     dispatch(createSiteFail(error));
    });    

   /*Emd */
     
 


      

    };
};

export const fetchSiteStart = () =>{
    return {
        type:actionTypes.FETCH_SITE_START

   }  
}
export const fetchSitesSuccess = (fetchSites) =>{ 
    
    return {
        type:actionTypes.FETCH_SITE_SUCCESS,
        sites:fetchSites
   };
}

export const fetchSitesFail = (error) =>{ 
    return {
        type:actionTypes.FETCH_SITE_FAIL,
        error:error
 };

    
}

export const fetchSites = (token) =>{
    return dispatch=>{
        dispatch(fetchSiteStart());
     

        axios.get('/sites',{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(res=>{
         
           const fetchSites =[];
           let userId;
            for(let key in res.data)
             {
               userId =res.data[key].userId;
                

                fetchSites.push({
                   ...res.data[key],
                   id:res.data[key].id,
                   userId:userId
                });
             }
            
            dispatch(fetchSitesSuccess(fetchSites));
           // this.setState({loading:false});
           // this.setState({orders:fetchOrders})
        }).catch(err =>{
          //  this.setState({loading:false});
          dispatch(fetchSitesFail(err));
        })
      
   }
}
//deleteing function of site
export const deleteSiteStart =() =>{
    return {
        type:actionTypes.DELETE_SITE_START
       };
}

export const deleteSiteSuccess =() =>{
    return {
        type:actionTypes.DELETE_SITE_SUCCESS
       };
}
export const deleteSiteFail = (error) =>{
    return {
        type:actionTypes.DELETE_SITE_FAIL,
        error:error
 };
}
export const deleteSite = (Id,token,userId) =>{
    return dispatch=>{
      
        dispatch(deleteSiteStart());
       
      axios.delete('/sites/'+Id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
          response => {
            dispatch(deleteSiteSuccess());
            dispatch(fetchSites(token));
          })
      .catch(error => {
         dispatch(deleteSiteFail(error));
      });
      /*
   const queryParams = '?auth='+token;
      axios.delete('/users/'+ userId +'/UID.json'+queryParams)
      .then(
          response => {
               dispatch(deleteSiteSuccess());
               dispatch(fetchSites(token));
          })
      .catch(error => {
         dispatch(deleteSiteFail(error));
      });
      */

    };
};
// Edit action

export const editSiteStart =() =>{
    return {
        type:actionTypes.EDIT_SITE_START,
        edit:true
       };
}
export const editSitefetchSuccess =(fetchSite) =>{
   
    return {
        type:actionTypes.EDIT_SITE_FETCH_SUCCESS,
       
        sites:fetchSite,
        sitename:fetchSite.sitename,
        siteurl:fetchSite.siteurl
       };
}

export const editSiteFail = (error) =>{
    return {
        type:actionTypes.EDIT_SITE_FAIL,
        error:error
 };
}
export const fetchEditdata = (Id,token) =>{
    return dispatch=>{
        dispatch(editSiteStart());
      
       // axios.get('/sites/'+Id+'.json?auth='+token)
       axios.get('/sites/'+Id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
        res => {
            // console.log("beforedispatch");
             //console.log(res.data);
               dispatch(editSitefetchSuccess(res.data));
              // dispatch(fetchSites());
          })
      .catch(error => {
         dispatch(editSiteFail(error));
      });
    }
}
export const editSubmitSiteStart=()=>{
    return{
        type:actionTypes.EDIT_SUBMIT_SITE_START
    }
}
export const editSubmitSiteFail=(error)=>{
    return{
        type:actionTypes.EDIT_SUBMIT_SITE_FAIL,
        error:error
    }
}
export const SubmiteditSiteSuccess=(data,id)=>{
     return{
         type:actionTypes.EDIT_SUBMIT_SITE_SUCCESS,
         siteId:id,
     }
}
export const SubmitEditdata=(siteData,token) =>{
  return dispatch =>{
       dispatch(editSubmitSiteStart())
     const  Id=siteData.id;
       
   //  axios.put('/sites/'+Id+'.json?auth='+token,siteData)
     axios.put('/sites/'+Id,siteData,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
        res => {
              dispatch(SubmiteditSiteSuccess(res.data,Id));
              dispatch(fetchSites(token));
          })
      .catch(error => {
         dispatch(editSubmitSiteFail(error));
      });
  }

}
export const inputChangedHandler=(e,controlName)=>{
     let value =e.target.value;
     let sitename='';
     let siteurl='';
     if(controlName==='siteurl')
        {siteurl =value;}
     else   
        {sitename =value;}
    return {
        type:actionTypes.INPUT_CHANGED_HANDLER,
        'siteurl': siteurl,
        'sitename': sitename,
    }
}