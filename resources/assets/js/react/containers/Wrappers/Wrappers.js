import React,{Component} from 'react';
import UItables from '../../components/UI/Tables/Tables';
import Modal from '../../components/UI/Modal/Modal';

import {connect} from'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import HeadTitle from '../../components/Common/Headtitle';

import classes from './Wrappers.css';
 
class Wrappers extends Component {
  state = {
         'coloums':{
          'id':'id',
          'wrappername':'Wrapper Name',
          'wrapperurl':'Url',
          
         },
         showcheckbox:false,
         showModal:false,
         openModalBox:false,
         DeleteId:null,
         wrapperList:false,
        
         
  };
  componentDidMount (){
   
    this.props.onFetchWrapper(this.props.token);
    //console.log(this.array.sitelist);
  }

 deleteIconClicked = (id) => {
   this.setState({showModal:true,openModalBox: false,DeleteId:id});
 }
handleModalboxCloseButton = () => {
 
  this.setState({showModal:true,openModalBox: true});
};

handleModalboxSubmitButton = (deleteId) => {
 
  this.props.onWrapperDelete(deleteId,this.props.token);
  this.setState({showModal:true,openModalBox: true});
  
};

render(){
       let tables = <Spinner/>;
       if(!this.props.loading)
         {tables = <UItables wrapperList={this.state.wrapperList}  theadRow={this.state.coloums} showCheckbox={this.state.showcheckbox} siteUrl='wrapper/edit/' tbody={this.props.wrappers} ondeleteClicked ={this.deleteIconClicked} editClicked={this.editIconClick}/>}
        let modal='';
        if(this.state.showModal)
          { modal=<Modal title="Are you sure you want to Delete wrapper?"  DeleteId={this.state.DeleteId} open={!this.state.openModalBox} closedModalbox={this.handleModalboxCloseButton} submitModalbox={this.handleModalboxSubmitButton}/> } 
      return(
           <div className="container">
           <HeadTitle title='Wrapper List'/>
           {tables}
              {modal}  
           </div>    
        );
    }
}
const mapStateToProps = state =>{
  
  return{
      wrappers:state.wrapper.wrappers,
      loading:state.wrapper.loading,
      isAuthicated:state.auth.token !== null,
      token:state.auth.token
  }
}

const mapDispatchToProps = dispatch =>{
  return {
     onFetchWrapper: (token)=>dispatch(actions.fetchWrappers(token)),
     onWrapperDelete: (id,token)=>dispatch(actions.deleteWrapper(id,token)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wrappers);