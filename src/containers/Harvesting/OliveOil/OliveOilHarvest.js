import React, { Component } from 'react'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import classes from 'react-table/react-table.css';

export class OliveOilHarvest extends Component {

  render() {
    let harvests = null;
    if (!this.props.loading) {
      // console.log(this.props.harvests)
      harvests = this.props.harvests.filter(harvest => {
        if (harvest.harvestData.fieldName === this.props.fieldNameToShow) {
          return harvest;
        }
        else {
          return null
        }
      }
      )
    };

    if (!this.props.loading) {
      console.log('Fetched: ', this.props.harvests);
      console.log('data: ', harvests);

      const columns = [{
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
      }]

      return (

        <ReactTable
          filterable
          className={classes.ReactTable}
          data={harvests}
          columns={columns}
          defaultPageSize={3}
          pageSizeOptions={[3, 6]}
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
