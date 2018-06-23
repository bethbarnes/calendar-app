import React, { Component } from 'react'
import {connect} from 'react-redux'
var moment = require('moment');
moment().format();


class EventForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      addButtonClicked: false
    }
  }

  handleAddEventClick = (event) => {
    console.log('clicked add event')
    this.setState({
      addButtonClicked: true
    })
  }

  // maybe the button should be in the other component and render this form component if clicked

  render(){
    return (
      <div>
        <button onClick={this.handleAddEventClick}>
        add event
        </button>
        {this.state.addButtonClicked ?
        <form>
          <label>
            New Event:
          </label>
          Event Title:
          <input type="text" name="title"/>
          Description:
          <input type="text" name="description"/>
          {/* start time end time */}

        </form>


        :
        <div/>}

        </div>
    )
  }

}


export default connect(null, null)(EventForm)
