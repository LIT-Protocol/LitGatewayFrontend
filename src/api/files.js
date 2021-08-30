const apiUrl = process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL

export const patchFile = (fileId, body) => {
  return fetch(apiUrl + '/files/' + fileId, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
}

export const putFile = (body) => {
  return fetch(apiUrl + '/files', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
}

export const putFolder = (body) => {
  return fetch(apiUrl + '/folders', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
}

export const getFolder = (folderId, body) => {
  return fetch(apiUrl + '/folders/' + folderId, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
}

export const getFile = (fileId) => {
  return fetch(apiUrl + '/files/' + fileId, {
    method: 'GET',
    mode: 'cors',
  }).then(response => response.json())
}