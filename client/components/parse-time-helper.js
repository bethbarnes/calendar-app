import React from 'react'
var moment = require('moment');
moment().format();

const parseTime = (state, selectedMoment) => {

  let startHour = state.startTime.slice(0, 2)
  let startMin = state.startTime.slice(3, 5)
  let endHour = state.endTime.slice(0, 2)
  let endMin = state.endTime.slice(3, 5)
  let start = selectedMoment.clone().hour(startHour).minute(startMin)
  let end = selectedMoment.clone().hour(endHour).minute(endMin)

  let newEvent = {
    title: state.title,
    description: state.description,
    startTime: start,
    endTime: end,
    month: start.month(),
    date: start.date(),
    year: start.year()
  }
  return newEvent
}

export default parseTime
