import React, { Component } from 'react'
import {connect} from 'react-redux'
import { AllEvents, AddForm } from './index'
import { setSelectedMoment, getEvents, setSelectedDate} from '../store'
import calendarHelper from './calendar-helper-function'


var moment = require('moment');
moment().format();


class Calendar extends Component {
  constructor(props){
    super(props)

    this.state ={
      chosenDate: moment(),
      clicked: '',
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

  handleViewEventsClick = event => {
    this.setState({
      clicked: this.state.clicked !== 'view' ? 'view' : ''
    })
  }

  handleAddEventClick = event => {
    this.setState({
      clicked: this.state.clicked !== 'add' ? 'add' : ''
    })
  }


  handleChange = event => {
//this is changing the month
    let newMoment = moment().year(2018).month(moment.months().indexOf(event.target.value)).date(1)
    this.props.setSelectedMoment(newMoment)
    this.props.setSelectedDate(1)
    this.setState({
      chosenDate: moment().year(2018).month(moment.months().indexOf(event.target.value)).date(1)
    })
  }

    render() {
      let weekRows = calendarHelper(this.state.chosenDate)
      let weekdays = moment.weekdays()
      let months = moment.months()
      let now = moment()

      return(
        <div className="calendar-container">
          <div className="calendar-top-bar">
            <h1 className="greeting">
              {weekdays[now.day()]}, {months[now.month()]} {now.date()}, {now.year()}
            </h1>

            <select
              value={months[this.state.chosenDate.month()]}
              className="month-select shadow"
              onChange={this.handleChange}>
                {months.map(month =>
                  <option
                    key={month}
                    value={month}
                    >{month}</option>
                )}
            </select>
          </div>

           <table className="calendar-table shadow">
            <thead className="weekdays-header">
              <tr className="weekdays-row">
                {weekdays.map(weekday => {
                  return (<th className="weekday-th" key={weekday} >{weekday}</th>)
                })}
              </tr>
             </thead>
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

      <div className="btn-container" >
        <button
          className="large-btn shadow small-grow"
          type="button"
          onClick={this.handleViewEventsClick}>
          View All My Events
        </button>

        <button
          className="large-btn shadow small-grow"
          type="button"
          onClick={this.handleAddEventClick}>
          Add New Event
        </button>
      </div>

        {this.state.clicked==='view' ? <AllEvents /> : <div/>}
        {this.state.clicked==='add' ? <AddForm currentDate={this.state.chosenDate} /> : <div/>}
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
    setSelectedDate: (date) => {
      dispatch(setSelectedDate(date))
    },
    getEvents: (month) => {
      dispatch(getEvents(month))
    }
  })


export default connect(mapState, mapDispatch)(Calendar)
