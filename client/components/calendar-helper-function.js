import React, { Component } from 'react'
import { SingleDay, AllEvents, SingleBox } from './index'

var moment = require('moment');
moment().format();

  // let weekdays = moment.weekdays()
  // let months = moment.months()



const calendarHelper = (chosenDate, selectedBoxDate) => {


  let firstDayInMonth = () => {
    let date = chosenDate;
    let firstDay = moment(date).startOf('month').format('d')
    return firstDay;
  }
  //creating placeholders boxes for all of the days before the current month begins
  let daysBeforeFirst = []

  //need to clone because subtract mutates original object
  let clone = chosenDate.clone()
  let daysInLastMonth = clone.subtract(1, 'month').daysInMonth()
  for (let i = firstDayInMonth() - 1; i >= 0; i--) {
    daysBeforeFirst.push(
      <td key={'last-' + i}>
        {daysInLastMonth - i}
      </td>
    )
  }

  //creating boxes for all of the days during the current month
  let daysInMonth = []
  for (let k = 0; k <= chosenDate.daysInMonth(); k++) {
    daysInMonth.push(
      <SingleBox id={k + 1} key={k + 1} selectedBoxDate={selectedBoxDate} />
      // <td id={k+1} onClick={this.handleBoxClick} key={k+1}>
      //   {k+1}
      // </td>
    )
  }

  //combining all boxes
  let allDays = [].concat(daysBeforeFirst).concat(daysInMonth)
  //putting all boxes in ordered rows (4 of 5 rows arrays of 7 days)
  let weekRows = []
  let currentWeek = []
  for (let j = 0; j < allDays.length - 1; j++) {
    if (j === 0 || j % 7 !== 0) { //if this day is still in the current week
      currentWeek.push(allDays[j])
    } else { //if this day is the beginning of a new week
      weekRows = [...weekRows, currentWeek] //add currentWeek to weekRows
      currentWeek = [] //create a new currentWeek array
      currentWeek.push(allDays[j]) // push current day to new week
    }
    if (j === allDays.length - 2) { // if this is the last day of the month, add filler boxes at the end
      let currLength = currentWeek.length
      for (let i = 1; i <= 7 - currLength; i++) {
        currentWeek.push(
          <td key={'next-' + i}>
            {'' + i}
          </td>
        )
      }
      weekRows = [...weekRows, currentWeek]
    }
  }

console.log('returning this weekRows from helper: ', weekRows)
return weekRows



}




export default calendarHelper
