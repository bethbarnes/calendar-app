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
  console.log('mounting : ' , month, ' / ', day, '/', year)
    axios.get(`api/events/${month}/${day}/${year}`)
    .then(res => this.setState(
      {data: res.data}
    ))
    // console.log('updatedthis.state)
  // console.log('in single box for ', day , ' data is ', this.state.data)
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      console.log('new props in single box!')
      let month = this.props.selectedMoment.month()
      let day = this.props.id
      let year = this.props.selectedMoment.year()
        axios.get(`api/events/${month}/${day}/${year}`)
        .then(res => this.setState({data: res.data}))
      }
  }



  handleBoxClick = (event) => {

    this.props.setSelectedDate(event.currentTarget.id)

    let newMoment = this.props.selectedMoment.clone().date(event.currentTarget.id)

    this.props.setSelectedMoment(newMoment)

  }

  render(){
    // console.log('state in single box ', this.props.id, this.state.data)
    return(
      <td
        className={(this.props.isToday ? "today" : "not-today") + (+this.props.selectedDate === +this.props.id ? " selected-date" : ' not-selected')}
        id={this.props.id} onClick={this.handleBoxClick}>

        <div className="id-container">
        {this.props.id}
        </div>
        {this.state.data.map(event => {
          return(
            <h5 className="box-event"key={event.id}>{event.title}</h5>
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
