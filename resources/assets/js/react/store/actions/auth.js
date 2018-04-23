import * as actionTypes from './actionTypes';
import axios from 'axios';
import axiosClient from '../../axios-url';
export const authStart = () =>{
     return {
          type:actionTypes.AUTH_START
     };
};

export const authSuccess = (token,userId,is_admin,site_id) =>{
   
     return {
         type:actionTypes.AUTH_SUCCESS,
         idToken:token,
         userId:userId,
         is_admin:is_admin,
         site_id:site_id
        };
};

export const authFail = (error) =>{
     return {
         type:actionTypes.AUTH_FAIL,
         error:error
     };
};
export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('site_id');
     return{
          type:actionTypes.AUTH_LOGOUT
     }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const isUserSet = (isUser) => {
    return{
        type:actionTypes.USER_CHECK,
        is_admin:isUser
   }
}

export const CheckUSers = (token,localId,is_admin,site_id) =>{
   
    return  dispatch =>{
        
        
          
            dispatch(authSuccess(token,localId,is_admin,site_id));
            //dispatch(checkAuthTimeout(expiresIn))
          
    }  
}
export const auth = (email,password,isSignUp) =>{
     return  dispatch =>{
          dispatch(authStart());
          const authData={
              email:email,
              password:password,
          };
          

        
         /*
         let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBsO3RnQcPvEOEq2Ao7_4kB9scabjPSB8o';
         if(!isSignUp) 
         {
          */
           
         //}
         //let  url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBsO3RnQcPvEOEq2Ao7_4kB9scabjPSB8o';
         let  url='/login';
         let dispatchAction=0;
         axiosClient.post(url,authData)
          .then(res=>{
         
             localStorage.setItem('token',res.data.data['token']);
             localStorage.setItem('userId',res.data.data['user_id']);
             localStorage.setItem('is_admin',res.data.data['is_admin']);
             localStorage.setItem('site_id',res.data.data['site_id']);

             dispatch(CheckUSers(res.data.data['token'],res.data.data['user_id'],res.data.data['is_admin'],res.data.data['site_id']));
            /*
              const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
               localStorage.setItem('token',res.data.idToken);
               localStorage.setItem('expirationDate',expirationDate);
               localStorage.setItem('userId',res.data.localId);
               localStorage.setItem('is_admin',1)
              let is_admin=1; 
               // is admin set or
               const queryParams = '?auth='+ res.data.idToken +'&orderBy="userId"&equalTo="'+ res.data.localId +'"'; 
             
                 axios.get('https://inmonarch-3bcc0.firebaseio.com/sites.json'+queryParams)
                .then(
                  response => {
                     
                      console.log(Object.keys(response.data).length);
                      
                      if(Object.keys(response.data).length === 1)
                         {
                             localStorage.setItem('is_admin',0)
                             is_admin=0; 
                             dispatch(CheckUSers(res.data.idToken,res.data.localId,is_admin,res.data.expiresIn));
                          }
                          else
                          {
                            dispatch(CheckUSers(res.data.idToken,res.data.localId,is_admin,res.data.expiresIn));
                          }
                       
                          
 
                    })
                .catch(error => {
                   dispatch(authFail(error.response.data.error));
                });
               

              
               
               //End
            */

             
               
          })
          .catch(err=>{
                 console.log(err);
                 dispatch(authFail(err.response.data.error));
          });
     }
}

export const authCheckstate = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            /*
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const is_admin = localStorage.getItem('is_admin');
                dispatch(authSuccess(token, userId,is_admin));
              //  dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            } */  

            const userId = localStorage.getItem('userId');
            const is_admin = localStorage.getItem('is_admin');
            const site_id = localStorage.getItem('site_id');
            dispatch(authSuccess(token, userId,is_admin,site_id));
        }
    };
};