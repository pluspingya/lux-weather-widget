'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
chai.use(require('chai-string'))
const expect = chai.expect

const React = require('react')
const ReactDOM = require('react-dom')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { DatetimeWeatherView } = require('../../../../public_src/components/left/datetimeWeather')

const todayForecast = { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 }
let node, testElement

describe('components - left/datetimeWeather', () => {
  before(() => {
    const rootDivId = 'root'
    const dom = new JSDOM(`<!doctype html><html><body><div id="${rootDivId}"/></div></body></html>`)
    global.document = dom.window.document
    global.window = dom.window
    node = document.getElementById(rootDivId)
    ReactDOM.render(<DatetimeWeatherView />, node)
  })

  after(() => {
    delete global.window
    delete global.document
  })

  it(`doesn't render the component when props isn't provided`, () => {
    testElement = document.querySelector(`div[id='datetimeWeatherView']`)
    expect(testElement).to.not.exist()
  })

  it(`renders the component once props is provided`, () => {
    ReactDOM.render(<DatetimeWeatherView todayForecast={todayForecast} />, node)
    testElement = document.querySelector(`div[id='datetimeWeatherView']`)
    expect(testElement).to.exist()
  })

  it(`contains a span/text describing Day. eg: Saturday`, () => {
    testElement = document.querySelector(`div[id='datetimeWeatherView'] > span:nth-child(1)`)
    expect(testElement.textContent).to.equal('Saturday')
  })

  it(`contains a span/text describing month, year, and time. eg: August 2018 00:00 AM`, () => {
    testElement = document.querySelector(`div[id='datetimeWeatherView'] > span:nth-child(2)`)
    expect(testElement.textContent).to.startsWith('August 2018') // cannot get the exact time
  })

  it(`contains a span/text describing the weather. eg: Sky is clear`, () => {
    testElement = document.querySelector(`div[id='datetimeWeatherView'] > span:nth-child(3)`)
    expect(testElement.textContent).to.equal('Sky is clear')
  })
})
