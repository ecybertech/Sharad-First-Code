import * as actionTypes from '../actions/actionTypes';



const intialState ={
    sites:[],
    loading:false,
    siteId:null,
    siteedit:false,
    sitename:'',
    siteurl:''
    
    
};


const reducer = (state = intialState,action) => {
    switch(action.type){

        case actionTypes.FETCH_SITE_START:
        return {
             ...state,
             loading:true
        };  
        case actionTypes.FETCH_SITE_SUCCESS:
        return {
             ...state,
             sites:action.sites,
             loading:false
        }; 
       case actionTypes.FETCH_SITE_FAIL:
        return {
            ...state,
           loading:false
        };
  
    case actionTypes.ADD_SITE_START:
    return {
        ...state,
        siteId:null,
        loading:true,
        siteedit:true
    }    
     case actionTypes.ADD_SITE_SUCCESS:
       const newOrder ={
           ...action.siteData,
           siteId:action.siteId
           
       }  
     
     return{
            ...state,
            loading:false,
            sites:state.sites.concat(newOrder),
            siteId:action.siteId,
            siteedit:false
       }
     case actionTypes.ADD_SITE_FAIL:
      return{
          ...state,
          loading:false,
          siteedit:false
      }
     case actionTypes.DELETE_SITE:
     return{
        ...state,
        loading:true
    }
    case actionTypes.DELETE_SITE_START:
     return{
        ...state,
        loading:true
    }
    case actionTypes.DELETE_SITE_SUCCESS:
    return{
       ...state,
       loading:false
   }
   case actionTypes.DELETE_SITE_FAIL:
    return{
       ...state,
       loading:true
   } 
   case actionTypes.EDIT_SITE:
   return {
        ...state,
        loading:true,
        siteedit:true
   }; 
   case actionTypes.EDIT_SITE_START:
   return {
        ...state,
        loading:true,
        siteedit:true
   };  
   case actionTypes.EDIT_SITE_FETCH_SUCCESS:
   return {
        ...state,
        sites:action.sites,
        sitename:action.sitename,
        siteurl:action.siteurl,
        loading:false,
        siteedit:true
   }; 
  case actionTypes.EDIT_SITE_FAIL:
   return {
       ...state,
      loading:false
   }; 
   case actionTypes.EDIT_SUBMIT_SITE_SUCCESS:
   return{
    ...state,
    siteId:action.siteId,
    loading:false,
    siteedit:false
   }
   case actionTypes.EDIT_SUBMIT_SITE_START:
   return {
        ...state,
        siteId:null,
        loading:true,
        siteedit:true
    } 
   case actionTypes.INPUT_CHANGED_HANDLER:
   
    return {
        ...state,
        sitename:action.sitename,
        siteurl:action.siteurl,
    }
    default:
         return state;

    }

};
export default reducer;