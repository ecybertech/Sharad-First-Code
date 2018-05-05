import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import classes from './Optiontypes.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import HeadTitle from '../../../components/Common/Headtitle';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';

import MenuItem from 'material-ui/MenuItem';
import { TextValidator,SelectValidator, ValidatorForm } from 'react-material-ui-form-validator';

import Aux from '../../../hoc/Aux1/Aux1';
const styles = {
    customWidth: {
      width: '90%',
    },
  };
class Createoptiontypes extends Component{
state={
    optionname:'',
    group_id:0,
    optiontypeedit:true,
    groupdropdown:false,
    optiontype_id: 0,
    categorychecklist:[],
    categoriesdropdown:false,
    optiontype_cats:[],
    opt_group_id:0,
    price_type:'F',
    price:'',
   
}

static getDerivedStateFromProps(nextProps, prevState) {
    let optionname  = prevState.optionname;
    let categorychecklist  = prevState.categorychecklist;
    let optiontypeedit= prevState.optiontypeedit;
    let opt_group_id= prevState.opt_group_id;
    let price_type= prevState.price_type;
    let price= prevState.price;
    
    if(nextProps.optionname!=prevState.optionname)
    { optionname=  nextProps.optionname;
    }
    if(nextProps.categorychecklist!=prevState.categorychecklist)
    { categorychecklist=  nextProps.categorychecklist;
    }
    if(nextProps.optiontypeedit!=prevState.optiontypeedit)
      {
        optiontypeedit =  nextProps.optiontypeedit;
      }
   if(nextProps.opt_group_id!=prevState.opt_group_id)
     { opt_group_id=nextProps.opt_group_id;}

     if(nextProps.price_type!=prevState.price_type)
     { price_type=nextProps.price_type;}

     if(nextProps.price!=prevState.price)
     { price=nextProps.price;}

    return{
        categoriesdropdown: nextProps.categoriesdropdown,
        optionname:optionname,
        optiontypegroups:nextProps.optiontypegroups,
        categorychecklist:categorychecklist,
        optiontypeedit:optiontypeedit,
        opt_group_id:opt_group_id,
        price_type:price_type,
        price:price
     }
}
handleCheckbox(event, isChecked) {
    //console.log(isChecked, event.target.value);
 const categorychecklist = [...this.state.categorychecklist];

  
    if(isChecked)
    categorychecklist.push(event.target.value);
    else
      {
        let index;
        for(let i=0;i<=categorychecklist.length;i++)
        {
           if(categorychecklist[i]===event.target.value)
             {  index= i; break; }
        }
        categorychecklist.splice(index, 1);
      }
     
      this.setState({categorychecklist});
     // console.log(this.state.categorychecklist)
   // this.setState({categorychecklist: categorychecklist1}); 
  }
  handleShareholderNameChange = (idx) => (evt) => {
   
    
    const categorychecklist = this.state.categorychecklist.slice(); // Make a copy of the emails first.
    if(evt.target.checked)
    {
     categorychecklist[idx] = idx; // Update it with the modified email.
   
    }
    else
    {
       //categorychecklist.splice(evt.target.value, 1);
       delete categorychecklist[evt.target.value] 
    }
    
    this.setState({categorychecklist: categorychecklist}); // Update the state.
  }
componentDidMount() {
       if(this.props.match.params.id)
         { 
            this.props.onOptiontypeEdit(this.props.match.params.id,this.props.token);
         }
        this.props.onFatchCategories(this.props.site_id,this.props.token);
        this.props.onFetchClientoptiongroup(this.props.token,this.props.site_id);
        
    }  
handledropdownChange = (event, index, value) => this.setState({
    'opt_group_id': value
   });
 handlepricedropdownChange = (event, index, value) => this.setState({
  'price_type': value
 });       
handleChange = (event,controlname) => {
     
       this.setState({
         [controlname]: event.target.value,
        });
      };
    
     
onSubmit = (e) => {
        e.preventDefault()
  
        const optiontype_group_id = this.state.opt_group_id;
        const optiontype_name = this.state.optionname;
        const category_list = this.state.categorychecklist;
        const price = this.state.price;
        const price_type = this.state.price_type;
       
       
       
        if(!this.props.match.params.id)
          {
                const siteData={
                    optiontype_group_id:optiontype_group_id,
                    optiontype_name:optiontype_name,
                    site_id:this.props.site_id,
                    price:price,
                    price_type:price_type,
                    category_list:category_list
                }
       
             
                this.props.onCreateOptiontype(siteData,this.props.token);
          }
         else
          {
              
           
            const siteData={
                optiontype_group_id:optiontype_group_id,
                optiontype_name:optiontype_name,
                site_id:this.props.site_id,
                price:price,
                price_type:price_type,
                category_list:category_list
            }
         
            this.props.onSubmitOptiontypeEdit(siteData,this.props.token,this.props.match.params.id); 
          }

       }
      
      
     render(){
        let redirect="";
        let Title="Create Optiontype";
        let buttonname='Create Optiontype';
        let dropdownmenu ='';
        
       // console.log(this.state.categorychecklist)
         if(!this.state.optiontypeedit)
            { 
              console.log(this.state.optiontypeedit);
               redirect=<Redirect to="/users/optiontypes"/>;
            }
            
        if(this.props.match.params.id)
            { Title="Edit Optiontype";
            buttonname="Edit Optiontype";
           }
           
        const   optiontypegroups = this.state.optiontypegroups;
         const   categoriesdropdown = this.state.categoriesdropdown;
         const   categorychecklist = this.state.categorychecklist;
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
                    floatingLabelText="Option Type Name"
                    onChange={(event)=>this.handleChange(event,'optionname')}
                    name="optionname"
                    ref='optionname'
                    value={this.state.optionname}
                    validators={['required']}
                    errorMessages={['option type name is required']}
                  />
                     </div> 
                     <div className="divCls"> 
                <SelectField 
                       name="price_type" 
                       value={this.state.price_type} 
                      onChange={this.handlepricedropdownChange}
                     >
                    <MenuItem value={0} primaryText="Price Type" />
                    <MenuItem value={'P'} primaryText="Percentage" />
                    <MenuItem value={'F'} primaryText="Fixed" />
                    </SelectField > 
                 
         </div>
         <div className="divCls"> 
                <TextField 
                floatingLabelText="Price"
                  ref="price"
                  name="price" 
                  value={this.state.price} 
                  onChange={(event)=>this.handleChange(event,'price')}
                   />
                    
                 
         </div>  
                <div className="divCls"> 
                <SelectField 
                       name="opt_group_id" 
                       value={this.state.opt_group_id} 
                      onChange={this.handledropdownChange}
                     >
                    <MenuItem value={0} primaryText="Select Group" />
                    {
                       // console.log(optiontypegroups)
                     
                        optiontypegroups.map((site,j) => 
                        <MenuItem key={j} value={site.id} primaryText={site.group_name} />
                          )
                    }      
                    </SelectField > 
                 
        </div>

        
         <div className=" divCls"><b>Category</b></div>
             <div className="divSizeauto divCls">
               
               
                 {
                    
                      categoriesdropdown.map((site,j) => 
                              
                               Object.keys(site).map(key => 
                                //console.log(site[key].category_name)
                                <Checkbox
                                    label={site[key].category_name}
                                    key={key} 
                                   /* onCheck={this.handleCheckbox.bind(this)}*/
                                    onCheck={this.handleShareholderNameChange(site[key].id,event)}
                                    checked={categorychecklist[site[key].id] ? true : false  }
                                    value={site[key].id}
                                    />
                           )
                          )
                 }
             </div>        
               <div className="divCls width100"> 
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
        loading:state.optiontypes.loading,
        categoriesdropdown:state.categories.categoriesdropdown,
        site_id:state.auth.site_id,
        optiontypeedit:state.optiontypes.optiontypeedit,
        optiontypegroups:state.optiontypegroup.optiontypegroups,
        categorychecklist:state.optiontypes.categorychecklist,
        optionname:state.optiontypes.optionname,
        opt_group_id:state.optiontypes.opt_group_id,
        price:state.optiontypes.price,
        price_type:state.optiontypes.price_type,
       
    }    
}

const mapDispatchToProps = dispatch =>{
    return {
         onFetchClientoptiongroup: (token,siteid)=>dispatch(actions.fetchOptiontypegroups(token,siteid)), 
         onFatchCategories:(siteid,token) => dispatch(actions.fecthdropCategories(siteid,token)),
         onCreateOptiontype:(siteData,token) => dispatch(actions.CreateOptiontype(siteData,token)),
         onOptiontypeEdit:(catgeoryId,token) => dispatch(actions.EditOptiontype(catgeoryId,token)),
         onSubmitOptiontypeEdit:(categoryData,token,catgoryId) => dispatch(actions.EditSubmitOptiontype(categoryData,token,catgoryId)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Createoptiontypes);

//export default Createoptiontypes;