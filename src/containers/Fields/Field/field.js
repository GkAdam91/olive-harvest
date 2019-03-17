import React, { Component } from 'react';
import classes from './field.module.css'
import Button from '../../../components/UI/Button/Button';

class Field extends Component {
  state = {
    showDeleteButton: false,
    showEditButton: false,
    showHarvestsButton: false,
    showAddHarvestButton: false,
    selected: false,
    showHarvests: false
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

  toggleHarvests = () => {
    this.setState({
      showHarvests: !this.state.showHarvests
    });
  }

  render() {

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
    //TODO push each tree value alone
    fieldData.push({name: trees[0].name, value: trees[0].value});
    fieldData.push({name: trees[1].name, value: trees[1].value});
    fieldData.push({name: trees[2].name, value: trees[2].value});

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
      harvestsButton = <Button btnType='Success' clicked={this.toggleHarvests}>Harvests</Button>;

    let addHarvestButton = null;
    if (this.state.showAddHarvestButton)
      addHarvestButton = <Button btnType='Success' clicked={this.props.clickedAddHarvest}>Add new Harvest</Button>;

    let harvests = null;
    if(this.state.showHarvests)
      harvests = this.props.harvests;

    return (
      <div className={classes.field}>
        <p
          onClick={this.toggleShow}
        >{fieldOutput}</p>
         {deleteButton} {harvestsButton} {addHarvestButton}
        {harvests}
      </div>
    )
  }
}
export default Field
