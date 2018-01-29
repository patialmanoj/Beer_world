
import React  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { prototype } from 'stream';
import {bindActionCreators} from 'redux';//save us from manually wrap our action creator in a dispatch call 
import BeerTable  from './DisplayBeerTable';
import *  as Constants from '../common/constant';


const beers = [
    {
      id: "react-flux-building-applications",
      title: "Heineken",
      watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
      cost: "$123",
      origin: "Italy",
      description: "Its awesome and healthy"
    },
    {
      id: "clean-code",
      title: "Budweiser",
      watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
      cost: "$344",
      origin: "Spain",
      description: "Its awesome and healthy"
    },
    {
      id: "architecture",
      title: "Guinness",
      watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
      cost: "$212",
      origin: "England",
      description: "Its awesome and healthy"
    },
    {
      id: "career-reboot-for-developer-mind",
      title: "Carlsberg",
      watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
      cost: "$324",
      origin: "India",
      description: "Its awesome and healthy"
    },
    {
      id: "web-components-shadow-dom",
      title: "Miller Lite",
      watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
      cost: "$234",
      origin: "Germany",
      description: "Its awesome and healthy"
    }
  ];
  
class BeerPage extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state= {
            data: []
            
        }
        this.onSuccessMassagetheData = this.onSuccessMassagetheData.bind(this);
    }
    onSuccessMassagetheData(response){
        let massagedData = [];
        if(response != undefined && response!= null){
            if(response.status.toLowerCase() === 'success')
            {
                massagedData = response.data;
                massagedData =   massagedData.map( ob =>  { let newobj = {} ; 
                                              newobj.id = ob.id; 
                                              newobj.nameDisplay = ob.nameDisplay;
                                              newobj.isOrganic = ob.isOrganic === "N" ? "No" : "Yes" ;
                                              newobj.statusDisplay = ob.statusDisplay;
                                              newobj.createDate= ob.createDate;
                                              newobj.origin = ob.style.category.name; 
                                              newobj.glassName = ob.glass.name;
                                            
                                              return newobj;
                                            } );

            }else{
                alert("OOPS !! bad response fetched from server");
            }

        }
        else{
            alert(" OOPS!! Server did not returned data ");
        }

        return massagedData;
    }
    componentDidMount() {
        console.log('Child did mount.');
        let request = new Request( Constants.URL+'beerapi/beer', {
        method :'get',
        mode: 'cors',
        origin: Constants.URL,
        headers: new Headers({
            'Content-Type':  "text/plain"
          })
        
      });

    
    
    fetch(request).then(function(response) {
        return response.json()
        })
        .catch(function(err){
            alert(err+ " :: Server is not in ready state");
        })
        .then(function(response) {
            let responseData = JSON.parse(response);
            let massagedData = [];
            massagedData=  this.onSuccessMassagetheData(responseData);
            this.setState({ data: massagedData});
        }.bind(this))
        .catch(function(err){
            console.log(err);
        });

    
}
    

    render(){
        let table  = <div>Table Loading .......................</div>
        if(this.state.data.length != 0){
            table =  <BeerTable data = { this.state.data }/>
        }
        return(
            <div>
                <h1>Beers</h1>
                {table}
                {/* <BeerTable /> */}
            </div>
        );
    }
}

BeerPage.propTypes = { 
    beers: PropTypes.array.isRequired
   };

export default BeerPage; // wraps courese page