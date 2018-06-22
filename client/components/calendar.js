import React, { Component } from 'react'
import {connect} from 'react-redux'
var moment = require('moment');
moment().format();


class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentMonth: 'April', // could change this to moment.month()
      currentYear: 2020
    }
  }

  handleChange = event => {
    this.setState({currentMonth: event.target.value})
  }
    render() {


      console.log('state:', this.state)
    console.log(moment.months())
      let months = moment.months()
      let now = moment().year(this.state.currentYear).month(months.indexOf(this.state.currentMonth)).day(1)
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

          <h1>the date is: </h1>
          <h1>the first day of this month is: {now.format()}</h1>

        </div>
      )
    }
  }


export default connect(null, null)(Calendar)
