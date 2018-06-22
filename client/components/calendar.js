import React, { Component } from 'react'
import {connect} from 'react-redux'
var moment = require('moment');
moment().format();


class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentMonth: 'June' // could change this to moment.month()
    }
  }

    render() {

    console.log(moment.months())
      let months = moment.months()
      return(
        <div className="calendar-container">

          <h1>You made it to the calendar!</h1>
          <select onChange={()=>console.log(event.target)}>
            {months.map(month =>
              <option key={month} value={month}>{month}</option>
            )}
          </select>

        </div>
      )
    }
  }


export default connect(null, null)(Calendar)
