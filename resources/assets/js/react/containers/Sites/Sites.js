import React,{Component} from 'react';
import UItables from '../../components/UI/Tables/Tables';
import Modal from '../../components/UI/Modal/Modal';
import Wrappermodal from '../../components/UI/Modal/Wrappermodal';

import {connect} from'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import HeadTitle from '../../components/Common/Headtitle';

import classes from './Sites.css';
 
class Sites extends Component {
  state = {
         'coloums':{
          'id':'id',
          'sitename':'Site Name',
          'siteurl':'Url',
          
         },
         showcheckbox:false,
         showModal:false,
         openModalBox:false,
         DeleteId:null,
         showWrapperModal:false,
         openWrapperModal:false,
         assignSitename:'',
         wrapperList:true,
         checked:false,
         wrapperlist:[] , 
         wrapperlistchecked:[],
         wrpperMsg:'',
         siteId:'',
         userId:''
        
        
       
  };
  componentDidMount (){
    
    this.props.onFetchSite(this.props.token);
    //console.log(this.array.sitelist);
    
  }
componentWillReceiveProps(nextProps){
   if(nextProps.message)
    {
      this.handleWrapperModalClose();
    }
   
    this.setState({chekedWrapperList:nextProps.checkList})
   let wrappersL={};
   let wrapperlist =  this.state.wrapperlist;
   let wrapperChklist = this.state.wrapperlistchecked;
   let checkedList={};
   
    Object.keys(nextProps.checkList).map((wrapper,j) => {

    

      wrappersL[nextProps.checkList[wrapper]['wrapperId']] = true;  
      wrapperlist[this.state.siteId]=wrappersL;

     // checkedList.push(nextProps.checkList[wrapper]['wrapperId']);
     if(nextProps.checkList[wrapper]['wrapperId']!==undefined)
          {
             checkedList = Object.assign({}, 
              checkedList, {[nextProps.checkList[wrapper]['wrapperId']]:  true});
          wrapperChklist[this.state.siteId]=checkedList;
          }
//console.log(nextProps.checkList[wrapper]['wrapperId']);

    }
  )

  this.setState({wrapperlist,wrapperChklist});
 
  
/*
  -L7niYcatshUL5Kriq2k: {siteId: "-L7dBY5vkqeusSQ1mKDk", wrapperId: "-L7iUARb7T3iSVkpYT-i"}
  -L7niYd39tgY6y_RcAkV: {siteId: "-L7dBY5vkqeusSQ1mKDk", wrapperId: "-L7iWct-502lIL3MR-qw"}__proto__: Object
  
*/
}

 deleteIconClicked = (id,userId) => {
  
   this.setState({showModal:true,openModalBox: false,DeleteId:id,userId:userId});
   
 }
handleModalboxCloseButton = () => {
  this.setState({showModal:true,openModalBox: true});
};

handleModalboxSubmitButton = (deleteId,userId) => {
  this.props.onSiteDelete(deleteId,this.props.token,userId);
  this.setState({showModal:true,openModalBox: true});
  
};

/* Wrapper Modal Functions Start */

handleWrapperModalClose = () =>{
  this.setState({showWrapperModal:true,openWrapperModal: true,wrpperMsg:'',chekedWrapperList:[]});
}
wrapperIconClicked = (siteId,name) =>{
  this.props.onFetchWrapper(this.props.token); 
  this.setState({siteId:siteId})
  this.props.onFetchSiteWrapper(siteId,this.props.token)
  this.setState({showWrapperModal:true,openWrapperModal: false,assignSitename:'Wrapper List Assign to '+name});
}
handleWrappercheckboxClick = (e,id,siteId) =>{
  let index;
  let wrappersL={};
  let wrapperSitelist_old =  this.state.wrapperlist;
 let wrapperSitelist =  {...this.state.wrapperlist[siteId]};
  wrappersL[id] = e.target.checked;
var newInput = Object.assign({}, 
  wrapperSitelist, {[id]:  e.target.checked});
  wrapperSitelist_old[siteId]=newInput;

  this.setState({wrapperSitelist_old})
  
  let wrapperlistchecked_old = this.state.wrapperlistchecked;
  let wrapperlistchecked = {...this.state.wrapperlistchecked};
  let Objectnewunchecked= this.state.wrapperlistchecked;
 
    if (e.target.checked) {
     
      if(!wrapperlistchecked.hasOwnProperty(siteId))
      {
            var newInputCheck = Object.assign({}, 
      wrapperlistchecked, {[id]:  e.target.checked});
      }
      else
      {
          var newInputCheck = Object.assign({}, 
      wrapperlistchecked[siteId], {[id]:  e.target.checked});
      } 
        wrapperlistchecked_old[siteId]=newInputCheck;
        
        this.setState({wrapperlistchecked_old})

  } else {
    
       let ObjectCreate =  Object.keys(wrapperlistchecked[siteId]);
       console.log(wrapperlistchecked[siteId])
       
       index = ObjectCreate.indexOf(id)
       ObjectCreate =ObjectCreate.splice(index, 1)
       wrapperlistchecked_old[siteId]=ObjectCreate;
       this.setState({wrapperlistchecked_old})
    }
   
   
}
handleWrapperSubmit = () =>{
  let ChckLen;
 if(this.state.wrapperlistchecked.hasOwnProperty(this.state.siteId))
   {
      ChckLen=Object.keys(this.state.wrapperlistchecked[this.state.siteId]).length;
   }
  else
  {
     ChckLen=this.state.wrapperlistchecked.length;
  } 
  if(ChckLen===0)
   {
      this.setState({wrpperMsg:'Please select atleast one Wrapper .'})
      // console.log("error");
   }
  else
  {
    this.setState({wrpperMsg:''});
  
   console.log(this.state.wrapperlistchecked[this.state.siteId]);
   this.props.onSubmitWrapper(this.state.wrapperlistchecked[this.state.siteId],this.state.siteId,this.props.token);
   } 
}

