import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

var moment = require('moment');
moment().format();


class EventForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      addButtonClicked: false,
      title: '',
      description: '',
      startTime: null,
      endTime: null,
    }
  }

  handleAddEventClick = event => {
    console.log('clicked add event')
    this.setState({
      addButtonClicked: !this.state.addButtonClicked
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddFormSubmit = event => {
    event.preventDefault()
    // this.handleAddEventClick()
    let startHour = this.state.startTime.slice(0,2)
    let startMin = this.state.startTime.slice(3,5)
    let endHour = this.state.endTime.slice(0,2)
    let endMin = this.state.endTime.slice(3,5)
    let start = this.props.currentDate.clone().hour(startHour).minute(startMin)
    let end = this.props.currentDate.clone().hour(endHour).minute(endMin)

    let newEvent = {
      title: this.state.title,
      description: this.state.description,
      startTime: start,
      endTime: end
    }

    axios.post('api/events', newEvent).then(res => console.log(res.data))

    this.setState({
      addButtonClicked: false,
      title: '',
      description: '',
      startTime: null,
      endTime: null,
    })

  }
  // maybe the button should be in the other component and render this form component if clicked

  //need to create new moment with same date but different times, then send the entire thing to db

  render(){
    console.log('props currentDate', this.props.currentDate)
    console.log('STATE', this.state)
    return (
      <div>
        <button onClick={this.handleAddEventClick}>
        add event
        </button>
        {this.state.addButtonClicked ?
        <form onSubmit={this.handleAddFormSubmit}>
          <label>
            New Event:
          </label>
          Event Title:
          <br/>
          <input onChange={this.handleChange}type="text" name="title" required/>
          <br/>
          Description:
          <br/>
          <input onChange={this.handleChange} type="text" name="description" required/>
          <br/>
          Start Time:
          <br/>
          <input onChange={this.handleChange} type="time" name="startTime" required/>
          <br/>
          End Time:
          <br/>
          <input onChange={this.handleChange} type="time" name="endTime" required/>
          <button type="submit">submit</button>
        </form>


        :
        <div/>}

        </div>
    )
  }

}


export default connect(null, null)(EventForm)
