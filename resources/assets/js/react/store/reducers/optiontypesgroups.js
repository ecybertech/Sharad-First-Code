import * as actionTypes from '../actions/actionTypes';
const intialState ={
    optiontypegroups:[],
    groupId:null,
    loading:false,
    edit:false,
    group_name:'',
    message:'',
    groupedit:true,
    parent_id:0    

    
};



const reducer = (state = intialState,action) => {

    switch(action.type){
       
        case actionTypes.FETCH_OPTION_TYPES_GROUP_START:
        return {
             ...state,
             loading:true
        };  
        case actionTypes.FETCH_OPTION_TYPES_GROUP_SUCCESS:
        return {
             ...state,
             optiontypegroups:action.optiontypegroups,
             loading:false
        }; 
       case actionTypes.FETCH_OPTION_TYPES_GROUP_FAIL:
        return {
            ...state,
           loading:false
        };
      
case actionTypes.CREATE_OPTION_GROUP_START:
        return {
            ...state,
           
            loading:true,
            groupedit:true
        }    
         case actionTypes.ADD_OPTION_GROUP_SUCCESS:
           const newOrder ={
               ...action.optionData,
               group_id:action.groupId
               
           }  
         
         return{
                ...state,
                loading:false,
                optiontypegroups:state.optiontypegroups.concat(newOrder),
                group_id:action.groupId,
                groupedit:false
           }
         case actionTypes.ADD_OPTION_GROUP_FAIL:
          return{
              ...state,
              loading:false,
              groupedit:false
          }  
          case actionTypes.DELETE_OPTION_GROUP_START:
          return{
             ...state,
             loading:true
         }
         case actionTypes.DELETE_OPTION_GROUP_SUCCESS:
         return{
            ...state,
            loading:false
        }
        case actionTypes.DELETE_OPTION_GROUP_FAIL:
         return{
            ...state,
            loading:true
        } 
        


        case actionTypes.EDIT_FETCH_OPTION_GROUP_START:
        return {
             ...state,
             loading:true,
             groupedit:true,
             
        };  
        case actionTypes.EDIT_FETCH_OPTION_GROUP_SUCCESS:
        
        return {
             ...state,
            
             loading:false,
             group_name: action.group_name,
             parent_id: action.parent_id,
             groupedit:true
        }; 
       case actionTypes.EDIT_FETCH_OPTION_GROUP_FAIL:
        return {
            ...state,
           loading:false
        };
        case actionTypes.EDIT_SUBMIT_OPTION_GROUP_FAIL:
        return {
            ...state,
           loading:false
        }; 
        case actionTypes.EDIT_SUBMIT_OPTION_GROUP_SUCCESS:
        return{
         ...state,
         optiontypeid:action.optiontypeid,
         loading:false,
         groupedit:false
        }
        case actionTypes.EDIT_SUBMIT_OPTION_GROUP_START:
        return {
             ...state,
             optiontypeid:null,
             loading:true,
             groupedit:true
         } 
       default :
        return state
        
   } 
}
export default reducer;