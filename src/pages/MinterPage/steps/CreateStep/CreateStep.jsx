import React, { useState, useMemo, useRef, useEffect } from 'react'
import LitJsSdk from 'lit-js-sdk'

import styles from '../../minter-page.module.scss'

import { IconArrowLeft } from '@consta/uikit/IconArrowLeft'

import { ReviewLayout, CreateLayout, SuccessLayout } from './components'

const CreateStep = ({ setStep }) => {
  const [createStep, setCreateStep] = useState('create')
  const [tokenId, setTokenId] = useState('')
  const [txHash, setTxHash] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [publicCover, setPublicCover] = useState([])
  const [content, setContent] = useState([])
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [blockChain, setBlockChain] = useState({
    label: 'Ethereum',
    id: 'ethereum',
    value: 'ethereum',
  })

  const windowRef = useRef(null)

  useEffect(() => {
    document.getElementById('appWrap').scrollTop = 0
  }, [createStep])

  const chainOptions = useMemo(
    () =>
      Object.keys(LitJsSdk.LIT_CHAINS).map((item) => {
        return {
          label: LitJsSdk.LIT_CHAINS[item].name,
          id: item,
          value: item,
        }
      }),
    [LitJsSdk.LIT_CHAINS],
  )
  const [code, setCode] = useState(
    'import React from "react";\n' +
      'import ReactDOM from "react-dom";\n' +
      '\n' +
      'function App() {\n' +
      '  return (\n' +
      '    <h1>Hello world</h1>\n' +
      '  );\n' +
      '}\n' +
      '\n' +
      'ReactDOM.render(<App />, document.getElementById("root"));',
  )

  const handleBack = () => {
    if (createStep === 'create') {
      setStep('selectToDo')
    }

    if (createStep === 'success') {
      setStep('create')
    }

    if (createStep === 'review') {
      setCreateStep('create')
    }
  }

  return (
    <div className={styles.wrap}>
      {/* <div className={styles.back} onClick={handleBack}>
        <IconArrowLeft className={styles.backIcon} view="brand" /> Go back
      </div> */}
      {createStep === 'create' ? (
        <CreateLayout
          title={title}
          setTitle={setTitle}
          blockChain={blockChain}
          setBlockChain={setBlockChain}
          quantity={quantity}
          setQuantity={setQuantity}
          publicCover={publicCover}
          setPublicCover={setPublicCover}
          content={content}
          setContent={setContent}
          description={description}
          setDescription={setDescription}
          url={url}
          setUrl={setUrl}
          setCreateStep={setCreateStep}
          chainOptions={chainOptions}
        />
      ) : null}
      {createStep === 'review' ? (
        <ReviewLayout
          publicCover={publicCover}
          title={title}
          description={description}
          blockChain={blockChain}
          code={code}
          setCode={setCode}
          content={content}
          setCreateStep={setCreateStep}
          handleBack={handleBack}
          quantity={quantity}
          setTokenId={setTokenId}
          setTxHash={setTxHash}
          setFileUrl={setFileUrl}
          setTokenAddress={setTokenAddress}
        />
      ) : null}
      {createStep === 'success' ? (
        <SuccessLayout
          isMinter
          publicCover={publicCover}
          title={title}
          description={description}
          content={content}
          blockChain={blockChain}
          setCreateStep={setCreateStep}
          quantity={quantity}
          fileUrl={fileUrl}
          tokenId={tokenId}
          tokenAddress={tokenAddress}
        />
      ) : null}
    </div>
  )
}

export default CreateStep
