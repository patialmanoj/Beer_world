import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import BeerTile from '../beer/TileDisplay';
import KeyValue from '../beer/KeyValueDisplay';
const ContentBeer = ({beer}) => {
    debugger;
    console.log(beer);
    return(
        <div>
            <div className= "b_searchBox beer_icon" style= {{ backgroundImage: "url("+beer.data.labels.large+")"}}></div>
            <BeerTile name={"Beer Name"} value={beer.data.nameDisplay} description={beer.data.description}/>
            <BeerTile name={"Style Name"} value={beer.data.style.name} description={beer.data.style.description}/>
            <div className ="key_val_container">
            <KeyValue name={"AbvMax"} value= {beer.data.style.abvMax}/>
            <KeyValue name={"AbvMin"} value= {beer.data.style.abvMin}/>
            <KeyValue name={"FgMax"} value= {beer.data.style.fgMax}/>
            <KeyValue name={"FgMin"} value= {beer.data.style.fgMin}/>
            </div>
        </div> 
      
    );
};

ContentBeer.PropTypes = { 
   // course: PropTypes.Object.isRequired
};
export default ContentBeer;