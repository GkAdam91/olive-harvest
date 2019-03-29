import React, { Component } from 'react'
import axios from '../../../axios-orders';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import 'react-table/react-table.css';

import Button from '../../../components/UI/Button/Button';
import { Translate } from 'react-localize-redux';


class OliveOilHarvest extends Component {
 
  render() {
    console.log('this.props:', this.props);
    let selId = null;
    let harvests = null;
    if (this.props.harvests !== undefined) {
      harvests = this.props.harvests.filter(harvest => {
        if (harvest.harvestData.fieldName === this.props.fieldNameToShow) {
          harvest.selected = false;
          return harvest;
        }
        else {
          return null
        }
      }
      )

      console.log('harvests:', harvests);
      const columns = [
        {
          Header: <Translate id="fieldName" />,
          accessor: 'harvestData[fieldName]',
          Footer: (<>
          <Button btnType='Success' clicked={() => this.props.clickedEditHarvest(selId)}><Translate id="edit" /></Button>
          <Button btnType='Danger' clicked={() => this.props.clickedDeleteHarvest(selId)} ><Translate id="delete" /></Button>
          </>)
        }, {
          Header: <Translate id="date" />,
          accessor: 'harvestData[harvestDate]'
        }, {
          Header: <Translate id="sakia" />,
          accessor: 'harvestData[sakia]'
        }, {
          Header: <Translate id="sakiaType" />,
          accessor: 'harvestData[sakiaType]'
        }, {
          Header: 'id',
          accessor: 'id',
          show: false
        }
      ];

      const highlightRow = (id) => {
        let idx;
        for (idx in harvests) {
          if (harvests[idx]['id'] === id) {
            harvests[idx].selected = !harvests[idx].selected;
            // this.props.harvestId = id;
            selId = id;
          }
          else {
            harvests[idx].selected = false;
          }
        }
      }

      const onRowClick = (state, rowInfo, column, instance) => {
        return {
          onClick: e => {
            // console.log(' this.state:', state)
            // // console.log('A Td Element was clicked!')
            // // console.log('it produced this event:', e)
            // console.log('It was in this column:', column)
            // console.log('It was in this row:', rowInfo)
            // // console.log('It was in this table instance:', instance)
            // console.log('column.id:', column.id);
            // console.log('column.selected:', column.selected);
            // console.log('rowInfo.original.id:', rowInfo.original.id);
            // console.log('rowInfo.index:', rowInfo.index);

            highlightRow(rowInfo.original.id);

            instance.forceUpdate();

          },
          style: {
            background:
              rowInfo.original.selected === true ? "#00afec" : "white",
            color:
              rowInfo.original.selected === true ? "white" : "black"
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
    onDeleteField: (data) => dispatch(actions.deleteField(data)),
    onDeleteHarvest: (id) => dispatch(actions.deleteHarvest(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OliveOilHarvest, axios));
