import React,{PropTypes} from 'react';
import {Link} from 'react-router';

const KeyValueDisplay = ({name,value}) => {
    return(
        <div className ="key_value_display">
            <div > {name} </div> 
            <b className="separatoor">|</b>
            <div className ="borderBox marginLeft2" >{value}</div>
        </div>
     )

}
export default KeyValueDisplay;