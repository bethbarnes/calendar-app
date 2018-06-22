import React, { Component } from 'react'
import {connect} from 'react-redux'
var moment = require('moment');
moment().format();


class Calendar extends Component {
  constructor(props){
    super(props)

    //this could happen in the component did mount
    let now = moment()
    this.state = {
      // now: moment(),
      chosenDate: moment(),
      currentDay: now.day(),
      currentDate: now.date(),
      currentMonth: now.month(),
      currentYear: now.year()
    }
  }

  handleChange = event => {
    this.setState({currentMonth: event.target.value})
  }

  firstDayInMonth = () => {
    let date = this.state.chosenDate;
    let firstDay = moment(date).startOf('month').format('d')
    return firstDay;
  }

    render() {
      console.log('state:', this.state)
      let weekdays = moment.weekdays()
      let months = moment.months()
      let now = moment().year(this.state.currentYear).month(months.indexOf(this.state.currentMonth)).date(1)
      console.log(moment().format())
      console.log('NOW:', now)
      return(
        <div className="calendar-container">

          <h1>You made it to the calendar!</h1>
          <select value={this.state.currentMonth} onChange={this.handleChange}>
            {months.map(month =>
              <option key={month} value={month}>{month}</option>
            )}
          </select>

          <h1>the date is: {this.state.currentDay}, {this.state.currentMonth} {this.state.currentDate}, {this.state.currentYear}</h1>
          <h1>the first day of this month is: {now.format('DD MM YYY')}</h1>


           <table className="calendar-table">
            <thead className="weekdays-header">
              <tr className="weekdays-row">
                {weekdays.map(function(weekday){
                  return (<th key={weekday} >{weekday}</th>)
                })}
              </tr>
             </thead>
           </table>


        </div>
      )
    }
  }


export default connect(null, null)(Calendar)
