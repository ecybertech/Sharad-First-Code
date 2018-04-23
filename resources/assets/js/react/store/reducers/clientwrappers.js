import * as actionTypes from '../actions/actionTypes';
const intialState ={
    clientwrappers:[],
    loading:false,
    clientwrapperId:null,
    edit:false,
    clientwrappername:'',
    message:'',
    clientwrapperedit:true,
    seller_id:null,
    mwsauth:null,
   
};
const reducer = (state = intialState,action) => {

    switch(action.type){

        case actionTypes.FETCH_CLIENT_WRAPPERS_START:
        return {
             ...state,
             loading:true,
             edit:false,
             clientwrappers:''
        };  
        case actionTypes.FETCH_CLIENT_WRAPPERS_SUCCESS:
        return {
             ...state,
             clientwrappers:action.clientwrappers,
             edit:false,
             loading:false
        }; 
       case actionTypes.FETCH_CLIENT_WRAPPERS_FAIL:
        return {
            ...state,
           loading:false,
           edit:false,
           clientwrappers:''
        };
        case actionTypes.ADD_USER_MARKETPLACE_START:
        return {
            ...state,
            edit:true,
            loading:true,
            clientwrappers:'',
            clientwrapperedit:false,
            seller_id:'',
            mwsauth:''
           
        }    
         case actionTypes.ADD_USER_MARKETPLACE_SUCCESS:
           /*
            const newOrder ={
               ...action.wrapperData,
               clientwrapperId:action.wrapperId
               
           }  
           */
         
         return{
                ...state,
                loading:false,
                edit:false,
                clientwrappers:'',
                clientwrapperedit:false,
                seller_id:null,
               mwsauth:null
           }
         case actionTypes.ADD_USER_MARKETPLACE_FAIL:
          return{
              ...state,
              loading:false,
              edit:false,
              clientwrappers:'',
              clientwrapperedit:false
              
          }
          case actionTypes.ADD_USER_MARKETPLACE_START:
          return{
              ...state,
              loading:true,
              edit:false,
              seller_id:null,
              mwsauth:null,
           }
           case actionTypes.EDIT_USER_SETTING_START:
           return{
               ...state,
               loading:true,
               edit:false,
               seller_id:null,
               mwsauth:null,
            }
            case actionTypes.EDIT_USER_SETTING_SUCCESS:
            return{
                ...state,
                loading:false,
                edit:false,
                seller_id:action.seller_id,
                mwsauth:action.mwsauth
             }
             case actionTypes.EDIT_USER_SETTING_FAIL:
            return{
                ...state,
                loading:false,
                edit:false,
                seller_id:null,
                mwsauth:null
             }
     default :
         return state
         
    } 
}
export default reducer;