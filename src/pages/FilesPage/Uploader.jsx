import React, { useState, useEffect } from 'react'
import axios from 'axios'
import LitJsSdk from 'lit-js-sdk'
import { v4 as uuidv4 } from 'uuid'
import uint8arrayToString from 'uint8arrays/to-string'

import styles from './files-page.module.scss'

import { Table } from '@consta/uikit/Table'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'

import { Modal } from 'components'

import { useAppContext } from '../../context'

import { putFile } from '../../api/files'
import { getSharingLink } from '../../utils/files'

const PINATA_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZTRlMWFkOC0xZDg3LTRlMzMtYmYyMC0zYWE3NjRhODc3YzQiLCJlbWFpbCI6ImNocmlzQGhlbGxvYXByaWNvdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2IxMTViMmZjMmY2M2E5YTRmYTYiLCJzY29wZWRLZXlTZWNyZXQiOiIyYjU5YmMzODI3ZGVhZGJiMjI4NzA3YzBmY2Q1YmYxMzBmYmZkNmUyMmZlMDEzMTZkMWNhNDc2MTU2MGE5NmRkIiwiaWF0IjoxNjI4ODg5NjYxfQ.HPXygfPqPRBnGOtQbPRjE1AH7L3l2qqfkPKWodqwNHM'

const Uploader = ({
  uploadItems,
  accessControlConditions,
  onUploaded,
  folderId,
}) => {
  const { performWithAuthSig } = useAppContext()

  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [uploadComplete, setUploadComplete] = useState(false)

  useEffect(() => {
    ;(async function () {
      const chain = accessControlConditions[0].chain

      // get the auth sig first, because if the user denies this, we have nothing to do
      performWithAuthSig(
        async (authSig) => {
          setUploading(true)
          console.log('Uploading...')
          console.log(`There are ${uploadItems.length} items to upload`)

          const creatorAccessControlCondition = [
            {
              contractAddress: '',
              standardContractType: '',
              chain,
              method: '',
              parameters: [':userAddress'],
              returnValueTest: {
                comparator: '=',
                value: authSig.address,
              },
            },
          ]

          console.log(
            'creatorAccessControlCondition',
            creatorAccessControlCondition,
          )
          console.log(
            'rest of accessControlConditions',
            accessControlConditions,
          )

          const fileUploadPromises = []
          const fileMetadatas = []
          for (let i = 0; i < uploadItems.length; i++) {
            console.log(`processing ${i + 1} of ${uploadItems.length}`)

            const file = uploadItems[i]
            console.log('file is ', file)
            const fileId = uuidv4()
            const fileShareUrl = getSharingLink({ id: fileId, ipfsHash: true })
            const readme = `Well hello there!  If you're reading this, then you are looking at a zip file with assets encrypted via the Lit Protocol.  You won't be able to open these encrypted assets unless you meet the on-chain access control conditions and use the Lit JS SDK to decrypt them.  To decrypt this file, please visit this url in your browser: ${fileShareUrl}`

            // so first, we encrypt the file itself with a random symmetric key
            // using the creator's address as the access control condition.
            // this ensures that the creator will always be able to access and
            // reencrypt the file if needed
            const { zipBlob, encryptedSymmetricKey, symmetricKey } =
              await LitJsSdk.encryptFileAndZipWithMetadata({
                authSig,
                accessControlConditions: creatorAccessControlCondition,
                chain,
                file,
                litNodeClient: window.litNodeClient,
                readme,
              })

            // second, we encrypt the symmetric key generated above under the
            // access control conditions defined by the user in the modal
            // this is added as an additionalAccessControlCondition on the file
            // the BLS encryption is non-deterministic so this will "just work"
            // even though we are storing the same symmetric key
            const additionalAccessControlConditionEncryptedSymmetricKey =
              await window.litNodeClient.saveEncryptionKey({
                accessControlConditions,
                chain,
                authSig,
                symmetricKey,
              })

            const additionalAccessControlConditions = [
              {
                accessControlConditions,
                encryptedSymmetricKey: uint8arrayToString(
                  additionalAccessControlConditionEncryptedSymmetricKey,
                  'base16',
                ),
              },
            ]

            const formData = new FormData()
            formData.append('file', zipBlob)

            fileUploadPromises.push(
              axios
                .post(
                  'https://api.pinata.cloud/pinning/pinFileToIPFS',
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${PINATA_API_KEY}`,
                      'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: function (progressEvent) {
                      var percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                      )
                      setUploadProgress((prevUploadProgress) => ({
                        ...prevUploadProgress,
                        [file.name]: percentCompleted,
                      }))
                    },
                  },
                )
                .then((response) => {
                  const { data } = response
                  console.log('file uploaded: ', data)
                  return LitJsSdk.hashAccessControlConditions(
                    creatorAccessControlCondition,
                  ).then((accessControlConditionsHashAsArrayBuffer) => {
                    const accessControlConditionsHash = uint8arrayToString(
                      new Uint8Array(accessControlConditionsHashAsArrayBuffer),
                      'base16',
                    )
                    let extension = ''
                    const fileParts = file.name.split('.')
                    if (fileParts.length > 1) {
                      extension = fileParts[fileParts.length - 1]
                    }
                    const fileMetadata = {
                      name: file.name,
                      type: file.type,
                      size: file.size,
                      ipfsHash: data.IpfsHash,
                      extension,
                      uploadedAt: Math.floor(Date.now() / 1000),
                      accessControlConditions: creatorAccessControlCondition,
                      accessControlConditionsHash,
                      additionalAccessControlConditions,
                      fileId,
                      chain,
                      encryptedSymmetricKey: uint8arrayToString(
                        encryptedSymmetricKey,
                        'base16',
                      ),
                      folderId: folderId ? folderId : null,
                    }
                    fileMetadatas.push({ ...fileMetadata, id: fileId })

                    return putFile({ file: fileMetadata, authSig })
                  })
                }),
            )
          }

          const fileUploads = await Promise.all(fileUploadPromises)
          console.log('file upload complete:', fileUploads)
          setUploading(false)
          setUploadComplete(true)
          onUploaded(fileMetadatas)
        },
        { chain },
      )
    })()
  }, [accessControlConditions])
  // }, [uploadItems, accessControlConditions])

  const columns = [
    {
      title: 'Name',
      accessor: 'name',
      align: 'left',
      sortable: true,
      renderCell: (row) => {
        console.log('rendering', row)
        return row.file.name
      },
    },
    {
      title: 'Progress',
      renderCell: (row) => {
        return <ProgressSpin progress={row.progress ? row.progress : 0} />
      },
    },
  ]

  return (
    <Modal
      isOpen={true}
      hasOverlay
      title={uploadComplete ? 'Upload complete' : 'Uploading, please wait...'}
    >
      <div>
        <Table
          rows={uploadItems.map((s) => ({
            file: s,
            progress: uploadProgress[s.name],
          }))}
          columns={columns}
        />
      </div>
    </Modal>
  )
}

export default Uploader
