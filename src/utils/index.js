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

export * from './files'
export * from './blockchain'
