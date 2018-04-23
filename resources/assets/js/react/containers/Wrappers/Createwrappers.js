import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import classes from './Wrappers.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import HeadTitle from '../../components/Common/Headtitle';

class Createwrappers extends Component{

state={
 wrappername:'',
 wrapperurl:'',
 wrapperEdit:true
}
componentDidMount() {
       if(this.props.match.params.id)
         { 
            console.log("Did receive Edit "+this.props.edit); 
            this.props.onMountWrapper(this.props.match.params.id,this.props.token);
         }
    }  
  componentWillReceiveProps(nextProps){
        let WrapperEditProps=this.state.wrapperEdit;
       
         if(nextProps.edit !== this.props.edit) {
            WrapperEditProps=nextProps.edit;
            // nextProps.myProp has a different value than our current prop
            // so we can perform some calculations based on the new value
          }

        this.setState({wrappername:nextProps.wrappername,wrapperurl:nextProps.wrapperurl,wrapperEdit:nextProps.edit})
      } 

  
         
handleChange = (event,controlname) => {
       this.setState({
         [controlname]: event.target.value,
        });
      };
 onSubmit = (e) => {
        e.preventDefault()
        const wrappername = this.refs.wrappername.input.value;
        const wrapperurl = this.refs.wrapperurl.input.value;

        if(!this.props.match.params.id)
          {
                const siteData={
                    wrappername:wrappername,
                    wrapperurl:wrapperurl,
                    
                }
        
               this.props.onCreateWrapper(siteData,this.props.token);
          }
         else
          {
            const siteData={
                wrappername:wrappername,
                 wrapperurl:wrapperurl,
                 id:this.props.match.params.id
            }
           if(this.state.wrapperEdit)
            { 
              this.props.onEditWrapper(siteData,this.props.token);
            } 
          }

       }
      
      
     render(){
        let redirect="";
        let Title="Create New Wrapper";
        let buttonname='Create a Wrapper';

    

         if(!this.state.wrapperEdit)
           { 
               redirect=<Redirect to="/wrapper"/>;
            }
        if(this.props.match.params.id)
            { Title="Edit Wrapper";
            buttonname="Edit Wrapper";
           } 

        return (
            <div className="container">
             {redirect}   
              <HeadTitle title={Title}/> 
              <Paper className="panel">
              <form onSubmit={this.onSubmit}>
                <div className="divCls">  
                        <TextField
                        ref='wrappername'
                        floatingLabelText='Wrapper name'
                        value={this.state.wrappername}
                        onChange={(event)=>this.handleChange(event,'wrappername')}
                        />
                </div> 
                <div className="divCls">
                <TextField
                ref='wrapperurl'
                floatingLabelText='Wrapper Url'
                value={this.state.wrapperurl}
                onChange={(event) => this.handleChange(event,'wrapperurl')}
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
        wrapperId:state.wrapper.wrapperId,
        edit:state.wrapper.edit,
        wrapper:state.wrapper.wrappers,
        wrappername:state.wrapper.wrappername,
        wrapperurl:state.wrapper.wrapperurl,
        isAuthicated:state.auth.token !== null,
        token:state.auth.token
    }    
}


const mapDispatchToProps = dispatch =>{
     return {
        onCreateWrapper:(siteData,token) => dispatch(actions.createWrapper(siteData,token)),
        onMountWrapper:(id,token) => dispatch(actions.fetchWrapperEditdata(id,token)),
        onEditWrapper:(siteData,token) => dispatch(actions.SubmitWrapperEditdata(siteData,token)),
        
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(Createwrappers);