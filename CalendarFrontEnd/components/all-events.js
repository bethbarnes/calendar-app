import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { EditForm } from './index'
import { deleteEvent } from '../store'

var moment = require('moment');
moment().format();


class AllEvents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myEvents: []
    }
  }


  handleDeleteClick = event => {
    let deleteId = +event.target.id
    this.props.deleteEvent(deleteId)
    this.setState({
      myEvents: this.state.myEvents.filter(currEvent => currEvent.id !== deleteId)
    })
  }

  componentDidMount() {
    axios.get('/api/events')
      .then(res => this.setState({
        myEvents: res.data
      }))
  }

  constructDate = (event) => {
    return moment.months()[event.month] + ', ' + event.date + ', ' + event.year
  }
  constructTime = (time) => {
    return time.slice(11, 16)
  }

  render() {
    let events = this.state.myEvents
    return (
      <div>
        {events.map(event => {
          return (
            <div className="event-detail fast-fade" key={event.id}>
              <h2 className="event-title">{event.title}</h2>
              <h3 className="event-description">Description: {event.description}</h3>
              <h3>Date: {this.constructDate(event)} </h3>
              <h3>Starts: {this.constructTime(event.startTime)}</h3>
              <h3>Ends: {this.constructTime(event.endTime)}</h3>
              <div className='edit-delete-btn-container' >
                <i
                  id={event.id}
                  className="delete fas fa-trash grow"
                  onClick={this.handleDeleteClick} />
                <EditForm currentEvent={event} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  deleteEvent: (deleteId) => {
    dispatch(deleteEvent(deleteId))
  },
})

export default connect(null, mapDispatch)(AllEvents)
