'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const expect = chai.expect
chai.use(dirtyChai)

const ActionHero = require('actionhero')
const actionhero = new ActionHero.Process()

let api

describe('data', () => {
  before(async () => { api = await actionhero.start() })
  after(async () => { await actionhero.stop() })

  describe('countryMapper', () => {
    it('returns a full country name by given country code', async () => {
      expect(api.countryMapper['AU']).to.be.a('string', 'Australia')
      expect(api.countryMapper['NZ']).to.be.a('string', 'New Zealand')
      expect(api.countryMapper['GB']).to.be.a('string', 'United Kingdom')
      expect(api.countryMapper['US']).to.be.a('string', 'United States')
      expect(api.countryMapper['CA']).to.be.a('string', 'Canada')
      expect(api.countryMapper['TH']).to.be.a('string', 'Thailand')
      expect(api.countryMapper['JP']).to.be.a('string', 'Japan')
      expect(api.countryMapper['SG']).to.be.a('string', 'Signapore')
      expect(api.countryMapper['ID']).to.be.a('string', 'India')
      expect(api.countryMapper['AE']).to.be.a('string', 'United Arab Emirates')
    })
  })
})
