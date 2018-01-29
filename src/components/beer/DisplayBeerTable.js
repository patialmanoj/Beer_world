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
      const {data} = this.props;
      return (
        <div className="width120"> 
        <ReactTable
          data={data}
          filterable= { true}
          columns={[
            
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
          defaultPageSize={10}
          className="-striped -highlight"
        
          getTdProps={(state, rowInfo, column, instance) => {
            return {
           
              onClick: (e, handleOriginal) => {
                // console.log('A Td Element was clicked!')
                // console.log('it produced this event:', e)
                // console.log('It was in this column:', column)
                // console.log('It was in this row:', rowInfo)
               
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
//   DisplayBeerTable.propTypes = { 
//     beers: PropTypes.array.isRequired
//    };
DisplayBeerTable

  export default DisplayBeerTable;