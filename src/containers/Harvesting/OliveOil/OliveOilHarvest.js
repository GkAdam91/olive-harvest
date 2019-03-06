import React, { Component } from 'react'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import classes from 'react-table/react-table.css';

export class OliveOilHarvest extends Component {

  componentDidMount() {
    this.props.onFetchHarvests(this.props.fieldName);
  }

  render() {
    let harvests = <Spinner />;
    if (!this.props.loading) {
      console.log(this.props.harvests)
      harvests = this.props.harvests.map(harvest => (
        <p>
          {harvest.harvestData.fieldName} {harvest.harvestData.harvestDate} {harvest.harvestData.sakia} {harvest.harvestData.sakiaType}
        </p>
      ))
    };

    const data = [{
      name: 'Roy Agasthyan',
      age: 26
    }, {
      name: 'Sam Thomason',
      age: 22
    }, {
      name: 'Michael Jackson',
      age: 36
    }, {
      name: 'Samuel Roy',
      age: 56
    }, {
      name: 'Rima Soy',
      age: 28
    }, {
      name: 'Suzi Eliamma',
      age: 28
    }]

    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Age',
      accessor: 'age'
    }]

    return (

      <ReactTable
        filterable
        className={classes.ReactTable}
        data={data}
        columns={columns}
        defaultPageSize={3}
        pageSizeOptions={[3, 6]}
      >
      </ReactTable>

    )
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
