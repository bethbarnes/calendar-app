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
const EDIT_EVENT_IN_MONTH = 'EDIT_EVENT_IN_MONTH'
const DELETE_EVENT = 'DELETE_EVENT'
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

export const setSelectedDate = (selectedDate) => (
  {type: SET_SELECTED_DATE, selectedDate}
)

export const setSelectedMoment = (selectedMoment) => (
  {type: SET_SELECTED_MOMENT, selectedMoment}
)

export const setSelectedMonthEvents = (events) => (
  {type: SET_SELECTED_MONTH_EVENTS, events}
)

export const addEventToMonth = (newEvent) => (
  {type: ADD_EVENT_TO_MONTH, newEvent}
)

export const editEventInMonth = (editedEvent) => (
  {type: EDIT_EVENT_IN_MONTH, editedEvent}
)

export const deleteAnEvent = (deleteId) => (
  {type: DELETE_EVENT, deleteId}
)

  /**
 * THUNK
 */

 export const addEvent = (newEvent) =>
   dispatch =>  axios.post('api/events', newEvent).then(res => {
     dispatch(addEventToMonth(res.data))
   })

 export const editEvent = (editedEvent, id) =>{
   return dispatch =>  axios.put(`api/events/${id}`, editedEvent).then(res => {
     dispatch(editEventInMonth(res.data))
   })
  }

  export const deleteEvent = (deleteId) =>
    dispatch =>  axios.delete(`api/events/${deleteId}`)
    .then(() => dispatch(deleteAnEvent(deleteId)))



 export const getEvents = (month) =>
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
    case EDIT_EVENT_IN_MONTH:
      return {...state, selectedMonthEvents:
      state.selectedMonthEvents.filter((event) =>{
      return event.id !== action.editedEvent.id
    }).push(action.editedEvent)}
    case DELETE_EVENT:
      return {...state, selectedMonthEvents:
        state.selectedMonthEvents.filter(event =>
        event.id !== action.deleteId)
      }
    default:
      return state
  }
}
