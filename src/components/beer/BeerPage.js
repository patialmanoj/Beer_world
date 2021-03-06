import React  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { prototype } from 'stream';
import {bindActionCreators} from 'redux';//save us from manually wrap our action creator in a dispatch call 
import BeerTable  from './DisplayBeerTable';
import *  as Constants from '../common/constant';
import toastr from 'toastr';
//import { arrayExpression } from './C:/Users/hp/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/babel-types';
const beers = [];
  
class BeerPage extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state= {
            data: [],
            searchKeyword :"",
            searchedData : null
            
        }
        this.onSuccessMassagetheData = this.onSuccessMassagetheData.bind(this);
        this.fetchTextBoxValue = this.fetchTextBoxValue.bind(this);
        this.searchDataFromServer = this.searchDataFromServer.bind(this);
        this.randomImagesOfbeer = this.randomImagesOfbeer.bind(this);
    }
    randomImagesOfbeer(){
        let arrayOfImages = ["https://www.pexels.com/photo/drink-beer-cheers-toast-8859/","https://www.pexels.com/photo/bintang-green-glass-bottle-beside-clear-shot-glass-168989/","https://www.pexels.com/photo/two-corona-extra-and-san-mig-light-beers-on-top-of-brown-wooden-plank-near-beach-767239/","https://www.pexels.com/photo/food-alcohol-beer-foam-7736/","https://www.pexels.com/photo/alcoholic-beverage-beach-beer-blur-611315/","https://www.pexels.com/photo/greyscale-photogrpah-838673/","https://www.pexels.com/photo/cold-beer-drops-bottle-8840/"];
        return arrayOfImages[Math.floor(Math.random() * 7)];
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
                                              newobj.origin = (ob.style!= null)? ob.style.category!= null ?ob.style.category.name:"Not Available": "Not Available"; 
                                              newobj.glassName = (ob.glass!= null)?ob.glass.name:"Not Available";
                                             // newobj.labels =  (ob.labels != null)? (ob.labels.icon != null) ?ob.labels.icon.large:this.randomImagesOfbeer() :this.randomImagesOfbeer();
                                              return newobj;
                                            } );

            }else{
                toastr.warning("OOPS !! bad response fetched from server");
            }

        }
        else{
            toastr.warning(" OOPS!! Server did not returned data ");
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
            toastr.warning(err+ " :: Server is not in ready state");
        })
        .then(function(response) {
            let responseData = JSON.parse(response);
            let massagedData = [];
            massagedData=  this.onSuccessMassagetheData(responseData);
            if(massagedData.length > 0)
                this.setState({ data: massagedData});
            else
                toastr.warning(" !! No Data Present For Beers");
        }.bind(this))
        .catch(function(err){
            toastr.warning(err);
        });

    
    }

    fetchTextBoxValue(event){
        this.setState({searchKeyword : event.target.value})
    }
    searchDataFromServer(){
        let keyWord =  this.state.searchKeyword;
        toastr.info( keyWord, "Search is in progress for");
        
        let request = new Request( Constants.URL+'beerapi/beer?query='+keyWord+ "&type=beer" , {
            method :'get',
            mode: 'cors',
            origin: Constants.URL,
            headers: new Headers({
                'Content-Type':  "text/json"
              })
            
          });
        fetch(request).then(function(response) {
            return response.json()
            })
            .catch(function(err){
                //alert(err+ " :: Server is not in ready state");
                toastr.warning(err+ " :: Server is not in ready state !! Please restart the server");
            })
            .then(function(response) {
                let responseData = JSON.parse(response);
                if(responseData.data != null){
                    let massagedData =  this.onSuccessMassagetheData(responseData);
                    this.setState({ searchedData : responseData});
                    this.setState({ data : massagedData}); // changing the data of table
                }
                else{
                    toastr.warning("Data Not found !! "); 

                }

            }.bind(this))
            .catch(function(err){
                toastr.warning("Data not fetched correctly !! Please Refresh the Page");
            });

    }
    render(){
        let table  =  <div className="loading_message "> Loading Data ..... 
                            <div className ="loading_spinner"></div>
                      </div>
        if(this.state.data.length != 0){
            table =  <BeerTable data = { this.state.data }/>
        }
        return(
            <div>
                <div className="beer_title">Let's Find The Beer</div>
                <div className ="b_searchBox">
                    <input  placeholderText = "Please Enter Here"  onChange= {this.fetchTextBoxValue} className = "inp_searchBox"type="text"/>
                    <button className = "btn_searchBox"  onClick = {this.searchDataFromServer} type ="submit">Search</button>
                </div>
                {table}
            </div>
        );
    }
}

BeerPage.propTypes = { 
    beers: PropTypes.array.isRequired
   };

export default BeerPage; // wraps courese page