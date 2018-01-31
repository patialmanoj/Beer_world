import React,{PropTypes} from 'react';
import {Link} from 'react-router';
const TileDisplay = ({name,value,description}) => {
    return(
        <div className="marginBottom2">
            <span>{name}</span><b className="separatoor">|</b>
            <div className ="borderBox marginLeft2" >{value}</div>
            <div className = "descriptionBox">{description}</div>
        </div>
     )

}

export default TileDisplay;


