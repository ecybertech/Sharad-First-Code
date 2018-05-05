import React, { Component } from 'react';
import {connect} from 'react-redux';
import Auth from './containers/Auth/Auth';
import {Route,withRouter,Switch,Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Sites from './containers/Sites/Sites';
import  CreateSites from './containers/Sites/Createsites';
import Wrapper from './containers/Wrappers/Wrappers';
import CreateWrapper from './containers/Wrappers/Createwrappers';
import Logout from './containers/Auth/Logout/Logout';
import Dashboard from './containers/Users/Dashboard/Dashboard';
import Wrapperlist from './containers/Users/Wrapperlist/Wrapperlist';
import UserWrapper from './containers/Users/Addmarketplace/Addmarketplace';
import Usersettings from './containers/Users/Usersettings/Usersettings';
import Importxls from './containers/Users/Inventory/Importxls';
import Categories from './containers/Users/Category/Categories';
import Createcategory from './containers/Users/Category/Createcategory';
import Optiontypegroup from './containers/Users/Optiontypegroup/Optiontypegroup';
import Products from './containers/Users/Inventory/Products';
import CreateOptiongroup from './containers/Users/Optiontypegroup/CreateOptiongroup';
import Optiontypes from './containers/Users/Optiontypes/Optiontypes';
import Createoptiontypes from './containers/Users/Optiontypes/Createoptiontypes';
//import Wrapperlist from './containers/Clientwrappers/Clientwrappers';
//

import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
   this.props.onTryAutoSignUp();
  }
 render() {
  
  /* let routes = (
          <Switch>
           <Route path="/"  exact component={Auth} />
           <Redirect to="/"   />
          </Switch>
     ); 
  
      if(this.props.isAuthicated)   
         {*/
       let  routes = (
            <Switch>
             <Route path="/"  exact component={Auth} />
             <Route path="/site/create"  component={CreateSites} />
             <Route  path="/site/edit/:id"  component={CreateSites} />
             <Route path="/site"  component={Sites} />
             <Route path="/wrapper/edit/:id"  component={CreateWrapper} />
             <Route path="/users/wrapper/edit/:id/:marketplace_id"  component={UserWrapper} />
             <Route path="/users/usersettings"  component={Usersettings} />
             <Route path="/users/inventory/importxls"  component={Importxls} />
             <Route path="/users/category"  component={Categories} />
             <Route path="/users/createcategory"  component={Createcategory} />
             <Route path="/category/edit/:id"  component={Createcategory} />
             
             <Route path="/optiontypegroups"  component={Optiontypegroup} />
             <Route path="/users/optiongroup/create"  component={CreateOptiongroup} />
             <Route path="/users/optiongroup/edit/:id"  component={CreateOptiongroup} />
             <Route path="/users/optiontypes/create"  component={Createoptiontypes} />
             <Route path="/users/optiontypes/edit/:id"  component={Createoptiontypes} />
             <Route path="/users/optiontypes"  component={Optiontypes} />
             <Route path="/users/products"  component={Products} />
             

             <Route   path="/wrapper/createwrapper"   component={CreateWrapper} />
             <Route  path="/wrapper"   component={Wrapper} />
             <Route  path="/wrapperlist"   component={Wrapperlist} />
             <Route path="/logout" component={Logout} />
             <Route path="/dashboard" component={Dashboard} />
             
             <Redirect to="/" />
            </Switch>
          ); 
       //  }

     return (
      <div>
        <Layout>
         {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  
  return {
    isAuthicated:state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
 return {
   onTryAutoSignUp : () => dispatch(actions.authCheckstate())
 }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

