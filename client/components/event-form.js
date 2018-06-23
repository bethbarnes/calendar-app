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

  handleAddEventClick = (event) => {
    console.log('clicked add event')
    this.setState({
      addButtonClicked: !this.state.addButtonClicked
    })
  }


  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // axios.post(`/api/products/${body.productId}/review`, body)
  // .then(res => dispatch(reviewAction(res.data)))


  handleAddFormSubmit = (event) => {
    event.preventDefault()
    let startHour = this.state.startTime.slice(0,2)
    let startMin = this.state.startTime.slice(3,5)
    let endHour = this.state.endTime.slice(0,2)
    let endMin = this.state.endTime.slice(3,5)
    console.log('start time' , startHour, startMin)
    let start = this.props.currentDate.hour(startHour).minute(startMin)
    console.log('start total', start)
    // let end = this.props.currentDate
    let newEvent = {
      title: this.state.title,
      description: this.state.description,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    }
    console.log('submitting: ', newEvent)
    axios.post('api/events', newEvent).then(res => console.log(res.data))
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
          <input onChange={this.handleChange}type="text" name="title"/>
          <br/>
          Description:
          <br/>
          <input onChange={this.handleChange} type="text" name="description"/>
          <br/>
          Start Time:
          <br/>
          <input onChange={this.handleChange} type="time" name="startTime"/>
          <br/>
          End Time:
          <br/>
          <input onChange={this.handleChange} type="time" name="endTime"/>
          <button type="submit">submit</button>
        </form>


        :
        <div/>}

        </div>
    )
  }

}


export default connect(null, null)(EventForm)
