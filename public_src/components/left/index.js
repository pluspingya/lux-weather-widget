import React, { Component } from 'react'

import DatetimeWeatherView from './datetimeWeather'
import TemperatureView from './temperature'
import LocationView from './location'

export class LeftView extends Component {
  render () {
    return (
      <div id='leftView'>
        <DatetimeWeatherView />
        <div>
          <TemperatureView />
          <LocationView />
        </div>
      </div>
    )
  }
}

export default LeftView
