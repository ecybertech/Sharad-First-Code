import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import classes from './Category.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import HeadTitle from '../../../components/Common/Headtitle';
import SelectField from 'material-ui/SelectField';

import MenuItem from 'material-ui/MenuItem';
import { TextValidator,SelectValidator, ValidatorForm } from 'react-material-ui-form-validator';

import Aux from '../../../hoc/Aux1/Aux1';
const styles = {
    customWidth: {
      width: '90%',
    },
  };
class Createcategories extends Component{
state={
 categoryname:'',
 parentcategory:0,
 department:'',
 amazonitemtype:'',
 amazontargetaudience:'',
 categoryedit:true,
 categoriesdropdown:false,
 category_id: 0,
 clientwrappers:false,
 browse_node:[]

}





componentDidMount() {
       if(this.props.match.params.id)
         { 
            this.props.onCategoryEdit(this.props.match.params.id,this.props.token);
         }
        this.props.onFatchCategories(this.props.site_id,this.props.token);
        this.props.onFetchClientwrapper(this.props.token,this.props.site_id);
        
    }  
    static getDerivedStateFromProps(nextProps, prevState) {
        // ...
       // console.log(nextProps.clientwrappers);
       
    let catedit=prevState.categoryedit;
    let categoriys_id=prevState.category_id;
    let categoryname = prevState.categoryname;
    let department = prevState.department;
    let amazonitemtype = prevState.amazonitemtype;
    let amazontargetaudience = prevState.amazontargetaudience;
    let browse_node  = prevState.browse_node;
    

 
     if(nextProps.categoryedit!=prevState.categoryedit)
        { catedit=  nextProps.categoryedit;
        }
     
        if(nextProps.category_id!=prevState.category_id)
        { 
            //console.log("Category Iddd "+nextProps.category_id);
            categoriys_id=  nextProps.category_id;
        }
        if(nextProps.categoryname!=prevState.categoryname)
        { categoryname=  nextProps.categoryname;
        }
       

        if(nextProps.department!=prevState.department)
        { department=  nextProps.department;
        }
       
        if(nextProps.amazonitemtype!=prevState.amazonitemtype)
        { amazonitemtype=  nextProps.amazonitemtype;
        }
       
        if(nextProps.amazontargetaudience!=prevState.amazontargetaudience)
        { amazontargetaudience=  nextProps.amazontargetaudience;
        }

        if(nextProps.browse_node!=prevState.browse_node)
        { browse_node=  nextProps.browse_node;
        }
        
      
            return {
                categoriesdropdown: nextProps.categoriesdropdown,
                clientwrappers:nextProps.clientwrappers,
                categoryedit:catedit,
                category_id:categoriys_id,
                categoryname:categoryname,
                amazonitemtype:amazonitemtype,
                department:department,
                amazontargetaudience:amazontargetaudience,
                browse_node:browse_node
    
             };
     
        
       
      }
  
handledropdownChange = (event, index, value) => this.setState({
    'category_id': value
   });      
    handleChange = (event,controlname) => {
     
       this.setState({
         [controlname]: event.target.value,
        });
      };
      handleShareholderNameChange = (idx) => (evt) => {
        const browsenodes = this.state.browse_node.slice(); // Make a copy of the emails first.
        browsenodes[idx] = evt.target.value; // Update it with the modified email.
        this.setState({browse_node: browsenodes}); // Update the state.
      }
     
