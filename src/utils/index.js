import ReactDOMServer from 'react-dom/server'

import LitJsSdk from 'lit-js-sdk'

import mockImg from '../assets/imgs/no-image.png'
import MediaGrid from '../pages/MinterPage/steps/CreateStep/components/HtmlNft/MediaGrid/MediaGrid'
import HtmlNft from '../pages/MinterPage/steps/CreateStep/components/HtmlNft/HtmlNft'

import styles from '../pages/MinterPage/steps/CreateStep/components/HtmlNft/html-nft-layout.module.scss'

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

export function createMediaGridHtmlString({ files }) {
  const html = ReactDOMServer.renderToStaticMarkup(<MediaGrid files={files} />)
  return html
}

export function createHtmlWrapper({
  title,
  description,
  quantity,
  publicCover,
  lockedFiles,
  accessControlConditions,
  encryptedSymmetricKey,
  chain,
}) {
  // // save head before.  this is because ServerStyleSheets will add the styles to the HEAD tag and we need to restore them
  // const HTMLHeadBefore = document.head.innerHTML
  // const sheets = new ServerStyleSheets()

  console.log('html wrapper styles', styles)

  const htmlBody = ReactDOMServer.renderToStaticMarkup(
    <HtmlNft
      title={title}
      description={description}
      quantity={quantity}
      publicCover={publicCover}
    />,
  )
  // let css = sheets.toString()
  // loading spinner
  let css = `
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 44px;
  height: 40px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #000;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 16px;
    left: 16px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 32px;
    height: 32px;
    opacity: 0;
  }
}
  `

  // // put head back
  // document.head.innerHTML = HTMLHeadBefore

  return LitJsSdk.createHtmlLIT({
    title,
    htmlBody,
    css,
    accessControlConditions,
    encryptedSymmetricKey,
    chain,
    encryptedZipDataUrl: lockedFiles,
  })
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
