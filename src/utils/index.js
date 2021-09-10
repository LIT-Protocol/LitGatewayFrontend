import mockImg from '../assets/imgs/no-image.png'

export const getImg = (val) => {
  return val || mockImg
}

export const getExtension = (name) => {
  const arr = name.split('.')
  return arr[arr.length - 1]
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function openseaUrl({ chain, tokenAddress, tokenId }) {
  if (chain === 'polygon') {
    return `https://opensea.io/assets/matic/${tokenAddress}/${tokenId}`
  } else if (chain === 'ethereum') {
    return `https://opensea.io/assets/${tokenAddress}/${tokenId}`
  }
  return false
}

export * from './files'
export * from './blockchain'
export * from './nft'
