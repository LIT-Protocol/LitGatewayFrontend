import ReactDOMServer from 'react-dom/server'

import LitJsSdk from 'lit-js-sdk'

import MediaGrid from '../pages/MinterPage/steps/CreateStep/components/HtmlNft/MediaGrid/MediaGrid'
import HtmlNft from '../pages/MinterPage/steps/CreateStep/components/HtmlNft/HtmlNft'

import styles from '../pages/MinterPage/steps/CreateStep/components/HtmlNft/html-nft-layout.module.scss'

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

  // get all the classes from the elements
  let classes = htmlBody
    .match(/class="[\w-\s]*"/g)
    .map((c) => c.replace('class="', '').replace('"', '').split(' '))
    .flat()

  // now, find these classes and save them
  const allRules = [...document.styleSheets].map((c) => [...c.cssRules]).flat()
  const allRulesWithCssVars = allRules.filter((c) =>
    /[^(var)]--[\w-]*:/g.test(c.cssText),
  )
  const matchingRules = allRules.filter((c) => {
    for (let i = 0; i < classes.length; i++) {
      if (c.selectorText?.split('.').includes(classes[i])) {
        return true
      }
    }
    return false
  })

  const matchingCssText = matchingRules
    .map((c) => c.cssText)
    .reduce((prev, curr) => prev + ' ' + curr)

  //get all the css vars
  const cssVarNames = matchingCssText
    .match(/var\([\w|-]*\)/g)
    .map((c) => c.replace('var(', '').replace(')', ''))
  // keep the css rules with matching var names
  const cssTextsWithVars = allRulesWithCssVars
    .map((c) => c.cssText)
    .reduce((prev, curr) => prev + ' ' + curr)

  // let css = sheets.toString()
  // loading spinner
  let css = `
  ${cssTextsWithVars}
  
  
  ${matchingCssText}

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
