import * as actionTypes from './actionTypes';
import axios from '../../axios-url';
//import {fetchSites}  from './index';
export const createWrapperSucces = (id,wrapperData) =>{
   
    return {
         type:actionTypes.ADD_WRAPPERS_SUCCESS,
         wrapperId:id,
         wrapperData:wrapperData 
    };
};
export const createWrapperFail = (error) =>{
  
    return {
         type:actionTypes.ADD_WRAPPERS_FAIL,
         error:error 
    };
}
export const createWrapperStart = () =>{
    return {
     type:actionTypes.ADD_WRAPPERS_START
    };
};

export const createWrapper = (wrapperdata,token) => {
    return dispatch => {
        dispatch(createWrapperStart());
     // 'https://myfirebase.firebaseio.com/ds_api/sites/type2.json'
      axios.post('/wrappers',wrapperdata,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
          response => {
                    
              dispatch(createWrapperSucces(response.data.name,wrapperdata));
           //   dispatch(fetchWrappers(token));
          })
      .catch(error => {
         dispatch(createWrapperFail(error));
      });

    };
}

export const fetchWrapperStart = () =>{
    return {
        type:actionTypes.FETCH_WRAPPERS_START

   }  
}
export const fetchWrapperSuccess = (fetchWrappers) =>{ 
    
    return {
        type:actionTypes.FETCH_WRAPPERS_SUCCESS,
        wrappers:fetchWrappers
   };
}

export const fetchWrapperFail = (error) =>{ 
    return {
        type:actionTypes.FETCH_WRAPPERS_FAIL,
        error:error
 };

    
}

