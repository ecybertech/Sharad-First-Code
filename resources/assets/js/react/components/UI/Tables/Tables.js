import React from 'react';
import THead from './Thead';
import {Link} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableRowColumn,
  TableRow,
  
} from 'material-ui/Table';

import EditIcon from 'material-ui/svg-icons/image/edit'; 
import DeleteIcon from 'material-ui/svg-icons/action/delete'; 
import AddIcon from 'material-ui/svg-icons/av/playlist-add'; 

const tables = (props) =>{
let wrapperList='';

if(props.wrapperList)
  {
    //wrapperList=<TableRowColumn><AddIcon style={{cursor:'pointer'}} onClick={ () => props.wrapperClicked(props.tbody[site]['id'],props.tbody[site]['sitename'])}/> </TableRowColumn>;
  }


const tbody= Object.keys(props.tbody).map((site,j) => 
//console.log(props.tbody[site]['id']);
<TableRow key={j} selectable={false} >
 {
     Object.keys(props.theadRow).map((lkey,jk) => 
            <TableRowColumn key={jk}>{ props.tbody[site][lkey]} </TableRowColumn>
          ) 

  }
 
    <TableRowColumn>
      {/*<Link to={props.siteUrl+props.tbody[site]['id']} >*/}
      <Link to={props.tbody[site].hasOwnProperty('marketplace_id') ? props.siteUrl+props.tbody[site]['wrapperId']+'/'+props.tbody[site]['marketplace_id'] : props.siteUrl+props.tbody[site]['id'] } >

       <EditIcon style={{cursor:'pointer'}}  />
      </Link> 
     </TableRowColumn>
    <TableRowColumn>
       <DeleteIcon style={props.tbody[site].hasOwnProperty('userId') ? {cursor:'pointer',display:'block'}:{display:'none'}} onClick={ () => props.ondeleteClicked(props.tbody[site]['id'],props.tbody[site]['userId'])}/> 
       <DeleteIcon style={!props.tbody[site].hasOwnProperty('userId') ? {cursor:'pointer',display:'block'}:{display:'none'}} onClick={ () => props.ondeleteClicked(props.tbody[site]['id'],'')}/> 
      </TableRowColumn>
    <TableRowColumn style={props.wrapperList ? {display:'block'}:{display:'none'}}><AddIcon style={{cursor:'pointer'}} onClick={ () => props.wrapperClicked(props.tbody[site]['id'],props.tbody[site]['sitename'])}/> </TableRowColumn>
    
</TableRow> 
)


 
   return (
      <Table>
              <TableHeader >
                <TableRow>
                  <THead theadRow={props.theadRow} />
                  <TableRowColumn> </TableRowColumn>
                  <TableRowColumn> </TableRowColumn>
                  <TableRowColumn style={props.wrapperList ? {display:'block'}:{display:'none'}}> </TableRowColumn>
                 </TableRow>
              </TableHeader>
              <TableBody >
               {tbody}
              </TableBody>
            </Table> 
  );
} 

export default tables;