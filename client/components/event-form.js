import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { addEvent, editEvent} from '../store'
var moment = require('moment');
moment().format();

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
    let start = this.props.selectedMoment.clone().hour(startHour).minute(startMin)
    let end = this.props.selectedMoment.clone().hour(endHour).minute(endMin)

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
    this.props.editEvent(newEvent, editId)
    this.clearState()

  }

  handleAddFormSubmit = event => {
    event.preventDefault()
    let newEvent = this.parseTime()

    this.props.addEvent(newEvent)

    this.clearState()

  }

  clearState = () => {
    this.setState({
      addButtonClicked: false,
      title: '',
      description: '',
      startTime: null,
      endTime: null,
    })
  }

  render() {

    let formType = this.props.type
    return (
      <div>
        <i
        className={formType === 'edit' ? "edit fas fa-edit grow" : "add far fa-plus-square grow"}
        onClick={this.handleAddEventClick}/>

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
  addEvent: (newEvent) => {
     dispatch(addEvent(newEvent))
  },
  editEvent: (editedEvent, id) => {
    console.log('in the dispatching edite')
    dispatch(editEvent(editedEvent, id))
}
})

const mapState = (state) => ({
  selectedDate: state.event.selectedDate,
  selectedMoment: state.event.selectedMoment
})

export default connect(mapState, mapDispatch)(EventForm)
