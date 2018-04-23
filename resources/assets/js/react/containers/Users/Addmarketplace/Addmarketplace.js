import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import HeadTitle from '../../../components/Common/Headtitle';

class Addmarketplace extends Component{
state={
  marketplaceid:this.props.match.params.marketplace_id,
  clientwrapperedit:true
}




/*
componentDidMount() {
       if(this.props.match.params.id)
         { this.props.onMountEdit(this.props.match.params.id,this.props.token);
         }
    }  
    componentWillReceiveProps(nextProps){
        let SiteEditProps=this.state.siteEdit;
       
         if(nextProps.siteedit !== this.props.siteedit) {
            SiteEditProps=nextProps.siteedit;
            // nextProps.myProp has a different value than our current prop
            // so we can perform some calculations based on the new value
          }
     
        this.setState({sitename:nextProps.sitename,siteurl:nextProps.siteurl,siteEdit:nextProps.siteedit})
      }  
*/componentWillReceiveProps(nextProps){
  

 this.setState({clientwrapperedit:nextProps.clientwrapperedit})
}  
         
    handleChange = (event,controlname) => {
       this.setState({
         [controlname]: event.target.value,
        });
      };
    onSubmit = (e) => {
        e.preventDefault()
        const marketplaceid = this.refs.marketplaceid.input.value;
      
  
            const siteData={
                marketplace_id:marketplaceid,
                site_id:this.props.site_id,
                id:this.props.match.params.id
            }
    
          this.props.onEditSite(siteData,this.props.token);
         

       }
      
      
     render(){
        let redirect="";
        let Title="Add Market Place Id";
        let buttonname='Add MarketPlace id';
        
        console.log(this.state.clientwrapperedit);
         if(!this.state.clientwrapperedit)
           { redirect=<Redirect to="/wrapperlist"/>; }
        

       

        return (
            <div className="container">
            {redirect} 
              <HeadTitle title={Title}/> 
              <Paper className="panel">
              <form onSubmit={this.onSubmit}>
                <div className="divCls">  
                        <TextField
                        ref='marketplaceid'
                        floatingLabelText='MarketplaceId'
                        value={this.state.marketplaceid}
                        onChange={(event)=>this.handleChange(event,'marketplaceid')}
                        />
                </div> 
               
               <div className="divCls"> 
                <RaisedButton type='submit' label={buttonname} primary />
               </div> 
            </form>
             </Paper>    
            
            
            </div>
       );
    }
    

} 
const mapStateToProps = state =>{
  
    return {
       site_id:state.auth.site_id, 
       token:state.auth.token,
       loading:state.clientwrappers.loading,
       edit:state.clientwrappers.edit,
       clientwrapperedit:state.clientwrappers.clientwrapperedit,
        
    }    
}


const mapDispatchToProps = dispatch =>{
     return {
        onEditSite:(siteData,token) => dispatch(actions.createUsermarketplace(siteData,token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Addmarketplace);
//export default Addmarketplace;