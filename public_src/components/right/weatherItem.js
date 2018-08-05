import React, { Component } from 'react'
import moment from 'moment'

export class WeatherItemView extends Component {
  render () {
    if (!this.props.data) {
      return null
    }
    const dt = moment.unix(this.props.data.dt)
    return (
      <div className='weather-item'>
        <div>{this.props.data.desc}</div>
        <div>
          <span>{`${parseInt(this.props.data.temp)}°C`}</span>
          <span>{dt.format('dddd')}</span>
        </div>
        <hr />
      </div>
    )
  }
}

export default WeatherItemView
