The purpose of this project is for anyone to get a sense of how I would approach
designing and implementing a simple Javascript/CSS/Html widget together with
api server required to serve data points.

# Lux Weather Widget
A web application that displays the current weather and
the next five day forecast of the city given in the input box.
It's "Sydney, Australia" by default.

This widget is 100% responsive all the way down to 320px wide.

# See it in action
The project is completely built on NodeJS utilizing [ActionHeroJs](https://www.actionherojs.com/)
for the backend service API as well as serving a webpack fronted web application.

The frontend itself is built using ReactJS + Redux framework.

## To install:
(assuming you have [node](http://nodejs.org/) and NPM installed)

`npm install`

*Note* Please make sure you have Redis database installed.
The app makes use of redis database for a cache system by default.
If you don't need the cache feature or you just simply can't be bother to install redis.
Open up a config file `config/redis.js` at line 29, set enabled to `false`

## To Run:
To start a backend service and serve a fronted web

`npm start`

## To dev:
To serve a frontend app during the development

`npm run dev`

This also provides auto-refresh when file changes are saved

# Testing
As an attempt to demonstrate various approaches of writing tests such as unit tests,
integration tests and fronted tests. The tests have used a range of libraries
such as mocha, chai, enzyme, jsdom, and standardjs.

## To test:
To run units & integration tests for the entire codebase, both backend and frontend

`npm test`

This also runs pre-test using standardjs library to verify standard javascript coding convention.

To run units & integration tests for the backend.

`npm run test-backend`

To run units & integration tests for the frontend.

`npm rum test-frontend`

## To build
To build a fronted app using Webpack4, which will be ready to serve in production

`npm run build`
