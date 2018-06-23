import React, { Component } from 'react'
import {connect} from 'react-redux'
var moment = require('moment');
moment().format();


class EventForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      test: true
    }
  }

  render(){
    return (
      <div>
        Helloooooo
        </div>
    )
  }

}


export default connect(null, null)(EventForm)
