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
 parentcategory:'',
 department:'',
 amazonitemtype:'',
 amazontargetaudience:'',
 siteEdit:true,
 categoriesdropdown:false,
 category_id: null,
 clientwrappers:false,
 browsernode:[]
}





componentDidMount() {
       if(this.props.match.params.id)
         { this.props.onMountEdit(this.props.match.params.id,this.props.token);
         }
        this.props.onFatchCategories(this.props.site_id,this.props.token);
        this.props.onFetchClientwrapper(this.props.token,this.props.site_id);
    }  
    static getDerivedStateFromProps(nextProps, prevState) {
        // ...
       // console.log(nextProps.clientwrappers);
        return {
            categoriesdropdown: nextProps.categoriesdropdown,
            clientwrappers:nextProps.clientwrappers
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
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, name: evt.target.value };
        });
        
        this.setState({ shareholders: newShareholders });
      }
    onSubmit = (e) => {
        e.preventDefault()
        let formElements = e.target.elements;
       
         let  wrapper_list= []
       
        Object.keys(formElements).forEach((key) => {
            console.log(formElements[key].name);
            if (formElements[key].name == 'browsenode[]') {
              wrapper_list.push(formElements[key].value)
               }
        });
        console.log("Herer we are")
        console.log(wrapper_list);
        return false;
        
        const sitename = this.refs.sitename.input.value;
        const url = this.refs.url.input.value;
        const username = this.refs.username.input.value;
        const password = this.refs.password.input.value;

        if(!this.props.match.params.id)
          {
                const siteData={
                    sitename:sitename,
                    siteurl:url,
                    username:username,
                    password:password
                }
        
                this.props.onCreateSite(siteData,this.props.token);
          }
         else
          {
            const siteData={
                sitename:sitename,
                siteurl:url,
                username:username,
                password:password,
                id:this.props.match.params.id
            }
    
            this.props.onEditSite(siteData,this.props.token);
          }

       }
      
      
     render(){
        let redirect="";
        let Title="Create Category";
        let buttonname='Create Categroy';
        let dropdownmenu ='';
        
         if(!this.state.siteEdit)
            { 
                redirect=<Redirect to="users/category"/>;
            }

        if(this.props.match.params.id)
            { Title="Edit Category";
            buttonname="Edit Category";
           }
     
         const   categoriesList = this.state.categoriesdropdown;
         const   clientwrappers = this.state.clientwrappers; 
        // console.log(clientwrappers);
      
       


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
                <SelectValidator 
                       name="parent_category_id" 
                       value={this.state.category_id} 
                      onChange={this.handledropdownChange}
                       autoWidth={true}
                       validators={['required']}
                       errorMessages={['Category name is required']}
                    >
                    <MenuItem value={null} primaryText="Select parent" />
                    {
                        
                        categoriesList.map((site,j) => 
                         Object.keys(site).map(key => 
                             <MenuItem value={site[key].id} primaryText={site[key].category_name} />
                           )
                          ) 
                    }      
                    </SelectValidator > 
                 
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
                      //console.log(clientwrappers[j].wrappername)
                    <Aux key={j}>  
                       
                            <div key={j} >
                                {clientwrappers[j].wrappername}
                            </div>
                       
                      <div key={"Sh"+j}>
                      <TextField
                            floatingLabelText={'Browse Node'}
                            key={"tr"+j}
                            name={"browsenode["+clientwrappers[j].id+"]"}
                            
                            id={"browsenode-"+j}
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
        clientwrappers:state.clientwrappers.clientwrappers,
        
    }    
}


const mapDispatchToProps = dispatch =>{
     return {
        onFetchClientwrapper: (token,siteid)=>dispatch(actions.fetchClientwrappers(token,siteid)), 
        onFatchCategories:(siteid,token) => dispatch(actions.fecthdropCategories(siteid,token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Createcategories);
//export default Createcategories;