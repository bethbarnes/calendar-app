import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { setSelectedDate } from '../store'

var moment = require('moment');
moment().format();


class SingleBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedBoxDate: ''
    }
  }

  // componentDidMount(){
  //   axios.get(`api/events/${}/${}/${}`)
  // }

  handleBoxClick = (event) => {
    console.log(event.target.id)
    this.props.setSelectedDate(event.target.id)

    //this is going to have to move to store
    // this.setState({
    //   selectedBoxDate: event.target.id,
    // })
  }

  render(){

    // console.log('LOOK AT THESE FRESH PROPS', this.props)
    return(
      <td id={this.props.id} onClick={this.handleBoxClick}>{this.props.id}</td>
    )
  }
}

const mapState = (state) => ({
  selectedDate: state.event.date
})

const mapDispatch = (dispatch) => ({
  setSelectedDate: (date) => {
      dispatch(setSelectedDate(date))
  },
})


export default connect(mapState, mapDispatch)(SingleBox)
