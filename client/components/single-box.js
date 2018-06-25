import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { setSelectedDate, setSelectedMoment } from '../store'

var moment = require('moment');
moment().format();


class SingleBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount(){
  let month = this.props.selectedMoment.month()
  let day = this.props.id
  let year = this.props.selectedMoment.year()
    axios.get(`api/events/${month}/${day}/${year}`)
    .then(res => this.setState({data: res.data}))
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      let month = this.props.selectedMoment.month()
      let day = this.props.id
      let year = this.props.selectedMoment.year()
        axios.get(`api/events/${month}/${day}/${year}`)
        .then(res => this.setState({data: res.data}))
      }
  }



  handleBoxClick = (event) => {
    console.log(event.target.id)
    this.props.setSelectedDate(event.target.id)
    let newMoment = this.props.selectedMoment.date(event.target.id)
    this.props.setSelectedMoment(newMoment)

  }

  render(){
    return(
      <td className={(this.props.isToday ? "today" : "not-today") + (+this.props.selectedDate === +this.props.id ? " selected-date" : ' not-selected')}

        id={this.props.id} onClick={this.handleBoxClick}>
      {this.props.id}
      {this.state.data.map(event => {
        return(
          <h5 key={event.id}>{event.title}</h5>
        )}
      )}
      </td>
    )
  }
}

const mapState = (state) => ({
  selectedDate: state.event.selectedDate,
  selectedMoment: state.event.selectedMoment,
  selectedMonthEvents: state.event.selectedMonthEvents
})

const mapDispatch = (dispatch) => ({
  setSelectedDate: (date) => {
      dispatch(setSelectedDate(date))
  },
  setSelectedMoment: (newMoment) => {
    dispatch(setSelectedMoment(newMoment))
},
})


export default connect(mapState, mapDispatch)(SingleBox)
