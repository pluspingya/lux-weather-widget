'use strict'
const {Action, api} = require('actionhero')
const axios = require('axios')

const apiHost = 'http://api.openweathermap.org/data/2.5/forecast/daily'
const appId = 'a1ebd08946f4a9e4bf27190a05da7eb0'

module.exports = class GetDailyWeatherForcast extends Action {
  constructor () {
    super()
    this.name = 'getDailyWeatherForecast'
    this.description = 'return list of daily weather forecast'
    this.inputs = {
      location: {
        required: false,
        default: 'Sydney, Australia'
      },
      days: {
        required: false,
        default: 6
      }
    }
    this.outputExample = {
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

  async run ({params, response}) {
    const citySearch = params.location.replace(' ', '').toLocaleLowerCase()
    const key = `${citySearch.replace(',', ':')}:${params.days}`

    // Attemp to get data from cache first
    if (api.config.redis.enable) {
      try {
        var cache = await api.cache.load(key)
        response.location = cache.value.location
        response.forecast = cache.value.forecast
        return
      } catch (err) {
        // No cache, no worries, fetch a new one
      }
    }

    const url = `${apiHost}?appid=${appId}&q=${citySearch}&cnt=${params.days}&units=metric`
    let res
    try {
      res = await axios.get(url)
    } catch (e) {
      response.error = 'City not found.'
      return
    }
    // Get full country name from countryMapper
    const country = api.countryMapper[res.data.city.country] || res.data.city.country

    const newData = {
      location: `${res.data.city.name}, ${country}`,
      forecast: res.data.list.map(item => {
        const desc = item.weather[0].description
        return {
          dt: item.dt,
          temp: item.temp.day,
          desc: desc.charAt(0).toUpperCase() + desc.slice(1),
          id: item.weather[0].id
        }
      })
    }

    // Cache it for 3 hours
    if (api.config.redis.enable) {
      const expireTimeMS = 3600000 * 3
      await api.cache.save(key, newData, expireTimeMS)
    }

    response.location = newData.location
    response.forecast = newData.forecast
  }
}
