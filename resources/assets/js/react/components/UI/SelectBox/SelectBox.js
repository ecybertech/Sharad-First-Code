import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const selectBox = (props) =>{
    console.log(props.values)
    return(
             <SelectField
                        multiple={true}
                        hintText="Select wrapper"
                        value={props.values}
                        onChange={props.handleChange}
                    >
                    <MenuItem value={0} primaryText="Select wrapper"/>
                   
                    {
                       
                       (props.name).map((name,index) => (
                           <MenuItem key={index}
                           insetChildren={true}
                            value={index} checked={props.values && props.values.indexOf(index) > -1} primaryText={name} />
                           )) 
                          
                    }
                   
                    </SelectField>
  
             
     );
}

export default selectBox;