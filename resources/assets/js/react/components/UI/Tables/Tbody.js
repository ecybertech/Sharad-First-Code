import React from 'react';
import {
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
const mytBody = (props) =>{   
   
    return (
      Object.keys(props.tbody).map((site,j) => 
      <TableRow key={j}  >
       {
           Object.keys(props.theadRow).map((lkey,jk) => 
                  <TableRowColumn key={jk}>{ props.tbody[site][lkey]} </TableRowColumn>
                ) 
          }
      </TableRow> 
     )
    )        
             
  }
export default mytBody;



