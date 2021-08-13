import React, { useCallback, useEffect } from 'react'

import { Link } from "react-router-dom";
import styles from './files-page.module.scss'
import { Grid, GridItem } from "@consta/uikit/Grid";
import { Button } from "@consta/uikit/Button";
import FileDropper from './FileDropper'
import LitJsSdk from 'lit-js-sdk'

const chain = 'fantom'
const PINATA_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZTRlMWFkOC0xZDg3LTRlMzMtYmYyMC0zYWE3NjRhODc3YzQiLCJlbWFpbCI6ImNocmlzQGhlbGxvYXByaWNvdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2IxMTViMmZjMmY2M2E5YTRmYTYiLCJzY29wZWRLZXlTZWNyZXQiOiIyYjU5YmMzODI3ZGVhZGJiMjI4NzA3YzBmY2Q1YmYxMzBmYmZkNmUyMmZlMDEzMTZkMWNhNDc2MTU2MGE5NmRkIiwiaWF0IjoxNjI4ODg5NjYxfQ.HPXygfPqPRBnGOtQbPRjE1AH7L3l2qqfkPKWodqwNHM'


const FilesPage = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    // get the auth sig first, because if the user denies this, we have nothing to do
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })

    // encrypt the files
    const encryptedFiles = await Promise.all(acceptedFiles.map(f => LitJsSdk.zipAndEncryptFiles([f])))
    console.log('completed encrypting files', encryptedFiles)

    // pick the access control conditions
    const accessControlConditions = [
      {
        contractAddress: '0x5bd3fe8ab542f0aabf7552faaf376fd8aa9b3869',
        standardContractType: 'ERC1155',
        chain,
        method: 'balanceOf',
        parameters: [
          ':userAddress',
          '1'
        ],
        returnValueTest: {
          comparator: '>',
          value: '0'
        }
      }
    ]

    // encrypt the encryption keys via Lit protocol
    const encryptedKeysPromises = []
    encryptedFiles.forEach(f => {
      const { symmetricKey, encryptedZip } = f
      encryptedKeysPromises.push(window.litNodeClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain
      }))
    })

    const encryptedKeys = await Promise.all(encryptedKeysPromises)
    console.log('encryption keys saved to Lit', encryptedKeys)

    const fileUploadPromises = []
    // save the files and the encrypted keys to IPFS with pinata
    encryptedFiles.forEach((f, i) => {
      const { encryptedZip } = f

      // convert to blob
      const encryptedZipBlob = new Blob(
        [encryptedZip],
        { type: 'application/octet-stream' }
      )
      const formData = new FormData()
      formData.append('file', encryptedZipBlob)

      fileUploadPromises.push(new Promise((resolve, reject) => {
        fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${PINATA_API_KEY}`
          },
          body: formData
        }).then(response => response.json())
          .then(data => resolve(data))
          .catch(err => reject(err))
      }))
    })

    const fileUploads = await Promise.all(fileUploadPromises)
    console.log('file upload complete:', fileUploads)

    const metadataUploadPromises = []
    // save the metadata for each file to IPFS
    fileUploads.forEach((uploadRespBody, i) => {
      const encryptedSymmetricKey = encryptedKeys[i]
      const ipfsCid = uploadRespBody.IpfsHash
      const fileUrl = `https://ipfs.litgateway.com/ipfs/${ipfsCid}`
      const metadata = LitJsSdk.metadataForObject({
        objectUrl: fileUrl,
        encryptedSymmetricKey,
        accessControlConditions,
        chain
      })

      metadataUploadPromises.push(new Promise((resolve, reject) => {
        fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${PINATA_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(metadata)
        }).then(response => response.json())
          .then(data => resolve(data))
          .catch(err => reject(err))
      }))

    })

    const metadataUploads = await Promise.all(metadataUploadPromises)
    console.log('metadata upload complete:', metadataUploads)


    //save the association between the metadata and the file into the DB



  }, [])

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Files - Decentralized cloud dropbox</h1>
      <h3 className={styles.subtitle}>View and upload files</h3>

      <FileDropper onDrop={onDrop} />

      <div style={{ height: 16 }} />


    </div>
  )
}

export default FilesPage

