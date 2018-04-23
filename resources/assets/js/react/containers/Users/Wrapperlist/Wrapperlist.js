import React,{Component} from 'react';
import UItables from '../../../components/UI/Tables/Tables';
import {connect} from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import HeadTitle from '../../../components/Common/Headtitle';

class Wrapperlist extends Component {
  
       state = {
      'coloums':{
       'id':'id',
       'wrappername':'Wrapper Name',
       'marketplace_id':'MarketPlace Id'
      },
      showcheckbox:false,
      showModal:false,
      openModalBox:false,
      DeleteId:null,
      clientwrappers:false,
     
      
};
componentDidMount (){
   this.props.onFetchClientwrapper(this.props.token,this.props.site_id);
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
      {tables = <UItables wrapperList={this.state.clientwrappers}  theadRow={this.state.coloums} showCheckbox={this.state.showcheckbox} siteUrl='users/wrapper/edit/' tbody={this.props.clientwrappers} ondeleteClicked ={this.deleteIconClicked} editClicked={this.editIconClick}/>}
     let modal='';
     if(this.state.showModal)
       { modal=<Modal title="Are you sure you want to Delete wrapper?"  DeleteId={this.state.DeleteId} open={!this.state.openModalBox} closedModalbox={this.handleModalboxCloseButton} submitModalbox={this.handleModalboxSubmitButton}/> } 
   return(
        <div className="container">
        <HeadTitle title='Your Wrapper List'/>
        {tables}
           {modal}  
        </div>    
     );
 }
}
const mapStateToProps = state =>{

return{
   clientwrappers:state.clientwrappers.clientwrappers,
   loading:state.wrapper.loading,
   isAuthicated:state.auth.token !== null,
   token:state.auth.token,
   site_id:state.auth.site_id
}
}

const mapDispatchToProps = dispatch =>{
            return {
            onFetchClientwrapper: (token,siteid)=>dispatch(actions.fetchClientwrappers(token,siteid)),
            onWrapperDelete: (id,token)=>dispatch(actions.deleteClientwrapper(id,token)),
            }
}

export default connect(mapStateToProps,mapDispatchToProps)(Wrapperlist);