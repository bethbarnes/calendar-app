import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { addEvent, editEvent} from '../store'
var moment = require('moment');
moment().format();

class AddForm extends Component {
  constructor(props) {
    super(props)
      this.state = {
        submitted: false,
        title: '' ,
        description:  '',
        startTime: null,
        endTime: null,
      }

  }

  // handleAddEventClick = event => {
  //   this.setState({
  //     addButtonClicked: !this.state.addButtonClicked
  //   })
  // }

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


  handleAddFormSubmit = event => {
    event.preventDefault()
    let newEvent = this.parseTime()

    this.props.addEvent(newEvent)

    this.clearState()

  }

  clearState = () => {
    this.setState({
      submitted: true,
      title: '',
      description: '',
      startTime: null,
      endTime: null,
    })
  }

  render() {
    return (
      <div>
        {this.state.submitted ? <div/> :

          <form className="fast-fade add-edit-form"
            onSubmit={this.handleAddFormSubmit}>
            Event Title:
          <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              required="true"
              />
          <br />
            Description:
          <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
              required="true"
              />
          <br />
            Start Time:
          <br />
            <input
              onChange={this.handleChange}
              type="time"
              name="startTime"
              required="true"
              />
          <br />
            End Time:
          <br />
            <input
            onChange={this.handleChange}
            type="time"
            name="endTime"
            required="true"
            />

          <button
            type="submit">
            submit
          </button>
          </form>
        }

      </div>
    )
  }

}


const mapDispatch = (dispatch) => ({
  addEvent: (newEvent) => {
     dispatch(addEvent(newEvent))
  },
})

const mapState = (state) => ({
  selectedDate: state.event.selectedDate,
  selectedMoment: state.event.selectedMoment
})

export default connect(mapState, mapDispatch)(AddForm)
