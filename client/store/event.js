import axios from 'axios'
import history from '../history'
var moment = require('moment');
moment().format();

/**
 * ACTION TYPES
 */
const SET_SELECTED_DATE = 'SET_SELECTED_DATE'
const SET_SELECTED_MOMENT = 'SET_SELECTED_MOMENT'

/**
 * INITIAL STATE
 */
let initialState = {
  selectedDate: 1,
  selectedMoment: moment()
}

// const defaultUser = {}

/**
 * ACTION CREATORS
 */

export const setSelectedDate = (selectedDate) => ({type: SET_SELECTED_DATE, selectedDate})

export const setSelectedMoment = (selectedMoment) => ({type: SET_SELECTED_MOMENT, selectedMoment})



/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return {...state, selectedDate: action.selectedDate}
    case SET_SELECTED_MOMENT:
      return {...state, selectedMoment: action.selectedMoment}
    default:
      return state
  }
}
