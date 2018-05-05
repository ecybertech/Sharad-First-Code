import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const modalBox = (props) =>{
  
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={props.closedModalbox}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          onClick={(id) => props.submitModalbox(props.DeleteId,props.UserId)}
        />,
      ];
     return(
        <Dialog
          actions={actions}
          modal={false}
          open ={props.open}
        >
         {props.title}
        </Dialog>

     );
}

export default modalBox;