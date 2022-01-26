const SibApiV3Sdk = require('sib-api-v3-typescript')

const apiUrl = process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL
const emailApi = process.env.REACT_APP_SEND_IN_BLUE_API

export const putUser = (body) => {
  return fetch(apiUrl + '/users', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json())
}

export const postUser = (body) => {
  let apiInstance = new SibApiV3Sdk.ContactsApi()

  let apiKey = apiInstance.authentications['apiKey']

  apiKey.apiKey = emailApi

  let createContact = new SibApiV3Sdk.CreateContact()

  createContact.email = body.email
  createContact.listIds = [2]

  return apiInstance.createContact(createContact)
}

export const getUserHoldings = (body) => {
  return fetch(apiUrl + '/users/holdings', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json())
}

export const storeHoldingsFromLit = (body) => {
  return fetch(apiUrl + '/users/lit_holdings', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json())
}
