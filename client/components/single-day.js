import React, { Component } from 'react'
import {connect} from 'react-redux'
import { EventForm } from './index'


var moment = require('moment');
moment().format();


class SingleDay extends Component {
  constructor(props){
    super(props)
    this.state={
      chosenDate: this.props.chosenDate,
      compositeDate: this.props.chosenDate.date(this.props.selectedBoxDate)
    }
  }

//or could try componentWillRecieveProps
//geterivedstatefromprops
//I think this is working
  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.setState({
        compositeDate: this.props.chosenDate.date(this.props.selectedBoxDate)
      })
    }
  }
  render() {
    return (
      <div>
        <h1>Events on : {moment.weekdays()[this.props.chosenDate.day()]}, {moment.months()[this.state.compositeDate.month()]} {this.state.compositeDate.date()}, {this.state.compositeDate.year() }
        </h1>
      <EventForm />
      </div>
    )
  }



}

export default connect(null, null)(SingleDay)
