import React, { Component } from 'react'
import {connect} from 'react-redux'
import { SingleDay, AllEvents, SingleBox } from './index'
import { setSelectedMoment } from '../store'
import calendarHelper from './calendar-helper-function'

var moment = require('moment');
moment().format();


class Calendar extends Component {
  constructor(props){
    super(props)

    //this could happen in the component did mount
    let now = moment()
    this.state = {
      chosenDate: now, //object
      selectedBoxDate: now.date()
    }
  }


  handleChange = event => {

    let newMoment = moment().year(2018).month(moment.months().indexOf(event.target.value)).date(1)

    this.props.setSelectedMoment(newMoment)

    //maybe should move this to componentDidUpdate
    this.setState({
      chosenDate: moment().year(2018).month(moment.months().indexOf(event.target.value)).date(1)
    })
  }

    render() {

    let weekRows = calendarHelper(this.state.chosenDate, this.state.selectedBoxDate)

      let weekdays = moment.weekdays()
      let months = moment.months()
      return(
        <div className="calendar-container">

          <select onChange={this.handleChange}>
            {months.map(month =>
              <option key={month} value={month}>{month}</option>
            )}
          </select>

          <h1>the date is: {weekdays[this.state.chosenDate.day()]}, {months[this.state.chosenDate.month()]} {this.state.chosenDate.date()}, {this.state.chosenDate.year()}</h1>

           <table className="calendar-table">
           {/* this could be a small module */}
            <thead className="weekdays-header">
              <tr className="weekdays-row">
                {weekdays.map(weekday => {
                  return (<th key={weekday} >{weekday}</th>)
                })}
              </tr>
             </thead>
             {/* this could be another small module */}
             <tbody className="days-container" >
              {weekRows.map((week, idx) => {
                return (
                  <tr key={idx}>
                    {week.map((dayInWeek) => {
                      return dayInWeek
                    })}
                  </tr>
                )
              })}

             </tbody>
           </table>
          <h1>{this.props.selectedDate}, {moment.months()[this.props.selectedMoment.month()]}</h1>
        <AllEvents />
        <SingleDay chosenDate={this.state.chosenDate} selectedBoxDate={this.state.selectedBoxDate}/>
        </div>
      )
    }
  }

  const mapState = (state) => ({
    selectedDate: state.event.selectedDate,
    selectedMoment: state.event.selectedMoment
  })

  const mapDispatch = (dispatch) => ({
    setSelectedMoment: (newMoment) => {
        dispatch(setSelectedMoment(newMoment))
    },
  })


export default connect(mapState, mapDispatch)(Calendar)
