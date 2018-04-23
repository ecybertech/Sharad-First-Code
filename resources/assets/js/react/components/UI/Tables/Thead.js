import React from 'react';
import {
   TableHeaderColumn,
   
  } from 'material-ui/Table';
const tHead = (props) =>{
return (
            Object.keys(props.theadRow).map(key => 
                 <TableHeaderColumn key={key}>{props.theadRow[key]}</TableHeaderColumn>
                )
        ); 
}

export default tHead;