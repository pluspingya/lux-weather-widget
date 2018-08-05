import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

export class DatetimeWeatherView extends Component {
  render () {
    if (!this.props.todayForecast) {
      return null
    }
    const now = moment()
    const dt = moment.unix(this.props.todayForecast.dt)
    return (
      <div id='datetimeWeatherView'>
        <span>{dt.format('dddd')}</span>
        <span>{`${dt.format('MMMM YYYY')} ${now.format('h:mm A')}`}</span>
        <span>{this.props.todayForecast.desc}</span>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    todayForecast: state.weather.forecast && state.weather.forecast.length && state.weather.forecast[0]
  }
}

export default connect(mapStateToProps)(DatetimeWeatherView)
