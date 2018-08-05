import React, { Component } from 'react'
import { connect } from 'react-redux'

import WeatherItemView from './weatherItem'

class RightView extends Component {
  render () {
    return (
      <div id='rightView'>
        {this.props.forecast.map((forecast, index) => {
          if (index === 0) {
            return null // skip the first forecast
          }
          return <WeatherItemView key={index} data={forecast} />
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    forecast: state.weather.forecast || []
  }
}

export default connect(mapStateToProps)(RightView)
