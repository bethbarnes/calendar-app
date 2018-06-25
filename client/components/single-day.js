import React, { Component } from 'react'
import {connect} from 'react-redux'
import { EventForm } from './index'


var moment = require('moment');
moment().format();


class SingleDay extends Component {
  constructor(props){
    super(props)
    this.state={
      chosenDate: this.props.selectedMoment
    }
  }


  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.setState({
        chosenDate: this.props.selectedMoment
      })
    }
  }
  render() {

    return (
      <div>
        {/* <h1>
          Events on : {moment.weekdays()[this.state.chosenDate.day()]}, {moment.months()[this.state.chosenDate.month()]} {this.state.chosenDate.date()}, {this.state.chosenDate.year() }
        </h1> */}
      {/* <EventForm currentDate={this.state.chosenDate} type="add"/> */}
      </div>
    )
  }

}

const mapState = (state) => ({
  selectedDate: state.event.selectedDate,
  selectedMoment: state.event.selectedMoment
})

export default connect(mapState, null)(SingleDay)
