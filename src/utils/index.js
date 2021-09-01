import mockImg from '../assets/imgs/no-image.png'

export const getImg = (val) => {
  return val || mockImg
}

export const getExtension = (name) => {
  const arr = name.split('.')
  return arr[arr.length - 1]
}

export * from './files'
export * from './blockchain'
