import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { addEvent } from '../store'
var moment = require('moment');
moment().format();

// TODO: change handlesubmit and initial state??
//also delete those other two files I made


// Add and edit event will need to trigger change to store, singleboxes in
//calendar will get new props from mapStateToProps, need to be listening for
//new props: if new, will rerender that box


class EventForm extends Component {
  constructor(props) {
    super(props)
    if(this.props.type==="edit"){
      this.state = {
        addButtonClicked: false,
        title: event.target.value ||this.props.currentEvent.title,
        description: event.target.value|| this.props.currentEvent.description,
        startTime: event.target.value ||this.props.currentEvent.startTime,
        endTime: event.target.value|| this.props.currentEvent.endTime,
      }
    }else {
      this.state = {
        addButtonClicked: false,
        title: '' ,
        description:  '',
        startTime: null,
        endTime: null,
      }
    }

  }

  handleAddEventClick = event => {
    this.setState({
      addButtonClicked: !this.state.addButtonClicked
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  parseTime = () => {
    let startHour = this.state.startTime.slice(0, 2)
    let startMin = this.state.startTime.slice(3, 5)
    let endHour = this.state.endTime.slice(0, 2)
    let endMin = this.state.endTime.slice(3, 5)
    let start = this.props.currentDate.clone().hour(startHour).minute(startMin)
    let end = this.props.currentDate.clone().hour(endHour).minute(endMin)

    let newEvent = {
      title: this.state.title,
      description: this.state.description,
      startTime: start,
      endTime: end,
      month: start.month(),
      date: start.date(),
      year: start.year()
    }
    return newEvent
  }

  handleEditFormSubmit = event => {
    event.preventDefault()
    let editId = +event.target.id
    let newEvent = {
      title: this.state.title,
      description: this.state.description,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    }
    axios.put(`api/events/${editId}`, newEvent)
  }

  handleAddFormSubmit = event => {
    event.preventDefault()
    let newEvent = this.parseTime()

    // axios.post('api/events', newEvent).then(res => console.log(res.data))

    this.props.addEvent(newEvent)

    this.setState({
      addButtonClicked: false,
      title: '',
      description: '',
      startTime: null,
      endTime: null,
    })

  }
  // maybe the button should be in the other component and render this form component if clicked

  render() {
    console.log('PROPS', this.props)
    console.log('this form will: ', this.props.type)
    console.log('forms current state:', this.state)
    let formType = this.props.type
    return (
      <div>
        <button
          type="button"
          onClick={this.handleAddEventClick}>
          {this.props.type} event
        </button>

        {this.state.addButtonClicked ?
          <form
            id={formType==="edit" ? this.props.currentEvent.id: null}
            onSubmit={formType === "add"
            ? this.handleAddFormSubmit
            : this.handleEditFormSubmit}>
            Event Title:
          <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              required={formType==="add"}
              />
          <br />
            Description:
          <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
              required={formType==="add"}
              />
          <br />
            Start Time:
          <br />
            <input
              onChange={this.handleChange}
              type="time"
              name="startTime"
              required={formType==="add"}
              />
          <br />
            End Time:
          <br />
            <input
            onChange={this.handleChange}
            type="time"
            name="endTime"
            required={formType==="add"}
            />

          <button
            type="submit">
            submit
          </button>

          </form>
          :
          <div />}
      </div>
    )
  }

}


const mapDispatch = (dispatch) => ({
  addEvent: (newMoment) => {
      dispatch(addEvent(newMoment))
  },
})

const mapState = (state) => ({
  selectedDate: state.event.selectedDate,
  selectedMoment: state.event.selectedMoment
})

export default connect(mapState, mapDispatch)(EventForm)
