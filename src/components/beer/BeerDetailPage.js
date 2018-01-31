import React  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import *  as Constants from '../common/constant';
import toastr from 'toastr';
import BeerContent from '../beer/ContentBeer'
  class BeerDetailPage extends React.Component {


    constructor(props,context){
        super(props,context);
        this.state =
            {
                data: []
            };
      
    }
    componentDidMount() {
        //console.log(' id gonna fetch .' +this.props.params.id);
        let request = new Request( Constants.URL+'beerapi/beer/'+this.props.params.id, {
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
            //alert(err+ " :: Server is not in ready state");
            toastr.warning(err+ " :: Server is not in ready state");
        })
        .then(function(response) {
            let responseData = JSON.parse(response);
            this.setState({ data: responseData});
        }.bind(this))
        .catch(function(err){
           // console.log(err);
            toastr.warning(" !! Data not fetched correctly");
        });

    
    }
    randomImagesOfbeer(){
        let arrayOfImages = ["https://www.pexels.com/photo/drink-beer-cheers-toast-8859/","https://www.pexels.com/photo/bintang-green-glass-bottle-beside-clear-shot-glass-168989/","https://www.pexels.com/photo/two-corona-extra-and-san-mig-light-beers-on-top-of-brown-wooden-plank-near-beach-767239/","https://www.pexels.com/photo/food-alcohol-beer-foam-7736/","https://www.pexels.com/photo/alcoholic-beverage-beach-beer-blur-611315/","https://www.pexels.com/photo/greyscale-photogrpah-838673/","https://www.pexels.com/photo/cold-beer-drops-bottle-8840/"];
        return arrayOfImages[Math.floor(Math.random() * 7)];
    }
    render() {
      let html = "";
      let responseInfo = "";
      if( this.state.data!= null && this.state.data.length == 0){
        html = <div className="loading_message "> Beer Data Fetching In Progress...... 
                  <div className ="loading_spinner"></div>
               </div>
            
      }else{
        responseInfo = this.state.data;
            if(responseInfo != null){
             responseInfo.data.nameDisplay =  (responseInfo.data.nameDisplay != null) ? responseInfo.data.nameDisplay : "Name not present" ;
             responseInfo.data.description =  (responseInfo.data.description != null) ? responseInfo.data.description : "Description not present" ;
             responseInfo.data.labels = (responseInfo.data.labels != null)? responseInfo.data.labels: {large: null};
             responseInfo.data.labels.large = (responseInfo.data.labels.large != null) ?responseInfo.data.labels.large: this.randomImagesOfbeer();
              if(responseInfo.data.style == null){
                responseInfo.data.style= {};
                responseInfo.data.style.abvMax = "N/A"; 
                responseInfo.data.style.abvMin = "N/A";
                responseInfo.data.style.fgMax  = "N/A";
                responseInfo.data.stylef.gMin  = "N/A";
              }

             html =  <div id="displayBeer" className="details_container ">
                         <BeerContent beer={responseInfo}/>
                        </div>
            }
            else{
                toastr.warning("Data is properly fetched");
                html = <div>Data is properly fetched !! Please Refresh the page.</div>
            }
        }

      
      return (
        <div>
           {html}
        </div>
      );
    }
  }



  export default BeerDetailPage;