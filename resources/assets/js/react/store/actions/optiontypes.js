import * as actionTypes from './actionTypes';
import axios from '../../axios-url';
//import {fetchSites}  from './index';
export const fetchOptiontypeStart = () =>{
    return {
        type:actionTypes.FETCH_OPTION_TYPES_START

   }  
}

export const fetchOptiontypeSuccess = (fetchCategories) =>{ 
    
    return {
        type:actionTypes.FETCH_OPTION_TYPES_SUCCESS,
        optiontypes:fetchCategories
   };
}

export const fetchOptiontypeFail = (error) =>{ 
    return {
        type:actionTypes.FETCH_OPTION_TYPES_FAIL,
        error:error
 };

    
}
export const fetchOptiontypes = (token,siteid) =>{
    return dispatch=>{
        dispatch(fetchOptiontypeStart());
        
    axios.get('/optiontype/sitewiseoptiontype/'+siteid,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(res=>{
          dispatch(fetchOptiontypeSuccess(res.data));
         }).catch(err =>{
          //  this.setState({loading:false});
          dispatch(fetchOptiontypeFail(err));
        })
      
   }
}



export const deleteOptiontypeStart =() =>{
    return {
        type:actionTypes.DELETE_OPTION_TYPE_START
       };
}

export const deleteOptiontypeSuccess =() =>{
    return {
        type:actionTypes.DELETE_OPTION_TYPE_SUCCESS
       };
}
export const deleteOptiontypeFail = (error) =>{
    return {
        type:actionTypes.DELETE_OPTION_TYPE_FAIL,
        error:error
 };
}
export const deleteOptiontype = (id,token,siteid) =>{
    return dispatch=>{
      
        dispatch(deleteOptiontypeStart());
       
      axios.delete('/optiontype/'+id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
          response => {
            dispatch(deleteOptiontypeSuccess());
            // console.log(this.props.siteid)
            dispatch(fetchOptiontypes(token,siteid));
            
          })
      .catch(error => {
         dispatch(deleteOptiontypeFail(error));
      });
    } 
}

export const CreateOptiontypeStart = () =>{ 
    return {
        type:actionTypes.CREATE_OPTION_TYPE_START
 };
}

export const createOptiontypeSucces = (id,siteData) =>{
   
    return {
         type:actionTypes.ADD_OPTION_TYPE_SUCCESS,
         groupId:id,
         optionData:siteData 
    };
};

export const createOptiontypeFail = (error) =>{
    return {
        type:actionTypes.ADD_OPTION_TYPE_FAIL,
        error:error 
   };
}

export const CreateOptiontype = (categorydata,token) => {
    return dispatch=>{
        dispatch(CreateOptiontypeStart());
      
        axios.post('/optiontype',categorydata,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(
            response => {
                dispatch(createOptiontypeSucces(response.data.id,categorydata));
            })
        .catch(error => {
         dispatch(createOptiontypeFail(error));
        }); 
      
   }
}


export const editFetchOptiontypeStart =() =>{
    return {
        type:actionTypes.EDIT_FETCH_OPTION_TYPE_START,
        loading:true
       };
}

export const editOptiontypefetchSuccess =(fetchCategory,fetchBrowsenodeList) =>{
   


    return {
        type:actionTypes.EDIT_OPTION_TYPE_FETCH_SUCCESS,
        optionname:fetchCategory.optiontype_name,
        optiontype_group_id:fetchCategory.optiontype_group_id,
        price:fetchCategory.price,
        price_type:fetchCategory.price_type,
        checklist:fetchBrowsenodeList,
        loading:false

       };
}

export const editFetchOptiontypeFail = (error) =>{
    return {
        type:actionTypes.EDIT_FETCH_OPTION_TYPE_FAIL,
        error:error
 };
}

export const EditOptiontype = (Id,token) =>{
    return dispatch=>{
        dispatch(editFetchOptiontypeStart());
      
       // axios.get('/sites/'+Id+'.json?auth='+token)
       axios.get('/optiontype/'+Id,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
      .then(
        res => {
                    const fetchBrowsenodeList =[];
                    let ijk =0;
                    res.data[0].category_list.map((key) => {
                    //fetchBrowsenodeList.push(key.id);
                    fetchBrowsenodeList[key.id]=key.id;
                    });
           
             dispatch(editOptiontypefetchSuccess(res.data[0],fetchBrowsenodeList));
              // dispatch(fetchSites());
          })
      .catch(error => {
         dispatch(editFetchOptiontypeFail(error));
      });
    }
}



export const EditSubmitOptiontypeStart = () =>{ 
    return {
        type:actionTypes.EDIT_SUBMIT_OPTION_TYPE_START
 };
}

export const EditSubmitOptiontypeSucces = (id,siteData) =>{
   
    return {
         type:actionTypes.EDIT_SUBMIT_OPTION_TYPE_SUCCESS,
         optiontypeId:id,
         optionData:siteData
    };
};
export const EditSubmitOptiontypeFail = (error) =>{
    return {
        type:actionTypes.EDIT_SUBMIT_OPTION_TYPE_FAIL,
        error:error 
   };
}
export const EditSubmitOptiontype = (categorydata,token,id) => {
    return dispatch=>{
        dispatch(EditSubmitOptiontypeStart());
       
        axios.put('/optiontype/'+id,categorydata,{ 'headers': {'Accept':'application/json', 'Authorization': 'Bearer '+token } })
        .then(
            response => {
                dispatch(EditSubmitOptiontypeSucces(response.data.id,categorydata));
            })
        .catch(error => {
         dispatch(EditSubmitOptiontypeFail(error));
        }); 
      
   }
}