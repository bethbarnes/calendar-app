import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editEvent} from '../store'
var moment = require('moment');
moment().format();

class EditForm extends Component {
  constructor(props) {
    super(props)
      this.state = {
        editClicked: false,
        title: event.target.value || this.props.currentEvent.title,
        description: event.target.value || this.props.currentEvent.description,
        startTime: event.target.value || this.props.currentEvent.startTime,
        endTime: event.target.value|| this.props.currentEvent.endTime,
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEditButtonClick = () => {
    this.setState({
      editClicked: !this.state.editClicked,
    })
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


  clearState = () => {
    this.setState({
      editClicked: !this.state.editClicked,
      title: '',
      description: '',
      startTime: null,
      endTime: null,
    })
  }

  render() {
    return (
      <div >
        <i
          className="edit fas fa-edit grow"
          onClick={this.handleEditButtonClick}/>
        {this.state.editClicked ?
          <form className="fast-fade add-edit-form"
            id={this.props.currentEvent.id}
            onSubmit={this.handleEditFormSubmit}>
            Event Title:
          <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="title"
              />
          <br />
            Description:
          <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="description"
              />
          <br />
            Start Time:
          <br />
            <input
              onChange={this.handleChange}
              type="time"
              name="startTime"
              />
          <br />
            End Time:
          <br />
            <input
            onChange={this.handleChange}
            type="time"
            name="endTime"
            />
          <button
            type="submit">
            submit
          </button>
          </form>
        : <div/>}
      </div>
    )
  }
}


const mapDispatch = (dispatch) => ({
  editEvent: (editedEvent, id) => {
    dispatch(editEvent(editedEvent, id))
  }
})

const mapState = (state) => ({
  selectedDate: state.event.selectedDate,
  selectedMoment: state.event.selectedMoment
})

export default connect(mapState, mapDispatch)(EditForm)
