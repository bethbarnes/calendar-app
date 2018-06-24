import axios from 'axios'
import history from '../history'
var moment = require('moment');
moment().format();

/**
 * ACTION TYPES
 */
const SET_SELECTED_DATE = 'SET_SELECTED_DATE'
const SET_SELECTED_MOMENT = 'SET_SELECTED_MOMENT'
const SET_SELECTED_MONTH_EVENTS = 'GET_SELECTED_MONTH_EVENTS '
const ADD_EVENT_TO_MONTH = 'ADD_EVENT_TO_MONTH'
/**
 * INITIAL STATE
 */
let initialState = {
  selectedDate: 1,
  selectedMoment: moment(),
  selectedMonthEvents: [],
}

// const defaultUser = {}

/**
 * ACTION CREATORS
 */

export const setSelectedDate = (selectedDate) => ({type: SET_SELECTED_DATE, selectedDate})

export const setSelectedMoment = (selectedMoment) => {
  console.log('this is the moment sent to redux', selectedMoment)

return {type: SET_SELECTED_MOMENT, selectedMoment} }

export const setSelectedMonthEvents = (events) => (
  {type: SET_SELECTED_MONTH_EVENTS, events})

export const addEventToMonth = (newEvent) => (
  {type: ADD_EVENT_TO_MONTH, newEvent}
)

  /**
 * THUNK
 */

 export const addEvent = (newEvent) =>
   dispatch =>  axios.post('api/events', newEvent).then(res => {
     dispatch(addEventToMonth(res.data))
   })


 export const setEvents = (month) =>
   dispatch => axios.get(`api/events/${month}`)
   .then(res => {
     dispatch(setSelectedMonthEvents(res.data))
   })


/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_DATE:
      return {...state, selectedDate: action.selectedDate}
    case SET_SELECTED_MOMENT:
      return {...state, selectedMoment: action.selectedMoment}
    case SET_SELECTED_MONTH_EVENTS:
      return {...state, selectedMonthEvents: action.events}
    case ADD_EVENT_TO_MONTH:
      return {...state, selectedMonthEvents:
      [...state.selectedMonthEvents, action.newEvent]}
    default:
      return state
  }
}
