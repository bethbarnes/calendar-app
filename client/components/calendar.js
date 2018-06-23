import React, { Component } from 'react'
import {connect} from 'react-redux'
import { SingleDay, AllEvents, SingleBox } from './index'
import { setSelectedMoment } from '../store'

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

    // this.setState({
    //   chosenDate: moment().year(2018).month(moment.months().indexOf(event.target.value)).date(1)
    // })
  }

  firstDayInMonth = () => {
    let date = this.state.chosenDate;
    let firstDay = moment(date).startOf('month').format('d')
    return firstDay;
  }

    render() {
      console.log('new props coming from store', this.props)
      // console.log('STATE:', this.state)
      let weekdays = moment.weekdays()
      let months = moment.months()

      //creating placeholders boxes for all of the days before the current month begins
      let daysBeforeFirst = []

      //need to clone because subtract mutates original object
      let clone = this.state.chosenDate.clone()
      let daysInLastMonth = clone.subtract(1, 'month').daysInMonth()
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
        <SingleBox id={k+1} key={k+1} selectedBoxDate={this.state.selectedBoxDate}/>
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
