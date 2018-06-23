import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

var moment = require('moment');
moment().format();


class AllEvents extends Component {
  constructor(props){
    super(props)
    this.state = {
      clicked: false,
      myEvents: []
    }
  }

  handleViewEventsClick = event => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleDeleteClick = event => {
    console.log('deleting event')
    axios.delete('api/events')
  }

  componentDidMount(){
    console.log('mounting!')
    axios.get('/api/events')
    .then(res => this.setState({
      myEvents: res.data
    }))
  }

  render(){
    let events = this.state.myEvents
    console.log('state in all events', this.state)
    return(
      <div>
        <button
        type="button"
        onClick={this.handleViewEventsClick}>
        View All My Events
        </button>

        {this.state.clicked ? events && events.map(event=> {
            return (
              <div key={event.id}>
                <h1>{event.title}</h1>
                <button type="button"
                onClick={this.handleDeleteClick}>
                delete</button>
              </div>
            )
          })
          : <div /> }
      </div>
    )
  }
}

export default connect(null, null)(AllEvents)
