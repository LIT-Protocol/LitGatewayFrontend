import React, { useState } from 'react'
import LitJsSdk from 'lit-js-sdk'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'
import Slider from 'react-slick'

import { putTokenMetadata } from '../../../../../../api/minter'

import styles from './review-layout.module.scss'
import { Button } from '@consta/uikit/Button'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'

import { sliderSettings } from '../../../../../../config'

import {
  createHtmlWrapper,
  createMediaGridHtmlString,
  fileToDataUrl,
  getExtension,
} from '../../../../../../utils'
import { File } from '@consta/uikit/File'
import HtmlNft from '../HtmlNft'

const PINATA_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZTRlMWFkOC0xZDg3LTRlMzMtYmYyMC0zYWE3NjRhODc3YzQiLCJlbWFpbCI6ImNocmlzQGhlbGxvYXByaWNvdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNzYyMDg4ZGZjYWI0MGRhNmEzYTIiLCJzY29wZWRLZXlTZWNyZXQiOiIxNWQ1NWMzM2M3YzRjZjkyZTRmNzkxNzYxMjMxNTg5Zjc3NWFmMDNjNGYyOWU5NWE0NTAzNjU4NjRjNzQ2MWJlIiwiaWF0IjoxNjIxMjk5MTUxfQ.rBlfJOgcpDNhecYV2-lNqWg5YRwhN7wvrnmxjRu7LEY'

const ReviewLayout = ({
  publicCover,
  title,
  description,
  quantity,
  blockChain,
  code,
  setCode,
  content,
  setCreateStep,
  handleBack,
  setTokenId,
  setTxHash,
  setFileUrl,
  setTokenAddress,
}) => {
  const [error, setError] = useState(null)
  const [minting, setMinting] = useState(false)

  const ImgPreview = ({ file }) => {
    const imgFormat = ['jpg', 'jpeg', 'png']
    const ext = getExtension(file.name)

    if (imgFormat.includes(ext)) {
      return (
        <div className={styles.preview}>
          <img className={styles.ImgPreview} src={file.dataUrl} />
          <h5>{file.name}</h5>
        </div>
      )
    } else {
      return (
        <div className={styles.preview}>
          <File className={styles.FilePreview} extension={ext} />
          <h5>{file.name}</h5>
        </div>
      )
    }
  }

  const mintIt = async () => {
    setMinting(true)
    setError('')

    console.log('encrypting locked files')

    const chain = blockChain.value

    const lockedFileMediaGridHtml = createMediaGridHtmlString({
      files: content,
    })
    const { symmetricKey, encryptedZip } = await LitJsSdk.zipAndEncryptString(
      lockedFileMediaGridHtml,
    )

    console.log('minting')
    const {
      tokenId,
      tokenAddress,
      mintingAddress,
      txHash,
      errorCode,
      authSig,
    } = await LitJsSdk.mintLIT({ chain, quantity })

    if (errorCode) {
      if (errorCode === 'wrong_chain') {
        setError(
          <>
            <p>
              Your Metamask or wallet is on the wrong blockchain.
              {/* }  If you are trying to mint on Polygon / Matic, follow <Link target='_blank' rel='noreferrer' href='https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844'>these instructions</Link> to add Polygon to your metamask */}
            </p>
          </>,
        )
      } else if (errorCode === 'user_rejected_request') {
        setError('You rejected the request in your wallet')
      } else {
        setError('An unknown error occurred')
      }
      setMinting(false)
      return
    }

    setTokenId(tokenId)
    setTxHash(txHash)

    const accessControlConditions = [
      {
        contractAddress: tokenAddress,
        standardContractType: 'ERC1155',
        chain,
        method: 'balanceOf',
        parameters: [':userAddress', tokenId.toString()],
        returnValueTest: {
          comparator: '>',
          value: '0',
        },
      },
    ]

    const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    })

    // package up all the stuffs
    console.log('creating html wrapper')
    const htmlString = await createHtmlWrapper({
      title,
      description,
      quantity,
      publicCover,
      lockedFiles: await fileToDataUrl(encryptedZip),
      accessControlConditions,
      encryptedSymmetricKey,
      chain,
    })

    console.log('uploading html')
    const litHtmlBlob = new Blob([htmlString], { type: 'text/html' })

    // const uploadPromise = NFTStorageClient.storeBlob(litHtmlBlob)

    // upload file while saving encryption key on nodes
    const formData = new FormData()
    formData.append('file', litHtmlBlob)
    const uploadPromise = new Promise((resolve, reject) => {
      fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${PINATA_API_KEY}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err))
    })

    // const { balanceStorageSlot } = LitJsSdk.LIT_CHAINS[chain]
    // const merkleProof = await LitJsSdk.getMerkleProof({ tokenAddress, balanceStorageSlot, tokenId })

    const uploadRespBody = await uploadPromise
    console.log('uploadresp is ', uploadRespBody)
    const ipfsCid = uploadRespBody.IpfsHash
    const fileUrl = `https://ipfs.litgateway.com/ipfs/${ipfsCid}`

    console.log('creating token metadata on server')
    const metadataBody = {
      authSig,
      metadata: {
        chain,
        tokenAddress,
        tokenId: tokenId.toString(),
        title,
        description,
        quantity,
        mintingAddress,
        fileUrl,
        ipfsCid,
        txHash,
      },
    }
    console.log(metadataBody)
    // save token metadata
    await putTokenMetadata(metadataBody)
    setTokenAddress(tokenAddress)
    setFileUrl(fileUrl)
    setMinting(false)
    setCreateStep('success')
  }

  return (
    <div className={styles.reviewStep}>
      <Button label="Back" view="ghost" onClick={handleBack} />
      <h2 className={styles.title}>Review your NFT</h2>
      {/* <Badge
        className={styles.badge}
        size="l"
        status="normal"
        label="Public preview"
      /> */}
      <HtmlNft
        publicCover={publicCover}
        title={title}
        description={description}
        content={content}
        quantity={quantity}
        previewMode={true}
      />
      {content.length ? (
        <div className={styles.content}>
          <h4>Locked Content Preview</h4>
          <Slider {...sliderSettings}>
            {content.map((item) => (
              <div className={styles.smallCard}>
                <ImgPreview file={item} />
              </div>
            ))}
          </Slider>
        </div>
      ) : null}
      <div className={styles.bottom}>
        <div className={styles.error}>{error}</div>
        {minting ? (
          <div className={styles.loadingBox}>
            <div>Minting, please wait...</div>
            <div>
              <ProgressSpin />
            </div>
          </div>
        ) : (
          <Button
            className={styles.btn}
            label="Mint it"
            size="l"
            onClick={mintIt}
          />
        )}
      </div>
    </div>
  )
}

export default ReviewLayout
