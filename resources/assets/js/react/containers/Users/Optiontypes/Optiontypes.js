import React,{Component} from 'react';
import UItables from '../../../components/UI/Tables/Tables';
import Modal from '../../../components/UI/Modal/Modal';
import {connect} from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import HeadTitle from '../../../components/Common/Headtitle';

class Optiontype extends Component {
  
    state = {
       'coloums':{
       'id':'id',
       'optiontypegroup_name':'Group Name',
       'optiontype_name':'Option type'
      },
     
      showcheckbox:false,
      showModal:false,
      openModalBox:false,
      DeleteId:null,
      optiontypegroups:false,
     
      
};
componentDidMount (){
   
   this.props.onFetchClientoptiontype(this.props.token,this.props.site_id);
}

deleteIconClicked = (id) => {
this.setState({showModal:true,openModalBox: false,DeleteId:id});
}
handleModalboxCloseButton = () => {

this.setState({showModal:true,openModalBox: true});
};

handleModalboxSubmitButton = (deleteId) => {

this.props.onOptiontypeDelete(deleteId,this.props.token,this.props.site_id);
this.setState({showModal:true,openModalBox: true});

};


render(){
    
    let tables = <Spinner/>;
    if(!this.props.loading)
      {tables = <UItables wrapperList={this.state.optiontypes}  theadRow={this.state.coloums} showCheckbox={this.state.showcheckbox} siteUrl='/users/optiontypes/edit/' tbody={this.props.optiontypes} ondeleteClicked ={this.deleteIconClicked} editClicked={this.editIconClick}/>}
     let modal='';
     if(this.state.showModal)
       { modal=<Modal title="Are you sure you want to Delete Option type, it will delete all the catgeoires attached to this option type?"  DeleteId={this.state.DeleteId} open={!this.state.openModalBox} closedModalbox={this.handleModalboxCloseButton} submitModalbox={this.handleModalboxSubmitButton}/> } 
   return(
        <div className="container">
        <HeadTitle title='Option Types  List'/>
        {tables}
        {modal} 
        </div>    
     );
 }
}
const mapStateToProps = state =>{
   
return{
   optiontypes:state.optiontypes.optiontypes,
   loading:state.optiontypegroup.loading,
   isAuthicated:state.auth.token !== null,
   token:state.auth.token,
   site_id:state.auth.site_id
}
}

const mapDispatchToProps = dispatch =>{
            return {
             onFetchClientoptiontype: (token,siteid)=>dispatch(actions.fetchOptiontypes(token,siteid)),
             onOptiontypeDelete: (deleteId,token,site_id)=>dispatch(actions.deleteOptiontype(deleteId,token,site_id)),
            }
}

export default connect(mapStateToProps,mapDispatchToProps)(Optiontype);
//export default Optiontypegroup();