export const fetchWrappers = (token) =>{
    return dispatch=>{
        dispatch(fetchWrapperStart());
        
        const queryParams = '?auth=' + token
    //axios.get('/wrapper.json'+queryParams)
    axios.get('/wrappers',{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(res=>{
         
           const fetchWrappers =[];
          
            for(let key in res.data)
             {
                fetchWrappers.push({
                   ...res.data[key],
                   id:res.data[key].id
                });
             }
           
            dispatch(fetchWrapperSuccess(fetchWrappers));
           // this.setState({loading:false});
           // this.setState({orders:fetchOrders})
        }).catch(err =>{
          //  this.setState({loading:false});
          dispatch(fetchWrapperFail(err));
        })
      
   }
}
// Delete Wrappers

export const deleteWrapperStart =() =>{
    return {
        type:actionTypes.DELETE_WRAPPERS_START
       };
}

export const deleteWrapperSuccess =() =>{
    return {
        type:actionTypes.DELETE_WRAPPERS_SUCCESS
       };
}
export const deleteWrapperFail = (error) =>{
    return {
        type:actionTypes.DELETE_WRAPPERS_FAIL,
        error:error
 };
}
export const deleteWrapper = (Id,token) =>{
    return dispatch=>{
        dispatch(deleteWrapperStart());
      axios.delete('/wrappers/'+Id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
          response => {
               dispatch(deleteWrapperSuccess());
               dispatch(fetchWrappers(token));
          })
      .catch(error => {
         dispatch(deleteWrapperFail(error));
      });

    };
};

//Edit Wrapper Actions

export const editWrapperStart =() =>{
    return {
        type:actionTypes.EDIT_WRAPPERS_START,
        edit:true,
        wrapperId:null  
       };
}
export const editWrapperfetchSuccess =(fetchWrapper) =>{
   
    return {
        type:actionTypes.EDIT_WRAPPERS_FETCH_SUCCESS,
        wrappers:fetchWrapper,
        wrappername:fetchWrapper.data.wrapper_name,
        wrapperurl:fetchWrapper.data.wrapper_url,
        wrapperId:null  
       };
}

export const editWrapperFail = (error) =>{
    return {
        type:actionTypes.EDIT_WRAPPERS_FAIL,
        error:error
 };
}
export const fetchWrapperEditdata = (Id,token) =>{
    return dispatch=>{
        dispatch(editWrapperStart());
        
       
        axios.get('/wrappers/'+Id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
        res => {
            // console.log("beforedispatch");
            
             
               dispatch(editWrapperfetchSuccess(res.data));
              //dispatch(fetchSites());
          })
      .catch(error => {
         dispatch(editWrapperFail(error));
      });
    }
}
export const editSubmitWrapperStart=()=>{
    return{
        type:actionTypes.EDIT_SUBMIT_WRAPPERS_START
    }
}
export const editSubmitWrapperFail=(error)=>{
    return{
        type:actionTypes.EDIT_SUBMIT_WRAPPERS_FAIL,
        error:error
    }
}
export const SubmiteditWrapperSuccess=(data,id)=>{
     return{
         type:actionTypes.EDIT_SUBMIT_WRAPPERS_SUCCESS,
         siteId:id,
     }
}
export const SubmitWrapperEditdata=(siteData,token) =>{
  return dispatch =>{
       dispatch(editSubmitWrapperStart())
     const  Id=siteData.id;
   
            axios.put('/wrappers/'+Id,siteData,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
            .then(
            res => {
                    dispatch(SubmiteditWrapperSuccess(res.data,Id));
                    //dispatch(fetchWrappers(token));
                })
            .catch(error => {
            dispatch(editSubmitWrapperFail(error));
            });
      
  }

}
// Wrapper Submit with Site

export const wrapperSubmitStart = () =>{
     return {
        type:actionTypes.SUBMIT_WRAPPERS_START,
        
     }
}

export const wrapperSubmitFail = (error) =>{
    return {
       type:actionTypes.SUBMIT_WRAPPERS_FAIL,
       error:error
    }
}

export const SubmitSiteWrapperSuccess = (data) =>{
    return {
       type:actionTypes.SUBMIT_WRAPPERS_SUCCESS
      
    }
}
export const successSubmitWrapper = () =>{
    return {
         type:actionTypes.SUBMIT_WRAPPERS_RECIVE
    }
}
export const deleteOldsiteId = (key) =>{
     return dispatch=>{
            axios.delete('/sitewrapper/'+key+'.json')
      .then(
          response => {
              
          })
      .catch(error => {
       
      });
     }
} 
export const submitSiteWrappers = (wrappers,id,token) =>{
      return dispatch => {
        dispatch(wrapperSubmitStart())
      let actionId;
      let siteData={
        "site_id":id,
        "wrapper_list":Object.keys(wrappers)
       }
      
       axios.post('/sites/wrapperlist',siteData,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
       .then(
           response => {
            dispatch(SubmitSiteWrapperSuccess(response.data));
              // dispatch(createWrapperSucces(response.data.name,wrapperdata));
            //   dispatch(fetchWrappers(token));
           })
       .catch(error => {
          dispatch(createWrapperFail(error));
       });

     /*
     // Delete all data which is realated 
       const queryParams = '?auth='+token+'&orderBy="siteId"&equalTo="'+ id +'"';
        axios.get('/sitewrapper.json' + queryParams) 
       // axios.post('/sitewrapper.json',siteData)
        .then(
        res => {
                 console.log(res.data)
                  if(Object.keys(res.data).length !== 0)
                  {
                     for(let key in res.data)
                        {
                            axios.delete('/sitewrapper/'+key+'.json')
                                    .then(
                                        response => {
                                            
                                        })
                                    .catch(error => {
                                    
                                    });
                           
                        }
                  }
                   

               // dispatch(CheckSiteWrapperSuccess(res.data));
              // dispatch(successSubmitWrapper());
            })
        .catch(error => {
            //dispatch(editSubmitWrapperFail(error));
        });
       
      
     
      wrappers =   Object.keys(wrappers);
       //Object.keys(wrappers).length
    for(let i=0 ; i<wrappers.length ; i++)
       {
        actionId=wrappers[i];
        siteData={siteId:id,wrapperId:actionId}
        
        
        axios.post('/sitewrapper.json',siteData)
        .then(
        res => {
                dispatch(SubmitSiteWrapperSuccess(res.data));
               dispatch(successSubmitWrapper());
            })
        .catch(error => {
            dispatch(editSubmitWrapperFail(error));
        });
        


       }
          /*
               const siteData={siteId:siteId,wrapper:wrappers}
                
                axios.put('/sitewrapper.json',siteData)
                .then(
                res => {
                        dispatch(SubmiteditWrapperSuccess(res.data,Id));
                        dispatch(fetchWrappers());
                    })
                .catch(error => {
                    dispatch(editSubmitWrapperFail(error));
                }); 
      */
      }
}
export const CheckSiteWrapperSuccess = (data) =>{
    return {
        type:actionTypes.CHECK_SITE_WRAPPERS_RECIVE,
        checkedId:data
   }
}

export const  submitFetchSiteWrappers = (siteId,token) =>{
     return  dispatch => {
        const queryParams = '?auth='+token+'&orderBy="siteId"&equalTo="'+ siteId +'"';
        axios.get('/sites/sitewrapperlist/'+siteId,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } }) 
       // axios.post('/sitewrapper.json',siteData)
        .then(
        res => {
                // res.data;
                dispatch(CheckSiteWrapperSuccess(res.data));
              // dispatch(successSubmitWrapper());
            })
        .catch(error => {
            //dispatch(editSubmitWrapperFail(error));
        });
     }
}