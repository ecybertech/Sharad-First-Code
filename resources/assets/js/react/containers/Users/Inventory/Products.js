import React,{Component} from 'react';
import UItables from '../../../components/UI/Tables/Tables';
import Modal from '../../../components/UI/Modal/Modal';
import SelectBox from '../../../components/UI/SelectBox/SelectBox';
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import HeadTitle from '../../../components/Common/Headtitle';
import { ValidatorForm } from 'react-material-ui-form-validator';
class Products extends Component {
  
    state = {
       'coloums':{
     
       'product_name':'Name',
       'product_sku':'Sku',
       'brand':'Brand',
       'optiontype_group':'Option Type',
       'department':'department',
      },
      wrapperId:0,
      showcheckbox:false,
      showModal:false,
      openModalBox:false,
      DeleteId:null,
      products:[],
      clientwrappers:[],
      values: [],
      wrappers:[],
      Msg:''
      
};
componentDidMount (){
   
   this.props.onFetchClientproducts(this.props.token,this.props.site_id);
   this.props.onFetchClientwrapper(this.props.token,this.props.site_id);
}
static getDerivedStateFromProps(nextProps, prevState) {
  
    let clientwrappers  = prevState.clientwrappers;
    let products  = prevState.products;
    let values  = prevState.values;
    if(nextProps.clientwrappers!=prevState.clientwrappers)
       { clientwrappers=  nextProps.clientwrappers;
       }
       if(nextProps.values!=prevState.values)
       { values=  nextProps.values;}
       if(nextProps.products!=prevState.products)
       { products=  nextProps.products;}

     return {
        clientwrappers:clientwrappers,
        values:values,
        products:products
     }
}
deleteIconClicked = (id) => {
this.setState({showModal:true,openModalBox: false,DeleteId:id});
}
handleModalboxCloseButton = () => {

this.setState({showModal:true,openModalBox: true});
};

handleModalboxSubmitButton = (deleteId) => {

this.props.onCategoryDelete(deleteId,this.props.token,this.props.site_id);
this.setState({showModal:true,openModalBox: true});

};
handleChange = (event, index, values) => 
{
   
    this.setState({values});
}
onSubmit = (e) => {
    e.preventDefault()
    const products =  this.state.products;
    const wrappers  = this.state.values;
    let productsId=[];
    Object.keys(products).map(key => 
        productsId.push(products[key].id)
    );
  
 if(wrappers === undefined )
 {
    const Message='Please select atleast one wrapper';
    this.setState({'Msg':Message});
    return false;
 }
else
{
    const Message='';
    this.setState({'Msg':Message});
} 
 
  /*
   if(wrappers.length == 0)
     {
        const Message='Please select atleast one wrapper';
        this.setState({'Msg':Message});
         return false;
     }
  */
    if(productsId.length > 0 )
    {
        const siteData={
            wrappers:wrappers,
            productId:productsId,
            siteId:this.props.site_id
        }
       this.props.onProductSubmitWrapper(siteData,this.props.token);
    }
}  

render(){
    const wappersList =this.state.clientwrappers;  
  
    let wrappers=this.state.wrappers;  
    {
        Object.keys(wappersList).map(key => 
            wrappers[wappersList[key].id] =  wappersList[key].wrappername 
        );
    }
    //const values = this.state.value;
   
    let tables = <Spinner/>;
    if(!this.props.loading)
      {tables = <UItables theadRow={this.state.coloums} showCheckbox={this.state.showcheckbox} siteUrl='/users/edit/' tbody={this.props.products} ondeleteClicked ={this.deleteIconClicked} editClicked={this.editIconClick}/>}
     let modal='';
     if(this.state.showModal)
       { modal=<Modal title="Are you sure you want to Delete Product ?"  DeleteId={this.state.DeleteId} open={!this.state.openModalBox} closedModalbox={this.handleModalboxCloseButton} submitModalbox={this.handleModalboxSubmitButton}/> } 


   return(
        <div className="container">
        <HeadTitle title='Your Products List'/>
        <div className="divCls">
           <p style={{color:'red'}}> {this.state.Msg} </p>
        <form
                ref="form"
                onSubmit={this.onSubmit}
                onError={errors => console.log(errors)}
                style={{width:'100%'}}
            > 
          <SelectBox handleChange={this.handleChange}   name={wrappers} values={this.state.values}/>
          <RaisedButton type='submit' label="Sync" primary />
       </form>   
        </div>
        {tables}
        {modal} 
        </div>    
     );
 }
}
const mapStateToProps = state =>{
   
return{
    products:state.products.products,
   loading:state.products.loading,
   isAuthicated:state.auth.token !== null,
   token:state.auth.token,
   site_id:state.auth.site_id,
   clientwrappers:state.clientwrappers.clientwrappers,
}
}

const mapDispatchToProps = dispatch =>{
            return {
            onFetchClientproducts: (token,siteid)=>dispatch(actions.fetchProducts(token,siteid)),
            onProductsDelete: (id,token,siteid)=>dispatch(actions.deleteProduct(id,token,siteid)), 
            onFetchClientwrapper: (token,siteid)=>dispatch(actions.fetchClientwrappers(token,siteid)),
            onProductSubmitWrapper: (wrapperIds,token)=>dispatch(actions.submitProductsonwrappers(wrapperIds,token)),
            }
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);
//export default Products;