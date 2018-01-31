import React  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Link} from 'react-router';

  class DisplayBeerTable extends React.Component {


    constructor(props,context){
        super(props,context);
        this.state = 
            {
            data :  []
        }   
    }
    render() {
      debugger;
      const {data} = this.props;
      return (
        <div className="width120 marginTop2"> 
        <ReactTable
          data={data}
          filterable= { false}
          columns={[
              //  {
              //   Header: "Beer Image",
              //   accessor: "labels",
              //   Cell: props => <div className='cursorPointer bimg' style= {{backgroundImage: "url("+props.value+")"}}></div>
              //   },
                {
                  Header: "Beer ID",
                  accessor: "id",
                  Cell: props => <span className='cursorPointer'><Link to={'/beer/'+props.value}>{props.value}</Link></span>
                },
                {
                  Header: "Beer Name",
                  id: "nameDisplay",
                  accessor: d => d.nameDisplay},
                {
                  Header: "Is Organic",
                  accessor: "isOrganic",
                  filterable: false
                },
                {
                  Header: "Status",
                  accessor: "statusDisplay"
                },
                {
                  Header: "Created Date",
                  accessor: "createDate"
                },
                {
                    Header: "Origin",
                    accessor: "origin"
                  },{
                    Header: "Glass Name",
                    accessor: "glassName"
                  }
              ]
            }
            defaultSorted={[
              {
                id: "nameDisplay",
                desc: true
              }
            ]}
          defaultPageSize={10}
          className="-striped -highlight"
          // getTrProps={(state, rowInfo, column) => {
          //   return {
          //     style: {
          //      height : 100

          //     }
          //   }
          // }}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
           
              onClick: (e, handleOriginal) => {
               
                if (handleOriginal) {
                  handleOriginal()
                }
              }
            }
          }}
        />
      </div>
      );
    }
  }


  export default DisplayBeerTable;