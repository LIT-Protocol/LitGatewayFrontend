const apiUrl = process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL

export const putTokenMetadata = (body) => {
  return fetch(apiUrl + '/nftMetadata', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json())
}
