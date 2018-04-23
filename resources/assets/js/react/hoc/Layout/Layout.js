import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../Aux1/Aux1';
import AppBar from 'material-ui/AppBar';
import inmonarchLogo from '../../assets/images/inmonarch.png';
import Navigations from '../../components/UI/Navigation/Navigations';



import Menus  from '../../components/UI/Menus/Menus';
import Drawer from '../../components/UI/Drawer/Drawer';
import classes from './Layout.css';

class Layout extends Component{
   
  
    state = {
        open: false,
        selectedIndex:1
    };
        
    SidebarclosedHandler = (open) =>{ 
        this.setState({open})
      }
      Sidebarclosed = () =>{ 
        this.setState({open:false})
      }
      
   handleToggle = () => {
    this.setState({open: !this.state.open})
   };
  
   
   
   menuClickHanlder = (event, index) =>{
      
    this.setState({
        selectedIndex: index
    })
   }
    render(){
       
         /*
          let divStyle= (
          <div style={styles.conetnt}> {this.props.children} </div>
          ); /
          if(!this.props.isAuthicated)
            {*/
          let divStyle; 
          let drawer; 
           if(this.props.isAuthicated) 
           {
                   divStyle = (
                <Aux>
                  {/*
                   <div className={classes.sidebar} > <Menus is_admin={this.props.is_admin} clicked={this.menuClickHanlder} selectIndex={this.state.selectedIndex} /> </div>
                  <div className={classes.rightContent}> {this.props.children} </div>
                   */}
                   <div className="sidebar" > <Menus is_admin={this.props.is_admin} clicked={this.menuClickHanlder} selectIndex={this.state.selectedIndex} /> </div>
                  <div className="rightContent"> {this.props.children} </div>
                </Aux> 
              );
              drawer= <Drawer state={this.state.open}  is_admin={this.props.is_admin} clicked={this.SidebarclosedHandler} menuClicked={this.Sidebarclosed}/>
           }
          else
          {
                divStyle = (
                <Aux>
                  <div className="rightContent"> {this.props.children} </div>
                </Aux> 
              );
              drawer='';
          } 
             
           // }
           //quantity,stock_status_id=6,status=1

          return(
              <Aux>
              <AppBar 
             
              onLeftIconButtonClick={this.handleToggle} 
              title="Inmonarch"
              iconClassNameRight="muidocs-icon-navigation-expand-more">
              {drawer}
                 <Navigations isAuth={this.props.isAuthicated} is_admin={this.props.is_admin}/>
                </AppBar>  
                <main>
                   {divStyle}
                 
                </main>
                
               </Aux>   
           );
      }
}

const mapStateToProps = state=>{
 
    return {
        isAuthicated:state.auth.token !== null,
        is_admin:state.auth.is_admin
    }
}
export default connect(mapStateToProps)(Layout);