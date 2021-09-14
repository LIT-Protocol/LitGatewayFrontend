import React from 'react'
import ReactDOM from 'react-dom'
import './global.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import LitJsSdk from 'lit-js-sdk'

window.litNodeClient = new LitJsSdk.LitNodeClient({
  alertWhenUnauthorized: false,
})
window.litNodeClient.connect()
window.LitJsSdk = LitJsSdk

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
