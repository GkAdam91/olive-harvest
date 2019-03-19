import React, { Component } from 'react'
import axios from '../../../axios-orders';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import  'react-table/react-table.css';


class OliveOilHarvest extends Component {
  
 

  render() {
    let harvests = null;
    if (this.props.harvests !== undefined) {
      harvests = this.props.harvests.filter(harvest => {
        if (harvest.harvestData.fieldName === this.props.fieldNameToShow) {
          return harvest;
        }
        else {
          return null
        }
      }
      )

      const columns = [
        {
          Header: 'Field Name',
          accessor: 'harvestData[fieldName]'
        }, {
          Header: 'Date',
          accessor: 'harvestData[harvestDate]'
        }, {
          Header: 'Sakia',
          accessor: 'harvestData[sakia]'
        }, {
          Header: 'Sakia Type',
          accessor: 'harvestData[sakiaType]'
        }, {
          Header: 'id',
          accessor: 'id',
          show: false
        }
      ];

      const onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)
            }
        }
    }
      return (

        <ReactTable
          className="-striped -highlight"
          data={harvests}
          columns={columns}
          defaultPageSize={harvests.length}
          showPagination={false}
          getTdProps={onRowClick}
        >
        </ReactTable>

      )
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    harvests: state.harvests.harvests,
    loading: state.harvests.loading,
    // token: state.auth.token,
    // userId: state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchHarvests: (fieldName) => dispatch(actions.fetchHarvests(fieldName)),
    onDeleteField: (data) => dispatch(actions.deleteField(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OliveOilHarvest, axios));
