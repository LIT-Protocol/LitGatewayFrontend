import mockImg from '../assets/imgs/no-image.png'

export const getImg = (val) => {
  return val || mockImg
}

export const getExtension = (name) => {
  const arr = name.split('.')
  return arr[arr.length - 1]
}

export const shortenAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
