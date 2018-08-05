import axios from 'axios'
import { handleResponse, handleError } from '../helpers/actionHelper'
import { WEATHER_GET, WEATHER_ERROR } from './types'

const baseUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : ''

export const getWeather = ({location, done}) => {
  return dispatch => {
    const locationParam = location ? `location=${location.replace(' ', '')}` : ''
    axios.get(`${baseUrl}/api/weather?${locationParam}`)
      .then(handleResponse(dispatch, WEATHER_GET, done))
      .catch(handleError(dispatch, WEATHER_ERROR, done))
  }
}

export const clearError = () => {
  return dispatch => {
    dispatch({type: WEATHER_ERROR, payload: null})
  }
}
