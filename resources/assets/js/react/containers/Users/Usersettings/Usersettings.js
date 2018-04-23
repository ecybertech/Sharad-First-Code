import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import HeadTitle from '../../../components/Common/Headtitle';

class Usersettings extends Component{

state={
 sellerid:'',
 mwsAuthToken:'',

}
componentDidMount() {
    
        this.props.onMountuserSettings(this.props.site_id,this.props.token);
        
    }  
       
static getDerivedStateFromProps(nextPros,Prevstate)
{
     if(nextPros.seller_id===Prevstate.nextPros)
     {
         return null;
     }
        return {
            sellerid:nextPros.seller_id,
           mwsAuthToken:nextPros.mwsAuthToken,
        }
}  
         
handleChange = (event,controlname) => {
       this.setState({
         [controlname]: event.target.value,
        });
      };
 onSubmit = (e) => {
        e.preventDefault()
        const sellerid = this.refs.sellerid.input.value;
        const mwsauth = this.refs.mwsauth.input.value;

        const siteData={
            sellerid:sellerid,
            mwsauth:mwsauth,
        }
          this.props.onUsersubmitwrapper(siteData,this.props.token);
       }
      
      
     render(){
        let redirect="";
        let Title="User Api Settings";
        let buttonname='Update User settings';

    
        /*
         if(!this.state.wrapperEdit)
           { 
               redirect=<Redirect to="/wrapper"/>;
            }
        if(this.props.match.params.id)
            { Title="Edit Wrapper";
            buttonname="Edit Wrapper";
           } */

        return (
            <div className="container">
             {redirect}   
              <HeadTitle title={Title}/> 
              <Paper className="panel">
              <form onSubmit={this.onSubmit}>
                <div className="divCls">  
                        <TextField
                        ref='sellerid'
                        floatingLabelText='Seller Id'
                        value={this.state.sellerid}
                        onChange={(event)=>this.handleChange(event,'sellerid')}
                        />
                </div> 
                <div className="divCls">
                <TextField
                ref='mwsAuthToken'
                floatingLabelText='MWS Authorisation Token'
                value={this.state.mwsAuthToken}
                onChange={(event) => this.handleChange(event,'mwsAuthToken')}
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
        
        isAuthicated:state.auth.token !== null,
        token:state.auth.token,
        userId:state.auth.userId,
        site_id:state.auth.site_id,
        seller_id:state.clientwrappers.seller_id,
        mwsAuthToken:state.clientwrappers.mwsauth,
        
    }    
}


const mapDispatchToProps = dispatch =>{
     return {
        
        onMountuserSettings:(siteid,token) => dispatch(actions.fetchUsersettingdata(siteid,token)),
        onUsersubmitwrapper:(siteData,token) => dispatch(actions.SubmitWrapperEditdata(siteData,token)),
        
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(Usersettings);
// export default Usersettings;