    render(){
    
       let tables = <Spinner/>;
       let modal='';
       let wrapperModal='';
       if(!this.props.loading)
         {tables = <UItables wrapperList={this.state.wrapperList}  theadRow={this.state.coloums} showCheckbox={this.state.showcheckbox} siteUrl='site/edit/' tbody={this.props.sites} ondeleteClicked ={this.deleteIconClicked} wrapperClicked={this.wrapperIconClicked} editClicked={this.editIconClick}/>}
        
        if(this.state.showModal)
          { 
         modal=<Modal title="Are you sure you want to Delete site?" UserId={this.state.userId}  DeleteId={this.state.DeleteId} open={!this.state.openModalBox} closedModalbox={this.handleModalboxCloseButton} submitModalbox={this.handleModalboxSubmitButton}/> 
          } 
        
         if(this.state.showWrapperModal)
          { 
           
                wrapperModal=<Wrappermodal title={this.state.assignSitename}  
                open={!this.state.openWrapperModal} 
                closedWrappermodal={this.handleWrapperModalClose} 
                wrappers={this.props.wrappers} 
                checked={this.state.checked}
                checkboxChange={this.handleWrappercheckboxClick} 
                submitWrapper={this.handleWrapperSubmit}
                wrapperChk={this.state.wrapperlist} 
                wrpperMsg={this.state.wrpperMsg}
                loading={this.props.wloading}
                CheckedList={this.state.chekedWrapperList} 
                siteId={this.state.siteId}
                /> 
              
          } 
    let MsgAdd='';
    if(this.props.message)
       { MsgAdd = <div className="Msg">{this.props.message}</div> }

      return(
           <div className="container">
           <HeadTitle title='Site List'/> 
               {MsgAdd}
              {tables}
              {modal} 
              {wrapperModal}
           </div>    
        );
    }
}

const mapStateToProps = state =>{
 
     return{
         sites:state.sites.sites,
         loading:state.sites.loading,
         wloading:state.wrapper.loading,
         wrappers:state.wrapper.wrappers,
         message:state.wrapper.message,
         checkList:state.wrapper.checkList,
         isAuthicated:state.auth.token !== null,
         token:state.auth.token
     }
}

const mapDispatchToProps = dispatch =>{
     return {
        onFetchSite: (token)=>dispatch(actions.fetchSites(token)),
        onSiteDelete: (id,token,userId)=>dispatch(actions.deleteSite(id,token,userId)),
        onFetchWrapper: (token)=>dispatch(actions.fetchWrappers(token)),
        onSubmitWrapper: (wrappers,siteid,token)=>dispatch(actions.submitSiteWrappers(wrappers,siteid,token)),
        onFetchSiteWrapper:(siteid,token)=>dispatch(actions.submitFetchSiteWrappers(siteid,token))
       
        
     }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sites);