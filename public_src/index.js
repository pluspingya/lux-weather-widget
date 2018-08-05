import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'

import './styles/styles.css'
import './styles/weather-icons.min.css'
import WidgetView from './components/widget'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

const Index = () => {
  return (
    <Provider store={store}>
      <WidgetView />
    </Provider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
