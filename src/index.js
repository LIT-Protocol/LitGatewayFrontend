import React from 'react'
import ReactDOM from 'react-dom'
import './global.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import LitJsSdk from 'lit-js-sdk'

import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'

Bugsnag.start({
  apiKey: '8825b63a842db5a4bd6413457c0f9e66',
  plugins: [new BugsnagPluginReact()],
  onError: function (event) {
    if (window.ethAddress) {
      event.setUser(window.ethAddress)
    }
  },
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

window.litNodeClient = new LitJsSdk.LitNodeClient({
  alertWhenUnauthorized: false,
})
window.litNodeClient.connect()
window.LitJsSdk = LitJsSdk

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
