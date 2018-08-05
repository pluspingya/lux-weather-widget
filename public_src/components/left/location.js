import React, { Component } from 'react'

import { connect } from 'react-redux'
import * as actions from '../../actions'

export class LocationView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      location: ''
    }
  }

  componentWillReceiveProps (props) {
    if (props.error) {
      this.props.clearError()
    }
    if (props.location) {
      this.setState({ location: props.location })
    }
  }

  render () {
    return (
      <div id='locationView'>
        <input type='text'
          id='location-field'
          value={this.state.location}
          onChange={e => this.setState({location: e.target.value})}
          onKeyDown={this.enterKeyToInputBlur.bind(this)}
          onBlur={this.handleInputBlur.bind(this)} />
      </div>
    )
  }

  enterKeyToInputBlur (e) {
    let intKey = window.Event ? e.which : e.keyCode
    if (intKey !== 13) {
      return
    }
    const inputElem = document.getElementById('location-field')
    if (inputElem) {
      inputElem.blur()
    }
  }

  handleInputBlur (e) {
    if (this.state.location === '') {
      this.setState({location: this.props.location})
      return
    }
    this.props.getWeather({location: this.state.location})
  }
}

const mapStateToProps = (state, props) => {
  return {
    location: state.weather.location,
    error: state.weather.error
  }
}

export default connect(mapStateToProps, actions)(LocationView)
