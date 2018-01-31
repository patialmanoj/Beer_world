import React  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import *  as Constants from '../common/constant';
import toastr from 'toastr';

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
            toastr.warning("Data not fetched correctly");
        });

    
    }
    render() {
      let html = "";
      let responseInfo = "";
      if( this.state.data!= null && this.state.data.length == 0){
        html = <div>........Beer Data Fetching In Progress.............. </div>
            
      }else{
        responseInfo = this.state.data;
            html =  <div id="displayBeer">
                    <h1>All Detail of Beer</h1>
                    <span>Beer Name</span>
                    <div className ="borderBox marginLeft2" >{responseInfo.data.nameDisplay}</div>
                    <div className = "descriptionBox">{responseInfo.data.description}</div>
                    <span>Style Name</span>
                    <div className ="borderBox marginTop2 marginLeft2" >{responseInfo.data.style.name}</div>
                    <div className = "descriptionBox">{responseInfo.data.style.description}</div>
                    </div>
        }

      
      return (
        <div>
           {html}
        </div>
      );
    }
  }



  export default BeerDetailPage;