'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
chai.use(require('chai-string'))
const expect = chai.expect

const React = require('react')
const ReactDOM = require('react-dom')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { WeatherItemView } = require('../../../../public_src/components/right/weatherItem')

const data = { dt: 1533348000, temp: 21.2, desc: 'Sky is clear', id: 800 }
let node, testElement

describe('components - right/weatherItem', () => {
  before(() => {
    const rootDivId = 'root'
    const dom = new JSDOM(`<!doctype html><html><body><div id="${rootDivId}"/></div></body></html>`)
    global.document = dom.window.document
    global.window = dom.window

    node = document.getElementById(rootDivId)
    ReactDOM.render(<WeatherItemView />, node)
  })

  after(() => {
    delete global.window
    delete global.document
  })

  it(`doesn't render the component when props isn't provided`, () => {
    testElement = document.querySelector(`div[class='weather-item']`)
    expect(testElement).to.not.exist()
  })

  it(`renders the component once props is provided`, () => {
    ReactDOM.render(<WeatherItemView data={data} />, node)
    testElement = document.querySelector(`div[class='weather-item']`)
    expect(testElement).to.exist()
  })

  it(`contains a div/text describing the weather. eg: Sky is clear`, () => {
    testElement = document.querySelector(`div[class='weather-item'] > div:first-child`)
    expect(testElement.textContent).to.equal('Sky is clear')
  })

  it(`contains a div/span text indicating the temperature. eg: 21°C`, () => {
    testElement = document.querySelector(`div[class='weather-item'] > div:nth-child(2) > span:nth-child(1)`)
    expect(testElement.textContent).to.equal('21°C')
  })

  it(`contains a div/span text indicating the day. eg: Saturday`, () => {
    testElement = document.querySelector(`div[class='weather-item'] > div:nth-child(2) > span:nth-child(2)`)
    expect(testElement.textContent).to.equal('Saturday')
  })

  it(`contains a <hr/> line`, () => {
    testElement = document.querySelector(`div[class='weather-item'] > hr`)
    expect(testElement).to.exist()
  })
})