    onSubmit = (e) => {
        e.preventDefault()
  
        const categoryname = this.state.categoryname;
        const parent_category_id = this.state.category_id;
        const department = this.state.department;
        const amazonitemtype = this.state.amazonitemtype;
        const amazontargetaudience = this.state.amazontargetaudience;
       
       
        if(!this.props.match.params.id)
          {
                const siteData={
                    category_name:categoryname,
                    parent_id:parent_category_id,
                    department:department,
                    amazon_item_type:amazonitemtype,
                    amazon_target_audiences:amazontargetaudience,
                    site_id:this.props.site_id,
                    wrapper_list:this.state.browse_node
                }
       
             
                this.props.onCreateCategory(siteData,this.props.token);
          }
         else
          {
              
           
            const siteData={
                category_name:categoryname,
                parent_id:parent_category_id,
                department:department,
                amazon_item_type:amazonitemtype,
                amazon_target_audiences:amazontargetaudience,
                site_id:this.props.site_id,
                wrapper_list:this.state.browse_node,
                id:this.props.match.params.id
            }
         
            this.props.onSubmitCategoryEdit(siteData,this.props.token,this.props.match.params.id); 
          }

       }
      
      
     render(){
        let redirect="";
        let Title="Create Category";
        let buttonname='Create Categroy';
        let dropdownmenu ='';
        
        
         if(!this.state.categoryedit)
            { 
               // console.log(this.state.categoryedit);
                redirect=<Redirect to="/users/category"/>;
            }

        if(this.props.match.params.id)
            { Title="Edit Category";
            buttonname="Edit Category";
           }
           
     
         const   categoriesList = this.state.categoriesdropdown;
         const   clientwrappers = this.state.clientwrappers; 
         
     return (
            <div className="container">
            {redirect}   
              <HeadTitle title={Title}/> 
              <Paper className="panel">
              
              <ValidatorForm
                ref="form"
                onSubmit={this.onSubmit}
                onError={errors => console.log(errors)}
            >
                <div className="divCls">  
                       
                <TextValidator
                    floatingLabelText="Category Name"
                    onChange={(event)=>this.handleChange(event,'categoryname')}
                    name="categoryname"
                    ref='categoryname'
                    value={this.state.categoryname}
                    validators={['required']}
                    errorMessages={['Category name is required']}
                  />
                       
                </div> 
                <div className="divCls"> 
                <SelectField 
                       name="parent_category_id" 
                       value={this.state.category_id} 
                      onChange={this.handledropdownChange}
                       
                       
                    >
                    <MenuItem value={0} primaryText="Select parent" />
                    {
                        
                        categoriesList.map((site,j) => 
                         Object.keys(site).map(key => 
                             <MenuItem value={site[key].id} primaryText={site[key].category_name} />
                           )
                          ) 
                    }      
                    </SelectField > 
                 
        </div>
                <div className="divCls">
                <TextValidator
                    floatingLabelText="Department Name"
                    onChange={(event)=>this.handleChange(event,'department')}
                    name="department"
                    ref='department'
                    value={this.state.department}
                    validators={['required']}
                    errorMessages={['Department is required']}
                  />
               </div>
               <div className="divCls">
                
              <TextValidator
                    floatingLabelText="Amazon Item type"
                    onChange={(event)=>this.handleChange(event,'amazonitemtype')}
                    name="amazonitemtype"
                    ref='amazonitemtype'
                    value={this.state.amazonitemtype}
                    validators={['required']}
                    errorMessages={['Amazon Item type is required']}
                  />  
               </div>
              <div className="divCls">
                <TextValidator
                    floatingLabelText="Amazon Target audience"
                    onChange={(event)=>this.handleChange(event,'amazontargetaudience')}
                    name="amazontargetaudience"
                    ref='amazontargetaudience'
                    value={this.state.amazontargetaudience}
                    validators={['required']}
                    errorMessages={['Amazon Target audience is required']}
                  />  
               </div>
               <div className="divCls"> 
                { Object.keys(clientwrappers).map((wrappers,j) => 
                    
                  
                    <Aux key={j}>  
                       
                            <div key={j} >
                                {clientwrappers[j].wrappername}
                            </div>
                       
                      <div key={"Sh"+j}>
                      <TextField
                            floatingLabelText={'Browse Node'}
                            key={"tr"+j}
                            name={"browsenode["+clientwrappers[j].id+"]"}
                            onChange={this.handleShareholderNameChange(clientwrappers[j].id,event)}
                            id={"browsenode-"+j}
                            value={this.state.browse_node[clientwrappers[j].id]}
                            />
                      </div>  
                     </Aux>    
               )}
                </div>
               <div className="divCls"> 
                <RaisedButton type='submit' label={buttonname} primary />
               </div> 
            </ValidatorForm>
             </Paper>    
            
            
            </div>
       );
    }
    

} 
const mapStateToProps = state =>{
    
    return {
        token:state.auth.token,
        loading:state.categories.loading,
        categoriesdropdown:state.categories.categoriesdropdown,
        site_id:state.auth.site_id,
        categoryedit:state.categories.categoryedit,
        clientwrappers:state.clientwrappers.clientwrappers,
        category_id:state.categories.category_id,
        categoryname:state.categories.categoryname,
        department:state.categories.department,
        amazonitemtype:state.categories.amazonitemtype,
        amazontargetaudience:state.categories.amazontargetaudience,
        browse_node:state.categories.browse_node   
    }    
}

const mapDispatchToProps = dispatch =>{
   
     return {
        onFetchClientwrapper: (token,siteid)=>dispatch(actions.fetchClientwrappers(token,siteid)), 
        onFatchCategories:(siteid,token) => dispatch(actions.fecthdropCategories(siteid,token)),
        onCreateCategory:(categoryData,token) => dispatch(actions.CreateCategory(categoryData,token)),
        onCategoryEdit:(catgeoryId,token) => dispatch(actions.EditCategory(catgeoryId,token)),
        onSubmitCategoryEdit:(categoryData,token,catgoryId) => dispatch(actions.EditSubmitCategory(categoryData,token,catgoryId)),
        onFetchCreateCategory:(token,siteid)=>dispatch(actions.GetInitialStateCategory(token,siteid)), 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Createcategories);

//export default Createcategories;