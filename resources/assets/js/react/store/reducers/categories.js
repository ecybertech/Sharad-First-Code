import * as actionTypes from '../actions/actionTypes';
const intialState ={
    categories:[],
    categoryId:null,
    categoriesdropdown:[],
    loading:false,
    category_id:0,
    edit:false,
    categoryname:'',
    main_category_name:'',
    department:'',
    amazonitemtype:'',
    amazontargetaudience:'',
    browse_node:[],
    message:'',
    categoryedit:true    

    
};



const reducer = (state = intialState,action) => {

    switch(action.type){
        case actionTypes.SET_INITINAL_STATE:
        return{
            categoryId:null,
            categoryname:'',
            department:'',
            amazonitemtype:'',
            amazontargetaudience:'',
            category_id:0,
            categoryedit:true,
            loading:false,
            cat_match_id:0
        }  
        case actionTypes.FETCH_CATEGORIES_START:
        return {
             ...state,
             loading:true
        };  
        case actionTypes.FETCH_CATEGORIES_SUCCESS:
        return {
             ...state,
             categories:action.categories,
             loading:false
        }; 
       case actionTypes.FETCH_CATEGORIES_FAIL:
        return {
            ...state,
           loading:false
        };

         case actionTypes.FETCH_DROP_CATEGORIES_START:
        return {
             ...state,
             loading:true
        };  
        case actionTypes.FETCH_DROP_CATEGORIES_SUCCESS:
        
        return {
             ...state,
             categoriesdropdown:action.categoriesdropdown,
             loading:false
        }; 
       case actionTypes.FETCH_DROP_CATEGORIES_FAIL:
        return {
            ...state,
           loading:false
        };
        case actionTypes.ADD_CATEGORY_START:
    return {
        ...state,
        categoryId:null,
        loading:true,
        categoryedit:true
    }    
     case actionTypes.ADD_CATEGORY_SUCCESS:
       const newOrder ={
           ...action.categoryData,
           categoryId:action.categoryId
           
       }  
     
     return{
            ...state,
            loading:false,
            categories:state.categories.concat(newOrder),
            categoryId:action.categoryId,
            categoryedit:false
       }
     case actionTypes.ADD_CATEGORY_FAIL:
      return{
          ...state,
          loading:false,
          categoryedit:false
      }  
      case actionTypes.DELETE_CATEGORY_START:
      return{
         ...state,
         loading:true
     }
     case actionTypes.DELETE_CATEGORY_SUCCESS:
     return{
        ...state,
        loading:false
    }
    case actionTypes.DELETE_CATEGORY_FAIL:
     return{
        ...state,
        loading:true
    } 
    case actionTypes.EDIT_FETCH_CATEGORY_START:
    return {
         ...state,
         loading:true,
         categoryedit:true,
         
    };  
    case actionTypes.EDIT_CATEGORY_FETCH_SUCCESS:
    
    return {
         ...state,
        
        category_id: action.category_id,
        browse_node:action.browse_node,
        categories:action.categories,
        categoryname:action.categoryname,
        department:action.department,
        amazonitemtype:action.amazonitemtype,
        amazontargetaudience:action.amazontargetaudience,
        loading:false,
        categoryedit:true
    }; 
   case actionTypes.EDIT_SITE_FAIL:
    return {
        ...state,
       loading:false
    };
    case actionTypes.EDIT_SUBMIT_CATEGORY_FAIL:
   return {
       ...state,
      loading:false
   }; 
   case actionTypes.EDIT_SUBMIT_CATEGORY_SUCCESS:
   return{
    ...state,
    categoryId:action.categoryId,
    loading:false,
    categoryedit:false
   }
   case actionTypes.EDIT_CATEGORY_SITE_START:
   return {
        ...state,
        categoryId:null,
        loading:true,
        categoryedit:true
    } 
        default :
        return state
        
   } 
}
export default reducer;