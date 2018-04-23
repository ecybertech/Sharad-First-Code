import React from 'react';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Aux from '../../../hoc/Aux1/Aux1';
const navigations = (props) =>{
    const toolbarStyle = {
        backgroundColor: 'transparent',
        
      }
let links = (
    <Aux> 
     <FlatButton label="Home"  containerElement={<Link to="/"/>}/>
    
       
    </Aux> 
);

if(props.isAuth)
 {
    
      if(props.is_admin==1)
       {
        links = (
            <Aux> 
            <FlatButton label="site"  containerElement={<Link to="/site"/>}/>
            <FlatButton label="logout"  containerElement={<Link to="/logout"/>}/>
            </Aux> 
            );
       }
      else
      {
        links = (
            <Aux> 
           
            <FlatButton label="logout"  containerElement={<Link to="/logout"/>}/>
            </Aux> 
            );
      } 

   
 }
     return(
            <Aux>
            <Toolbar style={toolbarStyle}>
                    <ToolbarGroup firstChild={true}>
                      {links}
                     </ToolbarGroup>
             </Toolbar> 
            </Aux>    
     );
}
export default navigations;