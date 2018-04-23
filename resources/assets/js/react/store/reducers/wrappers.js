import * as actionTypes from '../actions/actionTypes';
const intialState ={
    wrappers:[],
    loading:false,
    wrapperId:null,
    edit:false,
    wrappername:'',
    wrapperurl:'',
    message:'',
    checkList:[]
};
const reducer = (state = intialState,action) => {

    switch(action.type){

        case actionTypes.FETCH_WRAPPERS_START:
        return {
             ...state,
             loading:true
        };  
        case actionTypes.FETCH_WRAPPERS_SUCCESS:
        return {
             ...state,
             wrappers:action.wrappers,
             loading:false
        }; 
       case actionTypes.FETCH_WRAPPERS_FAIL:
        return {
            ...state,
           loading:false
        };
  
    case actionTypes.ADD_WRAPPERS_START:
    return {
        ...state,
        wrapperId:null,
        loading:true,
        edit:true
    }    
     case actionTypes.ADD_WRAPPERS_SUCCESS:
       const newOrder ={
           ...action.wrapperData,
           wrapperId:action.wrapperId
           
       }  
     
     return{
            ...state,
            loading:false,
            wrappers:state.wrappers.concat(newOrder),
            wrapperId:action.wrapperId,
            edit:false
       }
     case actionTypes.ADD_WRAPPERS_FAIL:
      return{
          ...state,
          loading:false,
          edit:false
      }
      case actionTypes.DELETE_WRAPPERS:
      return{
         ...state,
         loading:true
     }
     case actionTypes.DELETE_WRAPPERS_START:
      return{
         ...state,
         loading:true
     }
     case actionTypes.DELETE_WRAPPERS_SUCCESS:
     return{
        ...state,
        loading:false
    }
    case actionTypes.DELETE_WRAPPERS_FAIL:
     return{
        ...state,
        loading:true
    }
    case actionTypes.EDIT_WRAPPERS:
    return {
         ...state,
         loading:true,
         edit:true
    }; 
    case actionTypes.EDIT_WRAPPERS_START:
    return {
         ...state,
         loading:true,
         wrapperId:action.wrapperId,
         edit:true
    };  
    case actionTypes.EDIT_WRAPPERS_FETCH_SUCCESS:
    return {
         ...state,
         wrappers:action.wrappers,
         wrappername:action.wrappername,
         wrapperurl:action.wrapperurl,
         loading:false,
          wrapperId:null,
          edit:true
    }; 
   case actionTypes.EDIT_WRAPPERS_FAIL:
    return {
        ...state,
       loading:false
    }; 
    case actionTypes.EDIT_SUBMIT_WRAPPERS_SUCCESS:
    return{
     ...state,
     wrapperId:action.wrapperId,
     loading:false,
     edit:false
    }
    case actionTypes.EDIT_SUBMIT_WRAPPERS_START:
    return {
         ...state,
         wrapperId:null,
         loading:true,
         message:'',
         edit:true
     } 
     case actionTypes.SUBMIT_WRAPPERS_START:
     return {
          ...state,
          wrapperId:null,
          loading:true,
          message:''
      } 
     case actionTypes.SUBMIT_WRAPPERS_FAIL:
     return {
          ...state,
          wrapperId:null,
          loading:true,
          message:''
      } 
      case actionTypes.SUBMIT_WRAPPERS_SUCCESS:
      return {
           ...state,
           wrapperId:null,
           loading:false,
           message:' '
       }  
       case actionTypes.SUBMIT_WRAPPERS_RECIVE:
       return {
        ...state,
        loading:false,
        message:'Adding Wrapper in site is done.'
    }
    case actionTypes.CHECK_SITE_WRAPPERS_RECIVE:
      return{
        ...state,
        loading:false,
        message:'',
        checkList:action.checkedId
      }
     default :
         return state
         
    } 
}
export default reducer;