import React,{Component} from 'react';
import UItables from '../../../components/UI/Tables/Tables';
import Modal from '../../../components/UI/Modal/Modal';
import {connect} from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import HeadTitle from '../../../components/Common/Headtitle';

class Optiontypegroup extends Component {
  
    state = {
       'coloums':{
       'id':'id',
       'group_name':'Group Name',
      },
     
      showcheckbox:false,
      showModal:false,
      openModalBox:false,
      DeleteId:null,
      optiontypegroups:false,
     
      
};
componentDidMount (){
   
   this.props.onFetchClientoptiontypegroup(this.props.token,this.props.site_id);
}

deleteIconClicked = (id) => {
this.setState({showModal:true,openModalBox: false,DeleteId:id});
}
handleModalboxCloseButton = () => {

this.setState({showModal:true,openModalBox: true});
};

handleModalboxSubmitButton = (deleteId) => {

this.props.onOptiongroupDelete(deleteId,this.props.token,this.props.site_id);
this.setState({showModal:true,openModalBox: true});

};


render(){
    
    let tables = <Spinner/>;
    if(!this.props.loading)
      {tables = <UItables wrapperList={this.state.optiontypegroups}  theadRow={this.state.coloums} showCheckbox={this.state.showcheckbox} siteUrl='/users/optiongroup/edit/' tbody={this.props.optiontypegroups} ondeleteClicked ={this.deleteIconClicked} editClicked={this.editIconClick}/>}
     let modal='';
     if(this.state.showModal)
       { modal=<Modal title="Are you sure you want to Delete Option type group, it will delete all the option types and catgeoires attached to option type?"  DeleteId={this.state.DeleteId} open={!this.state.openModalBox} closedModalbox={this.handleModalboxCloseButton} submitModalbox={this.handleModalboxSubmitButton}/> } 
   return(
        <div className="container">
        <HeadTitle title='Your Option group List'/>
        {tables}
        {modal} 
        </div>    
     );
 }
}
const mapStateToProps = state =>{
   
return{
   optiontypegroups:state.optiontypegroup.optiontypegroups,
   loading:state.optiontypegroup.loading,
   isAuthicated:state.auth.token !== null,
   token:state.auth.token,
   site_id:state.auth.site_id
}
}

const mapDispatchToProps = dispatch =>{
            return {
            onFetchClientoptiontypegroup: (token,siteid)=>dispatch(actions.fetchOptiontypegroups(token,siteid)),
            onOptiongroupDelete: (deleteId,token,site_id)=>dispatch(actions.deleteOptiongroup(deleteId,token,site_id)),
            }
}

export default connect(mapStateToProps,mapDispatchToProps)(Optiontypegroup);
//export default Optiontypegroup();