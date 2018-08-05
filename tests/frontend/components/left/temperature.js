'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
chai.use(require('chai-string'))
const expect = chai.expect

const React = require('react')
const ReactDOM = require('react-dom')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { TemperatureView } = require('../../../../public_src/components/left/temperature')

const todayForecast = { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 }
let node, testElement

describe('components - left/temperature', () => {
  before(() => {
    const rootDivId = 'root'
    const dom = new JSDOM(`<!doctype html><html><body><div id="${rootDivId}"/></div></body></html>`)
    global.document = dom.window.document
    global.window = dom.window

    node = document.getElementById(rootDivId)
    ReactDOM.render(<TemperatureView />, node)
  })

  after(() => {
    delete global.window
    delete global.document
  })

  it(`doesn't render the component when props isn't provided`, () => {
    testElement = document.querySelector(`div[id='temperatureView']`)
    expect(testElement).to.not.exist()
  })

  it(`renders the component once props is provided`, () => {
    ReactDOM.render(<TemperatureView todayForecast={todayForecast} />, node)
    testElement = document.querySelector(`div[id='temperatureView']`)
    expect(testElement).to.exist()
  })

  it(`contains a correct icon. eg: wi-owm-800`, () => {
    testElement = document.querySelector(`div[id='temperatureView'] > i`)
    expect(testElement.className).to.equal('wi wi-owm-800')
  })

  it(`contains a temperature text. eg: 21°C`, () => {
    testElement = document.querySelector(`div[id='temperatureView'] > span`)
    expect(testElement.textContent).to.equal('21°C')
  })
})
