import React from 'react';
import {Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import {List, ListItem,makeSelectable} from 'material-ui/List';
import Aux from '../../../hoc/Aux1/Aux1';


import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';

import ContentSend from 'material-ui/svg-icons/content/send';

const style = {
    display: 'inline-block',
    margin: '1px 2px 6px 0',
    width:'100%',
    borderBottomColor: 'none',
    backgroundColor:'#EDE7F6'
  };

  let SelectableList = makeSelectable(List);
const menuItems = (props) =>{
  let isAdmin = <Aux>
             
  <ListItem
primaryText="Websites"
leftIcon={<ContentInbox />}
initiallyOpen={false}

nestedItems={[
 <ListItem
    key={1}
    primaryText="Site List"
    leftIcon={<ContentSend />}
    containerElement={<Link to="/site"  />}
    value={1}
   />,
   <ListItem
    key={2}
    primaryText="Create site"
    leftIcon={<ActionGrade />}
    containerElement={<Link to="/site/create"  />} 
    value={2} 
   />,
]}
/>
<ListItem
primaryText="Wrapper"
leftIcon={<ContentInbox />}
initiallyOpen={false}

nestedItems={[
 <ListItem
    key={3}
    primaryText="Wrapper List"
    leftIcon={<ContentSend />}
    containerElement={<Link to="/wrapper" />}
    value={3}
   />,
   <ListItem
    key={4}
    primaryText="Create wrapper"
    leftIcon={<ActionGrade />}
    containerElement={<Link to="/wrapper/createwrapper"  />} 
    value={3} 
   />,
]}
/>
   </Aux>;

   if(props.is_admin==0)
     {
           isAdmin = <Aux>
             <ListItem
                  primaryText="Master"
                  leftIcon={<ContentInbox />}
                  initiallyOpen={false}

                  nestedItems={[
                  <ListItem
                      key={1}
                      primaryText="Category"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/users/category"  />}
                      value={1}
                    />,
                    <ListItem
                      key={2}
                      primaryText="Create Category"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/users/createcategory"  />}
                      value={2}
                    />,
                    <ListItem
                      key={3}
                      primaryText="Option Type Group"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/optiontypegroups"  />}
                      value={3}
                    />,
                    <ListItem
                      key={4}
                      primaryText="Create Option Group"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/users/optiongroup/create"  />}
                      value={4}
                    />,
                    <ListItem
                      key={5}
                      primaryText="Option Types"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/users/optiontypes"  />}
                      value={5}
                    />,
                    <ListItem
                      key={6}
                      primaryText="Create Option Types"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/users/optiontypes/create"  />}
                      value={6}
                    />,
                    
                   
                    
                  ]}
                  />


                <ListItem
                  primaryText="Inventory"
                  leftIcon={<ContentInbox />}
                  initiallyOpen={false}

                  nestedItems={[
                  <ListItem
                      key={1}
                      primaryText="Inventory Manager"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/users/products"  />}
                      value={1}
                    />,
                    <ListItem
                      key={2}
                      primaryText="Feed List"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/users/inventory/importxls"  />}
                      value={2}
                    />,
                    
                  ]}
                  />
                  <ListItem
                  primaryText="Listing Wrappers"
                  leftIcon={<ContentInbox />}
                  initiallyOpen={false}

                  nestedItems={[
                  <ListItem
                      key={3}
                      primaryText="User Wrapper List"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/wrapperlist" />}
                      value={3}
                    />,
                   
                  ]}
                  />
                  <ListItem
                  primaryText="Listing Orders"
                  leftIcon={<ContentInbox />}
                  initiallyOpen={false}

                  nestedItems={[
                  <ListItem
                      key={3}
                      primaryText="User Orders List"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/wrapperlist" />}
                      value={3}
                    />,
                   
                  ]}
                  />
                  <ListItem
                  primaryText="User Settings"
                  leftIcon={<ContentInbox />}
                  initiallyOpen={false}

                  nestedItems={[
                  <ListItem
                      key={3}
                      primaryText="User Settings"
                      leftIcon={<ContentSend />}
                      containerElement={<Link to="/users/usersettings" />}
                      value={3}
                    />,
                   
                  ]}
                  />

           </Aux>
     }
 
     return(
         <Paper style={style} >
         
         <SelectableList value={props.selectIndex} onClick={props.clicked} >
           {isAdmin}
            </SelectableList>

          
         </Paper>
    
     );
}

export default menuItems;