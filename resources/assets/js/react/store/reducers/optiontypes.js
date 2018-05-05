import * as actionTypes from '../actions/actionTypes';
const intialState ={
    optiontypes:[],
    optiontypeId:null,
    loading:false,
    edit:false,
    optionname:'',
    message:'',
    optiontypeedit:true,    
    categorychecklist:[],
    opt_group_id:0,
    price:'',
    price_type:'F'
    
};



const reducer = (state = intialState,action) => {

    switch(action.type){
       
        case actionTypes.FETCH_OPTION_TYPES_START:
        return {
             ...state,
             loading:true
        };  
        case actionTypes.FETCH_OPTION_TYPES_SUCCESS:
        return {
             ...state,
             optiontypes:action.optiontypes,
             loading:false,
             optiontypeedit:true
        }; 
       case actionTypes.FETCH_OPTION_TYPES_GROUP_FAIL:
        return {
            ...state,
           loading:false
        };

        case actionTypes.DELETE_OPTION_TYPE_START:
        return{
           ...state,
           loading:true
       }
       case actionTypes.DELETE_OPTION_TYPE_SUCCESS:
       return{
          ...state,
          loading:false
      }
      case actionTypes.DELETE_OPTION_TYPE_FAIL:
       return{
          ...state,
          loading:true
      } 
      case actionTypes.CREATE_OPTION_TYPE_START:
        return {
            ...state,
           
            loading:true,
            optiontypeedit:true
        }    
         case actionTypes.ADD_OPTION_TYPE_SUCCESS:
           const newOrder ={
               ...action.optionData,
               option_id:action.groupId
               
           }  
         
         return{
                ...state,
                loading:false,
                optiontypes:state.optiontypes.concat(newOrder),
                option_id:action.groupId,
                optiontypeedit:false
           }
         case actionTypes.ADD_OPTION_TYPE_FAIL:
          return{
              ...state,
              loading:false,
              optiontypeedit:false
          } 
         case actionTypes.EDIT_FETCH_OPTION_TYPE_START:
         return {
              ...state,
              loading:true,
              optiontypeedit:true,
              
         };  
         case actionTypes.EDIT_OPTION_TYPE_FETCH_SUCCESS:
         
         return {
              ...state,
             
             optionname: action.optionname,
             categorychecklist:action.checklist,
             opt_group_id:action.optiontype_group_id,
             price:action.price, 
             price_type:action.price_type,
             loading:false,
             optiontypeedit:true
         }; 
        case actionTypes.EDIT_FETCH_OPTION_TYPE_FAIL:
         return {
             ...state,
            loading:false
         }; 
         case actionTypes.EDIT_SUBMIT_OPTION_TYPE_FAIL:
         return {
             ...state,
            loading:false
         }; 
         case actionTypes.EDIT_SUBMIT_OPTION_TYPE_SUCCESS:
         return{
          ...state,
          optiontypeId:action.optiontypeId,
          loading:false,
          optiontypeedit:false
         }
         case actionTypes.EDIT_SUBMIT_OPTION_TYPE_START:
         return {
              ...state,
              optiontypeId:null,
              loading:true,
              optiontypeedit:true
          } 
        default :
        return state
        
   } 
}
export default reducer;