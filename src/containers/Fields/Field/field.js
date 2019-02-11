import React, { Component } from 'react';
import classes from './field.css'
import Button from '../../../components/UI/Button/Button';

class Field extends Component {
  state = {
    showDeleteButton: false
  }

  toggleShowDelete = () => {
    this.setState((prevState) => {
      return { showDeleteButton: !prevState.showDeleteButton };
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
      deleteButton = <Button btnType='Danger' style='float: right' clicked={this.props.clickedDelete}>Delete</Button>;
    return (
      <div className={classes.field}>
        <p onClick={this.toggleShowDelete}>Field: {fieldOutput} {deleteButton}</p>
      </div>
    )
  }
}
export default Field
