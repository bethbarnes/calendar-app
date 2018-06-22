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
      chosenDate: now, //object
      currentDay: now.day(), //number
      currentDate: now.date(), //number
      currentMonth: now.month(), //string
      currentYear: now.year() //number
    }
  }

  handleChange = event => {
    let newDate = moment().year(2018).month(moment.months().indexOf(event.target.value)).date(1)
    this.setState({
      chosenDate: newDate,
      currentDay: newDate.day(),
      currentDate: newDate.date(),
      currentMonth: event.target.value,
      currentYear: newDate.year()
    })
  }

  firstDayInMonth = () => {
    let date = this.state.chosenDate;
    let firstDay = moment(date).startOf('month').format('d')
    return firstDay;
  }

    render() {
      console.log('STATE:', this.state)
      let weekdays = moment.weekdays()
      let months = moment.months()
      let now = moment().year(this.state.currentYear).month(months.indexOf(this.state.currentMonth)).date(1)

      //creating placeholders boxes for all of the days before the current month begins
      let daysBeforeFirst = []
      let daysInLastMonth = this.state.chosenDate.subtract(1, 'months').daysInMonth()
      console.log('here', this.firstDayInMonth())
      // firstDay = 4
      // length of last = 28
      //25,26,27,28
      //i = 3
      for(let i = this.firstDayInMonth()-1; i >= 0 ; i--){
        daysBeforeFirst.push(
          <td key={'last-'+ i}>
            {daysInLastMonth-i}
          </td>
        )
      }

      //creating boxes for all of the days during the current month
      let daysInMonth = []
      for(let k = 0; k <= this.state.chosenDate.daysInMonth(); k++){
        daysInMonth.push(
        <td key={k+1}>
          {k+1}
        </td>
        )
      }

      //combining all boxes
      let allDays = [].concat(daysBeforeFirst).concat(daysInMonth)

      //putting all boxes in ordered rows (4 of 5 rows arrays of 7 days)
      let weekRows = []
      let currentWeek = []
      for (let j = 0; j < allDays.length-1; j++){
        if (j===0 || j % 7 !== 0) { //if this day is still in the current week
          currentWeek.push(allDays[j])
        } else { //if this day is the beginning of a new week
          weekRows = [...weekRows, currentWeek] //add currentWeek to weekRows
          currentWeek = [] //create a new currentWeek array
          currentWeek.push(allDays[j]) // push current day to new week
        }
        if(j === allDays.length-2){ // if this is the last day of the month, add filler boxes at the end
          let currLength = currentWeek.length
          for(let i = 1; i <= 7-currLength; i++){
            currentWeek.push(
              <td key={'next-' + i}>
                {'' + i}
              </td>
              )
          }
          weekRows = [...weekRows, currentWeek]
        }
      }

      return(
        <div className="calendar-container">

          <h1>You made it to the calendar!</h1>
          <select value={this.state.currentMonth} onChange={this.handleChange}>
            {months.map(month =>
              <option key={month} value={month}>{month}</option>
            )}
          </select>

          <h1>the date is: {weekdays[this.state.currentDay]}, {this.state.currentMonth} {this.state.currentDate}, {this.state.currentYear}</h1>
          <h1>the first day of this month is: {now.format('DD MM YYY')}</h1>
           <table className="calendar-table">
            <thead className="weekdays-header">
              <tr className="weekdays-row">
                {weekdays.map(weekday => {
                  return (<th key={weekday} >{weekday}</th>)
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


        </div>
      )
    }
  }


export default connect(null, null)(Calendar)
