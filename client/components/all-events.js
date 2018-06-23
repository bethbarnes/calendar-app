import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { EventForm } from './index'

var moment = require('moment');
moment().format();


class AllEvents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewClicked: false,
      myEvents: []
    }
  }

  handleViewEventsClick = event => {
    this.setState({
      viewClicked: !this.state.viewClicked
    })
  }

  handleDeleteClick = event => {
    let deleteId = +event.target.id

    axios.delete(`api/events/${deleteId}`)
      .then(console.log('deleted'))

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

  render() {
    let events = this.state.myEvents
    return (
      <div>
        <button
          type="button"
          onClick={this.handleViewEventsClick}>
          View All My Events
        </button>

        {this.state.viewClicked ?
          events && events.map(event => {
            return (
              <div key={event.id}>
                <h1>{event.title}</h1>
                <button
                  id={event.id}
                  type="button"
                  onClick={this.handleDeleteClick}>
                  delete
                </button>
              <EventForm currentEvent={event} type="edit" />
              </div>
            )
          })
          : <div />}
      </div>
    )
  }
}

export default connect(null, null)(AllEvents)
