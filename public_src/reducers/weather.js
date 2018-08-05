import {
  WEATHER_GET,
  WEATHER_ERROR
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case WEATHER_GET:
      return {
        ...state,
        location: action.payload.location,
        forecast: action.payload.forecast
      }
    case WEATHER_ERROR:
      return {
        ...state,
        error: action.payload
      }
  }
  return state
}
