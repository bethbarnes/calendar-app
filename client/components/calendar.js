import React, { Component } from 'react'
import {connect} from 'react-redux'
import { SingleDay, AllEvents, SingleBox } from './index'
import { setSelectedMoment, getEvents } from '../store'
import calendarHelper from './calendar-helper-function'

var moment = require('moment');
moment().format();


class Calendar extends Component {
  constructor(props){
    super(props)

    this.state ={
      chosenDate: moment()
    }
  }

  componentDidMount(){
    this.props.getEvents(this.props.selectedMoment.month())
  }

  componentDidUpdate(prevProps){
//if month changes, get events for new month
    if(this.props.selectedMoment.month() !== prevProps.selectedMoment.month()){

     this.props.getEvents(this.props.selectedMoment.month())
    }

  }


  handleChange = event => {
//this is changing the month
    let newMoment = moment().year(2018).month(moment.months().indexOf(event.target.value)).date(1)

    this.props.setSelectedMoment(newMoment)

    this.setState({
      chosenDate: moment().year(2018).month(moment.months().indexOf(event.target.value)).date(1)
    })
  }

    render() {
    let weekRows = calendarHelper(this.state.chosenDate)

      let weekdays = moment.weekdays()
      let months = moment.months()
      return(
        <div className="calendar-container">

          <select className="month-select"
          onChange={this.handleChange}>
            {months.map(month =>
              <option key={month} value={month}>{month}</option>
            )}
          </select>

          {/* <h1>Today is: {weekdays[this.state.chosenDate.day()]}, {months[this.state.chosenDate.month()]} {this.state.chosenDate.date()}, {this.state.chosenDate.year()}</h1> */}

           <table className="calendar-table shadow">
           {/* this could be a small module */}
            <thead className="weekdays-header">
              <tr className="weekdays-row">
                {weekdays.map(weekday => {
                  return (<th className="weekday-th" key={weekday} >{weekday}</th>)
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
      <div className="btn-container" >
        <AllEvents />
        <SingleDay />
      </div>
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
    getEvents: (month) => {
      dispatch(getEvents(month))
    }
  })


export default connect(mapState, mapDispatch)(Calendar)
