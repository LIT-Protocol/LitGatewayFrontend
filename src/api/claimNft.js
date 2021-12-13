const apiUrl = process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL

export const twitterOauthUrl = (body) => {
  return fetch(apiUrl + '/oauth/twitter/connect', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  }).then((response) => response.json())
}

export const claimOgNft = (body) => {
  return fetch(apiUrl + '/ogNft/claim', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json())
}

export const getNftCount = () => {
  return fetch('https://api.opensea.io/api/v1/collection/lit-genesis-gate ', {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}
