'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
chai.use(require('chai-string'))
const expect = chai.expect

const React = require('react')
const ReactDOM = require('react-dom')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { LocationView } = require('../../../../public_src/components/left/location')

let node, testElement

describe('components - left/location', () => {
  before(function () {
    const rootDivId = 'root'
    const dom = new JSDOM(`<!doctype html><html><body><div id="${rootDivId}"/></div></body></html>`)
    global.document = dom.window.document
    global.window = dom.window

    node = document.getElementById(rootDivId)
    ReactDOM.render(<LocationView />, node)
  })

  after(function () {
    delete global.window
    delete global.document
  })

  it(`contains a textfield with initial value of empty string when props isn't provided.`, () => {
    testElement = document.querySelector(`div[id='locationView'] > input`)
    expect(testElement.value).to.equal('')
  })

  it(`contains a textfield with updated value of provided location prop. eg: Sydney Australia`, () => {
    ReactDOM.render(<LocationView location='Sydney, Australia' />, node)
    testElement = document.querySelector(`div[id='locationView'] > input`)
    expect(testElement.value).to.equal('Sydney, Australia')
  })

  // it(`allows user to edit a text in the textfield`, () => {
  //   testElement = document.querySelector(`div[id='locationView'] > input`)
  //   testElement.addEventListener('build', function (e) { console.log('build') }, false)
  //   let e = new window.Event('build')
  //   testElement.dispatchEvent(e)
  //   e = new window.Event('keyDown')
  //   e.key = 'c'
  //   e.keyCode = e.key.charCodeAt(0)
  //   e.which = e.keyCode
  //   testElement.dispatchEvent(e)
  //   expect(testElement.value).to.equal('Sydney, AustraliaB')
  // })
})
