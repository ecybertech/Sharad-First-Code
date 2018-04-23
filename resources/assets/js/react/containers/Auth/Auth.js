import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import {Redirect} from 'react-router-dom';


const styles = {
    container: {
      textAlign: 'center',
      paddingTop: 20,
      borderRadius: 2,
      
    }
 }
class Auth extends Component{
    state = {
        username: '',
        password: '',
        isSignup:true,
       
   }

  /*
   componentWillMount (nextProps) {
    if(this.state.isAdmin != this.props.is_admin)
       this.setState({isAdmin:nextProps.is_admin})

   }
  */
   onSubmit = (e) => {
    e.preventDefault()
    const username = this.refs.username.input.value;
    const password = this.refs.password.input.value;
    this.props.onAuth(username,password,this.state.isSignup);
   }

     render(){
        let errorMessage=null;
        
        if(this.props.error)
           {
            errorMessage= (
                 <p>{this.props.error.message}</p>
            );
           
           }
           let isRedirect = null;

           if(this.props.isAuthenicated && this.props.is_admin ===1)
              {
                  
                isRedirect = <Redirect to="/site" />;
              }
            else if(this.props.isAuthenicated && this.props.is_admin === 0)
            {
              isRedirect = <Redirect to="/dashboard" />;
            }
           return(
              <div style={styles.container} >
              {isRedirect}
              {errorMessage}

                <h1>Admin Login</h1>
              
            <form onSubmit={this.onSubmit}>
                <TextField
                ref='username'
                floatingLabelText='Username'
                defaultValue={this.state.username}
                />
                <br />
                <TextField
                ref='password'
                floatingLabelText='Password'
                type="password"
                defaultValue={this.state.password}
                />
                <br />
                <RaisedButton type='submit' label='Submit' primary />
            </form>
</div>
           );
     }

}
const mapStateToProps = state =>{
  console.log(state.auth.is_admin);
    return{
        error:state.auth.error,
        isAuthenicated: state.auth.token !== null,
        is_admin:state.auth.is_admin
        
    }
}
const mapDispactToProps = dispatch =>{
    return {
        onAuth: (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup))
    };
};

export default connect(mapStateToProps,mapDispactToProps)(Auth) ;