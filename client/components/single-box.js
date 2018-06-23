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
      selectedBoxDate: '',
      data: []
    }
  }

  componentDidMount(){
    console.log('BOX COMPONENT MOUNTED')


    //ONLY DOES THIS ONCE, SO WILL NEED TO MAKE ASYNC FETCH CALLS IN ANOTHER LIFECYCLE
  //need month, year and day number
  //day: this.props.id
  //month is : selectedMoment.month
  //year is selectedmoment.year()
  let month = this.props.selectedMoment.month()
  let day = this.props.id
  let year = this.props.selectedMoment.year()
    axios.get(`api/events/${month}/${day}/${year}`)
    .then(res => this.setState({data: res.data}))
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      console.log('woooo new props~!')
      let month = this.props.selectedMoment.month()
      let day = this.props.id
      let year = this.props.selectedMoment.year()
        axios.get(`api/events/${month}/${day}/${year}`)
        .then(res => this.setState({data: res.data}))
      }
  }



  handleBoxClick = (event) => {
    console.log(event.target.id)
    this.props.setSelectedDate(event.target.id)

    //this is going to have to move to store
    // this.setState({
    //   selectedBoxDate: event.target.id,
    // })
  }

  render(){
    console.log('the date of this box is: ', this.props.selectedMoment.month(), this.props.id, this.props.selectedMoment.year())
    // console.log('LOOK AT THESE FRESH PROPS', this.props)
    return(
      <td id={this.props.id} onClick={this.handleBoxClick}>
      {this.props.id}
      {this.state.data.map(event => {
        return(
          <h5 key={event.id}>{event.title}</h5>
        )}
      )}
      </td>
    )
  }
}

const mapState = (state) => ({
  selectedDate: state.event.selectedDate,
  selectedMoment: state.event.selectedMoment
})

const mapDispatch = (dispatch) => ({
  setSelectedDate: (date) => {
      dispatch(setSelectedDate(date))
  },
})


export default connect(mapState, mapDispatch)(SingleBox)
