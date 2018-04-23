import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import classes from './Sites.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import HeadTitle from '../../components/Common/Headtitle';

class Createsites extends Component{
state={
 sitename:'',
 siteurl:'',
 siteEdit:true,
 username:'',
 password:''
}




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
         
    handleChange = (event,controlname) => {
       this.setState({
         [controlname]: event.target.value,
        });
      };
    onSubmit = (e) => {
        e.preventDefault()
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
        let Title="Create New Website";
        let buttonname='Create a Website';
        
        /*
         if(this.props.siteId!==null)
           { redirect=<Redirect to="/site"/>; }
        */

         if(!this.state.siteEdit)
            { 
               console.log("sharad "+ this.state.siteEdit)
                redirect=<Redirect to="/site"/>;
            }

        if(this.props.match.params.id)
            { Title="Edit Website";
            buttonname="Edit Website";
           }

        return (
            <div className="container">
            {redirect}   
              <HeadTitle title={Title}/> 
              <Paper className="panel">
              <form onSubmit={this.onSubmit}>
                <div className="divCls">  
                        <TextField
                        ref='sitename'
                        floatingLabelText='SiteName'
                        value={this.state.sitename}
                        onChange={(event)=>this.handleChange(event,'sitename')}
                        />
                </div> 
                <div className="divCls">
                <TextField
                ref='url'
                floatingLabelText='Site Url'
                value={this.state.siteurl}
                onChange={(event) => this.handleChange(event,'siteurl')}
                />
               </div>
               <div className="divCls">
                <TextField
                ref='username'
                floatingLabelText='Site Email Id '
                value={this.state.username}
                onChange={(event) => this.handleChange(event,'username')}
                />
               </div>
               <div className="divCls">
                <TextField
                ref='password'
                floatingLabelText='Site Password'
                value={this.state.password}
                onChange={(event) => this.handleChange(event,'password')}
                type="password"
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
        siteId:state.sites.siteId,
        siteedit:state.sites.siteedit,
        site:state.sites.sites,
        sitename:state.sites.sitename,
        siteurl:state.sites.siteurl,
        token:state.auth.token,
        loading:state.sites.loading
        
    }    
}


const mapDispatchToProps = dispatch =>{
     return {
        onCreateSite:(siteData,token) => dispatch(actions.createSite(siteData,token)),
        onMountEdit:(id,token) => dispatch(actions.fetchEditdata(id,token)),
        onEditSite:(siteData,token) => dispatch(actions.SubmitEditdata(siteData,token)),
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Createsites);