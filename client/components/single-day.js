import React, { Component } from 'react'
import {connect} from 'react-redux'

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
    if(this.props.selectedBoxDate !== prevProps.selectedBoxDate){
      console.log('not matching!')
      this.setState({
        compositeDate: this.props.chosenDate.date(this.props.selectedBoxDate)
      })
    }
  }
  render() {
    console.log('composite should be correct', this.state.compositeDate)
    console.log('props', this.props)
    console.log('selectedDate', this.state.chosenDate)
    return (
      <div>
        <h1>helo</h1>
        {/* <h1>Events on : {moment.weekdays()[this.props.chosenDate.day()]}, {moment.months()[selectedDate.month()]} {this.props.selectedBoxDate}, {selectedDate.year()}</h1> */}

      </div>
    )
  }



}

export default connect(null, null)(SingleDay)
