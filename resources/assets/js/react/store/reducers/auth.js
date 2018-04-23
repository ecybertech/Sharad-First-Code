import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
const intialState ={
  token:null,
  userId:null,
  error:null,
  is_admin:1,
  site_id:null,
}
const authStart =  (state,action) =>{
    return updateObject(state,{error:null});
}
const authSuccess = (state,action) =>{
    return updateObject(state,
    {
        token:action.idToken,
        userId:action.userId,
        is_admin:action.is_admin,
        site_id:action.site_id,
        error:null,
       
    });
}
const userCheck = (state,action) =>{
    return updateObject(state,
    {   is_admin:action.is_admin,
       
    });
}
const authFail= (state,action) =>{
    return updateObject(state,
        { 
             error:action.error,
           
        });
}
const authLogout = (state,action) =>{
       return updateObject(state,
        { 
            token:null,
            userId:null,
            is_admin:1,
            site_id:null
        });
}

const reducer = (state=intialState,action) =>{
 
      switch(action.type)
       {
            case actionType.AUTH_START:
               return authStart(state,action);
            case actionType.AUTH_SUCCESS:
                return   authSuccess(state,action);
            case actionType.AUTH_FAIL:
                 return authFail(state,action);   
            case actionType.AUTH_LOGOUT:
                 return authLogout(state,action);
            case actionType.USER_CHECK:
             return userCheck(state,action);      
           default:
             return state    
       }
};

export default reducer;