'use strict'

import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'

import { JSDOM } from 'jsdom'

import RightView from '../../../../public_src/components/right'

import { reducers } from '../../../../public_src/reducers'

Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)

let wrapper, testElement

describe('components - right', () => {
  before(() => {
    const dom = new JSDOM(`<!doctype html><html><body></body></html>`)
    global.document = dom.window.document
    global.window = dom.window

    const store = createStoreWithMiddleware(reducers)
    wrapper = mount(<Provider store={store}><RightView /></Provider>)
  })

  after(() => {
    delete global.window
    delete global.document
  })

  it('contains RightView', () => {
    expect(wrapper).to.contain(<RightView />)
  })

  it('does not contain WeatherItemView at all if no forecast prop is provided', () => {
    testElement = wrapper.find(`div[id='rightView']`)
    expect(testElement).to.have.html(`<div id="rightView"></div>`)
  })

  it('contains some WeatherItemView once some forecast data is provided via props', () => {
    const weather = (state = {}, action) => {
      return {
        ...state,
        location: 'Sydeny, Australia',
        forecast: [
          { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 },
          { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 },
          { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 }
        ]
      }
    }
    const reducers = combineReducers({ weather })
    const store = createStoreWithMiddleware(reducers)
    wrapper = mount(<Provider store={store}><RightView /></Provider>)
    testElement = wrapper.find(`div[id='rightView']`)
    expect(wrapper).to.have.exactly(2).descendants('.weather-item')
  })

  it('contains 5 WeatherItemView when 6 forecast data is provided (one missing item or the first item is displayed in left view)', () => {
    const weather = (state = {}, action) => {
      return {
        ...state,
        location: 'Sydeny, Australia',
        forecast: [
          { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 },
          { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 },
          { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 },
          { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 },
          { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 },
          { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 }
        ]
      }
    }
    const reducers = combineReducers({ weather })
    const store = createStoreWithMiddleware(reducers)
    wrapper = mount(<Provider store={store}><RightView /></Provider>)
    testElement = wrapper.find(`div[id='rightView']`)
    expect(wrapper).to.have.exactly(5).descendants('.weather-item')
  })
})
