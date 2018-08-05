import React, { Component } from 'react'
import { connect } from 'react-redux'

export class TemperatureView extends Component {
  render () {
    if (!this.props.todayForecast) {
      return null
    }
    return (
      <div id='temperatureView'>
        <i className={`wi wi-owm-${this.props.todayForecast.id}`} />
        <span>{`${parseInt(this.props.todayForecast.temp)}`}°C</span>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    todayForecast: state.weather.forecast && state.weather.forecast.length && state.weather.forecast[0]
  }
}

export default connect(mapStateToProps)(TemperatureView)
