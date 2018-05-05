import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

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
class Createoptiontypegroup extends Component{
state={
    group_name:'',
    groupedit:true,
    parent_id:0,
    optiontypegroups:[]
 

}

componentDidMount() {
       if(this.props.match.params.id)
         { 
            this.props.onOptiongroupEdit(this.props.match.params.id,this.props.token);
         }
        
         this.props.onFetchClientoptiontypegroup(this.props.token,this.props.site_id);
    }  
    static getDerivedStateFromProps(nextProps, prevState) {
        // ...
       // console.log(nextProps.clientwrappers);
       
    let group_name=prevState.group_name;
    let groupedit=prevState.groupedit;
    let parent_id=prevState.parent_id;
    let optiontypegroups=prevState.optiontypegroups;
    

 
     if(nextProps.group_name!=prevState.group_name)
        { group_name=  nextProps.group_name;
        }
        if(nextProps.groupedit!=prevState.groupedit)
        { groupedit=  nextProps.groupedit;
        }
        if(nextProps.parent_id!=prevState.parent_id)
        { parent_id=  nextProps.parent_id;
        } 
        if(nextProps.optiontypegroups!=prevState.optiontypegroups)
        { optiontypegroups=  nextProps.optiontypegroups;
        }    
        
     
       return {
                group_name: group_name,
                groupedit: groupedit,
                parent_id:parent_id,
                optiontypegroups:optiontypegroups
             };
     
        
       
      }
  
   
    handleChange = (event,controlname) => {
     
       this.setState({
         [controlname]: event.target.value,
        });
      };
     
      handledropdownChange = (event, index, value) => this.setState({
        'parent_id': value
       });
    onSubmit = (e) => {
        e.preventDefault()
  
        const group_name = this.state.group_name;
        const parent_id = this.state.parent_id;
        
       
        if(!this.props.match.params.id)
          {
                const siteData={
                    group_name:group_name,
                    site_id:this.props.site_id,
                    parent_id:parent_id,
                    
                }
       
             
                this.props.onCreateOptionGroup(siteData,this.props.token);
          }
         else
          {
              
           
            const siteData={
                group_name:group_name,
                    site_id:this.props.site_id,
                    parent_id:parent_id,
            }
         
            this.props.onSubmitOptiongroupEdit(siteData,this.props.token,this.props.match.params.id); 
          }

       }
      
      
     render(){
        let redirect="";
        let Title="Create Option Group";
        let buttonname='Create Option Group';
        let dropdownmenu ='';
        
        if(!this.state.groupedit)
            { 
               // console.log(this.state.categoryedit);
               redirect=<Redirect to="/optiontypegroups"/>;
            }

        if(this.props.match.params.id)
           { 
              Title="Edit Option Group";
              buttonname="Edit Option Group";
           }
           
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
                {
                       //  console.log(this.props.optiontypegroups)
                    } 
                <SelectField 
                       name="parent_id" 
                       value={this.state.parent_id} 
                      onChange={this.handledropdownChange}
                     >
                    <MenuItem value={0} primaryText="Select Parent" />
                    {
                       this.state.optiontypegroups.map((site,j) => 
                        <MenuItem key={j} value={site.id} primaryText={site.group_name} />
                          )
                    }
                    </SelectField > 


                <TextValidator
                    floatingLabelText="Group Name"
                    onChange={(event)=>this.handleChange(event,'group_name')}
                    name="group_name"
                    ref='group_name'
                    value={this.state.group_name}
                    validators={['required']}
                    errorMessages={['Group name is required']}
                  />
                       
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
        loading:state.optiontypegroup.loading,
        group_name:state.optiontypegroup.group_name,
        site_id:state.auth.site_id,
        groupedit:state.optiontypegroup.groupedit,
        parent_id:state.optiontypegroup.parent_id,
        optiontypegroups:state.optiontypegroup.optiontypegroups,
        
    }    
}

const mapDispatchToProps = dispatch =>{
    return {
       onCreateOptionGroup:(categoryData,token) => dispatch(actions.CreateOptiongroup(categoryData,token)),
       onOptiongroupEdit:(categoryData,token) => dispatch(actions.FetchEditOptiongroup(categoryData,token)),
       onFetchClientoptiontypegroup: (token,siteid)=>dispatch(actions.fetchOptiontypegroups(token,siteid)),
       onSubmitOptiongroupEdit:(categoryData,token,opriongroupId) => dispatch(actions.EditSubmitOptiongroup(categoryData,token,opriongroupId)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Createoptiontypegroup);

//export default Createcategories;