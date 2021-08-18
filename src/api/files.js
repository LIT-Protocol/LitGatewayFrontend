const apiUrl = process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL

export const putFile = (body) => {
  return fetch(apiUrl + '/files', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
}

export const getFiles = (accessControlConditionsHash) => {
  return fetch(apiUrl + '/files/' + accessControlConditionsHash, {
    method: 'GET',
    mode: 'cors',
  }).then(response => response.json())
}