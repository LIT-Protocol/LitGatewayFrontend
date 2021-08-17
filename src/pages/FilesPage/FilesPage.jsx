import React, { useCallback, useEffect, useState } from 'react'

import { Link } from "react-router-dom";
import styles from './files-page.module.scss'
import { Grid, GridItem } from "@consta/uikit/Grid";
import { Button } from "@consta/uikit/Button";
import { Table } from '@consta/uikit/Table';
import FileDropper from './FileDropper'
import LitJsSdk from 'lit-js-sdk'
import uint8arrayFromString from 'uint8arrays/from-string'
import { loginToDb } from '../../utils/auth'
import Gun from 'gun/gun'
import 'gun/sea'
import { ProgressSpin } from '@consta/uikit/ProgressSpin';


const chain = 'fantom'
const PINATA_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZTRlMWFkOC0xZDg3LTRlMzMtYmYyMC0zYWE3NjRhODc3YzQiLCJlbWFpbCI6ImNocmlzQGhlbGxvYXByaWNvdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2IxMTViMmZjMmY2M2E5YTRmYTYiLCJzY29wZWRLZXlTZWNyZXQiOiIyYjU5YmMzODI3ZGVhZGJiMjI4NzA3YzBmY2Q1YmYxMzBmYmZkNmUyMmZlMDEzMTZkMWNhNDc2MTU2MGE5NmRkIiwiaWF0IjoxNjI4ODg5NjYxfQ.HPXygfPqPRBnGOtQbPRjE1AH7L3l2qqfkPKWodqwNHM'


const FilesPage = () => {
  const [rows, setRows] = useState(null)
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    if (!user) {
      return
    }
    const files = []
    // list to check that it showed up
    user.get('files').map().on(d => {
      console.log(d)
      setRows(prevFiles => [...prevFiles, d])
    })
  }, [user])


  useEffect(() => {
    // log in user
    // gun doesnt' support promises so this uses callbacks
    loginToDb({
      accessControlConditions,
      cb: function (resp) {
        if (resp.err) {
          throw resp.err
        }
        console.log('user after logintoDb', resp.user)

        setUser(resp.user)
      }
    })


  }, [])



  const onDrop = useCallback(async (acceptedFiles) => {
    // get the auth sig first, because if the user denies this, we have nothing to do
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })




    const fileUploadPromises = []
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i]
      console.log(`processing ${i + 1} of ${acceptedFiles.length}`)
      const zipBlob = await LitJsSdk.encryptFileAndZipWithMetadata({
        authSig,
        accessControlConditions,
        chain,
        file,
        litNodeClient: window.litNodeClient
      })

      // const encryptedZipBlob = new Blob(
      //   [encryptedZip],
      //   { type: 'application/octet-stream' }
      // )
      const formData = new FormData()
      formData.append('file', zipBlob)

      fileUploadPromises.push(new Promise((resolve, reject) => {
        fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${PINATA_API_KEY}`
          },
          body: formData
        }).then(response => response.json())
          .then(data => {
            console.log('file uploaded: ', data)
            console.log('user in promise', user)
            let extension = ''
            const fileParts = file.name.split('.')
            if (fileParts.length > 1) {
              extension = fileParts[fileParts.length - 1]
            }
            user.get('files').set({
              name: file.name,
              type: file.type,
              size: file.size,
              ipfsHash: data.IpfsHash,
              extension,
              uploadedAt: Math.floor(Date.now() / 1000)
            }, (ack) => {
              console.log('files saved - ack is ', ack)
              resolve(ack)
            })
          })
          .catch(err => reject(err))
      }))
    }

    const fileUploads = await Promise.all(fileUploadPromises)
    console.log('file upload complete:', fileUploads)

  }, [user])

  const fileTableColumns = [
    {
      title: 'Name',
      accessor: 'name',
      align: 'left',
      width: 100,
      sortable: true,
    },
    {
      title: 'Extension',
      accessor: 'extension',
      sortable: true,
    },
    {
      title: 'Size',
      accessor: 'size',
      sortable: true,
    },
    {
      title: 'Uploaded',
      accessor: 'uploadedAt',
      sortable: true,
    },
  ];

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Files - Decentralized cloud dropbox</h1>
      <h3 className={styles.subtitle}>View and upload files</h3>

      <FileDropper onDrop={onDrop} />

      <div style={{ height: 32 }} />

      {
        rows === null
          ? <ProgressSpin size='m' />
          : <Table
            columns={fileTableColumns}
            rows={rows}
            emptyRowsPlaceholder='No files yet.  Upload some and they will show up here.'
          />
      }


    </div>
  )
}

export default FilesPage

