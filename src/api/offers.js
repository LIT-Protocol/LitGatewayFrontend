const apiUrl = process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL

export const claimHodlgodOffer = (body) => {
  return fetch(apiUrl + '/offers/hodlgod_claimed', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json())
}
