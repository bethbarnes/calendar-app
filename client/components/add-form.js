import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../store'
import parseTime from './parse-time-helper'
var moment = require('moment');
moment().format();

class AddForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      submitted: false,
      title: '',
      description: '',
      startTime: null,
      endTime: null,
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleAddFormSubmit = event => {
    event.preventDefault()
    let newEvent = parseTime(this.state, this.props.selectedMoment)
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
    let months = moment.months()
    return (
      <div>
        {this.state.submitted ? <div /> :
          <div className="add-edit-form">
            <h2>Add event on: {months[this.props.selectedMoment.month()]} {this.props.selectedMoment.date()}, {this.props.selectedMoment.year()} </h2>

            <form className="fast-fade"
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
          </div>
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
