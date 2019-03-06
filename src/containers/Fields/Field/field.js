import React, { Component } from 'react';
import classes from './field.module.css'
import Button from '../../../components/UI/Button/Button';

class Field extends Component {
  state = {
    showDeleteButton: false,
    showEditButton: false,
    showHarvestsButton: false,
    showAddHarvestButton: false,
    selected: false
  }

  toggleShow = () => {
    this.setState({
      showDeleteButton: !this.state.showDeleteButton,
      showEditButton: !this.state.showEditButton,
      showHarvestsButton: !this.state.showHarvestsButton,
      showAddHarvestButton: !this.state.showAddHarvestButton,
      selected: !this.state.selected
    });
  }

  render() {
    // console.log('props:', this.props)

    const fieldData = [];
    let trees = [];
    for (let field in this.props.fieldData) {
      if (field === 'Trees') {
        for (let tr in this.props.fieldData[field]) {
          trees.push({
            name: tr,
            value: this.props.fieldData[field][tr]
          })
        }
      }
      else {
        fieldData.push({
          name: field,
          value: this.props.fieldData[field]
        });
      }
    }
    //fieldData.push({name: 'trees', value: trees});
    // console.log('fieldData:', fieldData)
    const fieldOutput = fieldData.map(fi => {
      return <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
        key={fi.name}>{fi.value} </span>;
    });
    let deleteButton = null;
    if (this.state.showDeleteButton)
      deleteButton = <Button btnType='Danger' clicked={this.props.clickedDelete}>Delete</Button>;

    let harvestsButton = null;
    if (this.state.showHarvestsButton)
      harvestsButton = <Button btnType='Success' clicked={this.props.clickedHarvests}>Harvests</Button>;

    let addHarvestButton = null;
    if (this.state.showAddHarvestButton)
      addHarvestButton = <Button btnType='Success' clicked={this.props.clickedAddHarvest}>Add new Harvest</Button>;

    return (
      <div className={classes.field}>
        <p
          onClick={this.toggleShow}
        >Field: {fieldOutput} {deleteButton} {harvestsButton} {addHarvestButton}</p>
      </div>
    )
  }
}
export default Field
