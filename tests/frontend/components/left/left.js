'use strict'

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import { JSDOM } from 'jsdom'

import LeftView from '../../../../public_src/components/left'
import DatetimeWeatherView from '../../../../public_src/components/left/datetimeWeather'
import TemperatureView from '../../../../public_src/components/left/temperature'
import LocationView from '../../../../public_src/components/left/location'

import { reducers } from '../../../../public_src/reducers'

Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

let wrapper, testElement

describe('components - left', () => {
  before(() => {
    const dom = new JSDOM(`<!doctype html><html><body></body></html>`)
    global.document = dom.window.document
    global.window = dom.window

    wrapper = mount(<Provider store={store}><LeftView /></Provider>)
  })

  after(() => {
    delete global.window
    delete global.document
  })

  it('contains LeftView', () => {
    expect(wrapper).to.contain(<LeftView />)
  })

  it('contains DatetimeWeatherView', () => {
    testElement = wrapper.find(`div[id='leftView']`)
    expect(testElement).to.contain(<DatetimeWeatherView />)
  })

  it('contains TemperatureView', () => {
    testElement = wrapper.find(`div[id='leftView'] > div`)
    expect(testElement).to.contain(<TemperatureView />)
  })

  it('contains LocationView', () => {
    testElement = wrapper.find(`div[id='leftView'] > div`)
    expect(testElement).to.contain(<LocationView />)
  })
})
