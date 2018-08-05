const {Initializer, api} = require('actionhero')
const fs = require('fs')
const csv = require('fast-csv')

module.exports = class CountryMapperInit extends Initializer {
  constructor () {
    super()
    this.name = 'CountryMapperInit'
    this.loadPriority = 1000
    this.startPriority = 1000
    this.stopPriority = 1000
  }

  async initialize () {
    const loadCountryMapper = new Promise((resolve, reject) => {
      const ret = {}
      const stream = fs.createReadStream('data/countries.csv')
      const headers = [
        'name', 'alpha-2', 'alpha-3', 'country-code', 'iso_3166-2', 'region',
        'sub-region', 'intermediate-region', 'region-code', 'sub-region-code',
        'intermediate-region-code'
      ]
      csv.fromStream(stream, {headers})
        .on('data', data => {
          if (!data['name'] || !data['alpha-2']) {
            return
          }
          ret[data['alpha-2']] = data['name']
        })
        .on('end', () => resolve(ret))
        .on('error', e => {
          reject(e)
        })
    })

    api.countryMapper = await loadCountryMapper
  }
}
