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
      now: moment(),
      chosenDate: moment(),
      currentDay: now.day(),
      currentDate: now.date(),
      currentMonth: now.month(),
      currentYear: now.year()
    }
  }

  renderRow = () => {
    let row = ''
    for (let i = 0; i < 5; i++) {
      row += <h1> hello </h1>
    }
    // console.log('ROW', row)
    return row
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

      let weekdays = moment.weekdays()
      let months = moment.months()
      let now = moment().year(this.state.currentYear).month(months.indexOf(this.state.currentMonth)).date(1)

      //creating placeholders boxes for all of the days before the current month begins
      let daysBeforeFirst = []
      for(let i = 0; i < this.firstDayInMonth(); i++){
        daysBeforeFirst.push(
          <td>
            'last month'
          </td>
        )
      }

      //creating boxes for all of the days during the current month
      let daysInMonth = []
      for(let k = 0; k <= this.state.now.daysInMonth(); k++){
        daysInMonth.push(
        <td>
          <h1>'day of month' </h1>
        </td>
        )
      }

      //combining all boxes
      let allDays = [].concat(daysBeforeFirst).concat(daysInMonth)
      console.log(allDays)

      //putting all boxes in ordered rows (4 rows arrays of 7 days)
      let weekRows = []
      let currentWeek = []
      for (let j = 0; j < allDays.length; j++){
        if (j===0 || j % 7 !== 0) { //if this day is still in the current week
          currentWeek.push(allDays[j])
          console.log('currentWeek', currentWeek)
        } else { //if this day is the beginning of a new week
          weekRows = [...weekRows, currentWeek] //add currentWeek to weekRows
          currentWeek = [] //create a new currentWeek array
          currentWeek.push(allDays[j]) // push current day to new week
        }
      }
      console.log('WEEKROWS', weekRows)

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
             <tbody className="days-container" >

             </tbody>
           </table>


        </div>
      )
    }
  }


export default connect(null, null)(Calendar)
