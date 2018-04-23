import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';


const styles = {
    checkbox: {
    marginTop: 16,
  },
};

const wrapperModal = (props) => {

  
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={props.closedWrappermodal}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}   
          onClick={props.submitWrapper}       
        />,
      ];
     const checkbox = [];
      const propsSite=props.wrapperChk[props.siteId];
    
    
     const conD=true;
     Object.keys(props.wrappers).map((wrapper,j) => 
     
     checkbox.push(
        <Checkbox
         key ={props.wrappers[wrapper]['id']}
         label={props.wrappers[wrapper]['wrappername']}
         style={styles.checkbox}
        // checked={props.wrapperChk[props.wrappers[wrapper]['id']]}
         checked={typeof(propsSite)!=='undefined'? propsSite[props.wrappers[wrapper]['id']]:console.log('')} 
         onCheck={(e) => props.checkboxChange(e,props.wrappers[wrapper]['id'],props.siteId)}
        />
      )  
    )
 let Msg='';
 if(props.wrpperMsg)
   {
        Msg=<div style={{border:'1px solid grren',margin:'12px',padding:'12px',color:'red',backgroundColor: '#eee',}}>{props.wrpperMsg}</div>;
   }
    return(

         <Dialog
          title={props.title}
          actions={actions}
          modal={false}
          open={props.open}
          onRequestClose={props.closedWrappermodal}
          autoScrollBodyContent={true}
        >
           
            {Msg}
            {checkbox}
          
        </Dialog>
      
      )
  
}

export default wrapperModal;