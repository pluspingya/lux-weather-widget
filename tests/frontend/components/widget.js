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

import WidgetView from '../../../public_src/components/widget'
import LeftView from '../../../public_src/components/left'
import RightView from '../../../public_src/components/right'

import { reducers } from '../../../public_src/reducers'

Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

let wrapper, testElement

describe('components - widget', () => {
  before(() => {
    const dom = new JSDOM(`<!doctype html><html><body></body></html>`)
    global.document = dom.window.document
    global.window = dom.window

    wrapper = mount(<Provider store={store}><WidgetView /></Provider>)
  })

  after(() => {
    delete global.window
    delete global.document
  })

  it('contains WidgetView', () => {
    expect(wrapper).to.contain(<WidgetView />)
  })

  it('contains LeftView', () => {
    testElement = wrapper.find(`div[id='widget']`)
    expect(testElement).to.contain(<LeftView />)
  })

  it('contains RightView', () => {
    testElement = wrapper.find(`div[id='widget']`)
    expect(testElement).to.contain(<RightView />)
  })
})
