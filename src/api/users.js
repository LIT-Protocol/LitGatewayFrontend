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
  return fetch(apiUrl + '/users/subscribeToMailingList', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json())
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
