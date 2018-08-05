import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from '../actions'

import LeftView from './left'
import RightView from './right'

class WidgetView extends Component {
  constructor (props) {
    super(props)
    props.getWeather('Sydney, Australia')
  }

  render () {
    const bg = {}
    if (this.props.location) {
      bg.backgroundImage = `url(https://source.unsplash.com/600x420/?${this.props.location.replace(' ', '')})`
    }
    return (
      <div id='widget' style={bg}>
        <LeftView />
        <RightView />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    location: state.weather.location,
    forecast: state.weather.forecast || []
  }
}

export default connect(mapStateToProps, actions)(WidgetView)
