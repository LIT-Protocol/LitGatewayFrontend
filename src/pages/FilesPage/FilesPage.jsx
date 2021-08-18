import React, { useCallback, useEffect, useState } from 'react'

import { Link } from "react-router-dom";
import styles from './files-page.module.scss'
import { Grid, GridItem } from "@consta/uikit/Grid";
import { Button } from "@consta/uikit/Button";
import { Table } from '@consta/uikit/Table';
import { IconDownload } from "@consta/uikit/IconDownload";
import FileDropper from './FileDropper'
import LitJsSdk from 'lit-js-sdk'
import uint8arrayFromString from 'uint8arrays/from-string'
import uint8arrayToString from 'uint8arrays/to-string'
import { loginToDb } from '../../utils/auth'
import { humanFileSize } from '../../utils/files'
import Gun from 'gun/gun'
import 'gun/sea'
import { ProgressSpin } from '@consta/uikit/ProgressSpin';


const chain = 'fantom'
const PINATA_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZTRlMWFkOC0xZDg3LTRlMzMtYmYyMC0zYWE3NjRhODc3YzQiLCJlbWFpbCI6ImNocmlzQGhlbGxvYXByaWNvdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2IxMTViMmZjMmY2M2E5YTRmYTYiLCJzY29wZWRLZXlTZWNyZXQiOiIyYjU5YmMzODI3ZGVhZGJiMjI4NzA3YzBmY2Q1YmYxMzBmYmZkNmUyMmZlMDEzMTZkMWNhNDc2MTU2MGE5NmRkIiwiaWF0IjoxNjI4ODg5NjYxfQ.HPXygfPqPRBnGOtQbPRjE1AH7L3l2qqfkPKWodqwNHM'


const FilesPage = () => {
  const [rows, setRows] = useState({})
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
    user.get('files').map().on(f => {
      console.log(f)
      setRows(prevFiles => ({ ...prevFiles, [f.ipfsHash]: f }))
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

  const decryptAndDownload = async (row) => {
    console.log('decryptAndDownload ', row)

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })

    //get the file
    const ipfsGateway = "https://ipfs.litgateway.com/ipfs/"
    const url = ipfsGateway + row.ipfsHash

    const fileAsArrayBuffer = await fetch(url, {
      method: 'GET'
    }).then(response => response.arrayBuffer())

    const { decryptedFile, metadata } = await LitJsSdk.decryptZipFileWithMetadata({
      authSig,
      file: fileAsArrayBuffer,
      litNodeClient: window.litNodeClient
    })

    LitJsSdk.downloadFile({
      filename: metadata.name,
      mimetype: metadata.type,
      data: new Uint8Array(decryptedFile)
    })


  }

  const fileTableColumns = [
    {
      title: 'Name',
      accessor: 'name',
      align: 'left',
      sortable: true,
    },
    // {
    //   title: 'Extension',
    //   accessor: 'extension',
    //   sortable: true,
    // },
    {
      title: 'Size',
      accessor: 'size',
      sortable: true,
      renderCell: (row) => {
        return humanFileSize(row.size)
      }
    },
    {
      title: 'Uploaded',
      accessor: 'uploadedAt',
      sortable: true,
      renderCell: (row) => {
        return new Date(row.uploadedAt * 1000).toLocaleString()
      }
    },
    {
      title: 'Actions',
      renderCell: (row) => {
        return <Button
          label='Download'
          onClick={() => decryptAndDownload(row)}
          iconLeft={IconDownload}
          onlyIcon
          size='s'
        />
      }
    }
  ];

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Files - Decentralized cloud dropbox</h1>
      <h3 className={styles.subtitle}>View and upload files</h3>

      <FileDropper onDrop={onDrop} />

      <div style={{ height: 32 }} />


      <Table
        columns={fileTableColumns}
        rows={Object.values(rows)}
        emptyRowsPlaceholder='No files yet.  Upload some and they will show up here.'
      />



    </div>
  )
}

export default FilesPage

