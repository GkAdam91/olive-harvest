import React, { Component } from 'react'
import Confirm from '../UI/Confirm/Confirm';
export class WelcomePage extends Component {
  launch = () => {
    console.log('clicked Yes')
  }
  
  render() {
    return (
      <div>
        Welcome
        Select option
        <Confirm title='Test' description='Test Confirmation'>
          {confirm => (
            <button onClick={confirm(this.launch)}>Launch!</button>
          )}
        </Confirm>
      </div>
    )
  }
}

export default WelcomePage
