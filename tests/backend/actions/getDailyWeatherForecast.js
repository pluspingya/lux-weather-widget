'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const r2 = require('r2')
const ActionHero = require('actionhero')
const actionhero = new ActionHero.Process()

let api, url

describe('actions', () => {
  before(async () => {
    api = await actionhero.start()
    url = `http://localhost:${api.config.servers.web.port}/api`
  })

  after(async () => {
    await actionhero.stop()
  })

  describe('getDailyWeatherForecast', () => {
    it('returns a list of daily weather forecast for Sydney with 6 days data by default', async () => {
      const response = await r2.get(`${url}/getDailyWeatherForecast`).json
      expect(response.error).to.not.exist()

      expect(response).to.have.property('location', 'Sydney, Australia')
      expect(response).to.have.property('forecast')

      expect(response.forecast).to.be.an('array')
      expect(response.forecast).to.have.property('length', 6)

      expect(response.forecast[0]).to.be.an('object')
      expect(response.forecast[0]).to.have.property('dt')
      expect(response.forecast[0]['dt']).to.be.a('number')
      expect(response.forecast[0]).to.have.property('temp')
      expect(response.forecast[0]['temp']).to.be.a('number')
      expect(response.forecast[0]).to.have.property('desc')
      expect(response.forecast[0]['desc']).to.be.a('string')
      expect(response.forecast[0]).to.have.property('id')
      expect(response.forecast[0]['id']).to.be.a('number')

      expect(response.forecast[1]).to.be.an('object')
      expect(response.forecast[1]).to.have.property('dt')
      expect(response.forecast[1]['dt']).to.be.a('number')
      expect(response.forecast[1]).to.have.property('temp')
      expect(response.forecast[1]['temp']).to.be.a('number')
      expect(response.forecast[1]).to.have.property('desc')
      expect(response.forecast[1]['desc']).to.be.a('string')
      expect(response.forecast[1]).to.have.property('id')
      expect(response.forecast[1]['id']).to.be.a('number')

      expect(response.forecast[2]).to.be.an('object')
      expect(response.forecast[3]).to.have.property('dt')
      expect(response.forecast[3]['dt']).to.be.a('number')
      expect(response.forecast[3]).to.have.property('temp')
      expect(response.forecast[3]['temp']).to.be.a('number')
      expect(response.forecast[3]).to.have.property('desc')
      expect(response.forecast[3]['desc']).to.be.a('string')
      expect(response.forecast[3]).to.have.property('id')
      expect(response.forecast[3]['id']).to.be.a('number')

      expect(response.forecast[4]).to.be.an('object')
      expect(response.forecast[4]).to.have.property('dt')
      expect(response.forecast[4]['dt']).to.be.a('number')
      expect(response.forecast[4]).to.have.property('temp')
      expect(response.forecast[4]['temp']).to.be.a('number')
      expect(response.forecast[4]).to.have.property('desc')
      expect(response.forecast[4]['desc']).to.be.a('string')
      expect(response.forecast[4]).to.have.property('id')
      expect(response.forecast[4]['id']).to.be.a('number')

      expect(response.forecast[5]).to.be.an('object')
      expect(response.forecast[5]).to.have.property('dt')
      expect(response.forecast[5]['dt']).to.be.a('number')
      expect(response.forecast[5]).to.have.property('temp')
      expect(response.forecast[5]['temp']).to.be.a('number')
      expect(response.forecast[5]).to.have.property('desc')
      expect(response.forecast[5]['desc']).to.be.a('string')
      expect(response.forecast[5]).to.have.property('id')
      expect(response.forecast[5]['id']).to.be.a('number')
    })

    it('returns a list of daily weather forecast for a specific location and a specific number of days', async () => {
      const response = await r2.get(`${url}/getDailyWeatherForecast?location=Brisbane&days=2`).json
      expect(response.error).to.not.exist()

      expect(response).to.have.property('location', 'Brisbane, Australia')
      expect(response).to.have.property('forecast')

      expect(response.forecast).to.be.an('array')
      expect(response.forecast).to.have.property('length', 2)

      expect(response.forecast[0]).to.be.an('object')
      expect(response.forecast[0]).to.have.property('dt')
      expect(response.forecast[0]['dt']).to.be.a('number')
      expect(response.forecast[0]).to.have.property('temp')
      expect(response.forecast[0]['temp']).to.be.a('number')
      expect(response.forecast[0]).to.have.property('desc')
      expect(response.forecast[0]['desc']).to.be.a('string')
      expect(response.forecast[0]).to.have.property('id')
      expect(response.forecast[0]['id']).to.be.a('number')

      expect(response.forecast[1]).to.be.an('object')
      expect(response.forecast[1]).to.have.property('dt')
      expect(response.forecast[1]['dt']).to.be.a('number')
      expect(response.forecast[1]).to.have.property('temp')
      expect(response.forecast[1]['temp']).to.be.a('number')
      expect(response.forecast[1]).to.have.property('desc')
      expect(response.forecast[1]['desc']).to.be.a('string')
      expect(response.forecast[1]).to.have.property('id')
      expect(response.forecast[1]['id']).to.be.a('number')
    })
  })
})
