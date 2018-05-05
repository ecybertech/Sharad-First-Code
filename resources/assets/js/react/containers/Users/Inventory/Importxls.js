import React,{Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import HeadTitle from '../../../components/Common/Headtitle';
import XLSX from 'xlsx';
const make_cols = refstr => {
   let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
	for(var i = 0; i < C; ++i) o[i] = {name:XLSX.utils.encode_col(i), key:i}
	return o;
};



class Importxls extends Component{

state={
    data: [], /* Array of Arrays e.g. [["a","b"],[1,2]] */
    cols: [],  /* Array of column objects e.g. { name: "C", K: 2 } */
    submit_after:false
   }

handleChange(selectorFiles)
        {
          
          let   file=selectorFiles[0];
          //  const files = e.target.files;
        //if(files && files[0]) this.props.handleFile(selectorFiles);
       //const  file = selectorFiles[0]; 
      
        const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* Parse data */
            const bstr = e.target.result;
           
			const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, {header:1});
			/* Update state */
			this.setState({ data: data, cols: make_cols(ws['!ref']) });
		};
        if(rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
        
        }
        
onSubmit = (e) => {
           e.preventDefault();
          
      
           const xlsHeader = this.state.data[0];
          //console.log("Length "+this.state.data.length);
           
           const TotalLength=this.state.data.length;
           let data=[];
           let totalArray=[];
           for(let i=0;i<TotalLength;i++)
                {
                   if(i!=0)
                      {
                        var innerObj = {};
                        xlsHeader.map((headerKeys, index, arr) => {
                            innerObj[headerKeys] = this.state.data[i][index];
                        })
                        data.push(innerObj)
                      }
                }
              
            this.props.onProductInventorySubmit(data,this.props.token,this.props.site_id);   
        /*
           return false;
           let newArr = this.state.data.map((val, index, arr) => {
             if(index > 0)
             {
                 console.log(val)
             }
           //return element to new Array
          
         }); */
    }
       
      
     render(){
        let Title="Import Xls";
        let redirect="";
        if(this.props.submit_after)
            { 
            console.log(this.props.submit_after);
            redirect=<Redirect to="/users/products"/>;
            }
        return (
            <div className="container">
            {redirect}  
              <HeadTitle title={Title}/> 
              <Paper className="panel">
              <form onSubmit={this.onSubmit}>
                <div className="divCls">
                <RaisedButton>
                <input type="file"  onChange={ (e) => this.handleChange(e.target.files) } />
                        </RaisedButton>
               </div>
               <div className="divCls"> 
                <RaisedButton type='submit' label="Importxls" primary />
               </div> 
             </form>
             </Paper>    
            </div>
       );
    }
    

} 

const mapStateToProps = state =>{
 
    return {
        
        isAuthicated:state.auth.token !== null,
        token:state.auth.token,
        userId:state.auth.userId,
        site_id:state.auth.site_id,
        seller_id:state.clientwrappers.seller_id,
        mwsAuthToken:state.clientwrappers.mwsauth,
        submit_after: state.productimport.submit_after
        
    }    
}


const mapDispatchToProps = dispatch =>{
     return {
        onProductInventorySubmit:(productdata,token,siteid) => dispatch(actions.ProductInventory(productdata,token,siteid)),
        
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(Importxls);
//export default Importxls;