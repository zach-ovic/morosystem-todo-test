import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { JssProvider } from 'react-jss'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from './store'

ReactDOM.render(
  <Provider store={configureStore()}>
    <JssProvider>
      <App />
    </JssProvider>
  </Provider>
  ,
  document.getElementById('root')
)
