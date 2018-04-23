import React from 'react';
import Drawer from 'material-ui/Drawer';
import Menus  from '../Menus/Menus';

const drawer = (props) =>{
    return( 
        <Drawer open={props.state}
        docked={false}
        onRequestChange={props.clicked}
        >
         <Menus is_admin={props.is_admin} clicked={props.menuClicked} />
        </Drawer>   
    );
}

export default drawer;