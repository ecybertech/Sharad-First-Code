export const fetchWrapperListStart = () =>{
    return {
        type:actionTypes.FETCH_SITE_START

   }  
}
export const fetchWrapperListSuccess = (fetchSites) =>{ 
    
    return {
        type:actionTypes.FETCH_SITE_SUCCESS,
        sites:fetchSites
   };
}

export const fetchWrapperListFail = (error) =>{ 
    return {
        type:actionTypes.FETCH_SITE_FAIL,
        error:error
 };

    
}

export const fetchWrapperList = (token) =>{
    return dispatch=>{
        dispatch(fetchWrapperListStart());
     

       // axios.get('/sites.json?auth='+token)
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
            
            dispatch(fetchWrapperListSuccess(fetchSites));
           // this.setState({loading:false});
           // this.setState({orders:fetchOrders})
        }).catch(err =>{
          //  this.setState({loading:false});
          dispatch(fetchWrapperListFail(err));
        })
      
   }
}