import React, { useMemo, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import uint8arrayToString from 'uint8arrays/to-string'
import LitJsSdk from 'lit-js-sdk'
import { v4 as uuidv4 } from 'uuid';
import { putFile } from '../../api/files'
import { getFileLink } from '../../utils/files'
import { ProgressSpin } from '@consta/uikit/ProgressSpin';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: 'rgb(119 119 119)',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const PINATA_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZTRlMWFkOC0xZDg3LTRlMzMtYmYyMC0zYWE3NjRhODc3YzQiLCJlbWFpbCI6ImNocmlzQGhlbGxvYXByaWNvdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiM2IxMTViMmZjMmY2M2E5YTRmYTYiLCJzY29wZWRLZXlTZWNyZXQiOiIyYjU5YmMzODI3ZGVhZGJiMjI4NzA3YzBmY2Q1YmYxMzBmYmZkNmUyMmZlMDEzMTZkMWNhNDc2MTU2MGE5NmRkIiwiaWF0IjoxNjI4ODg5NjYxfQ.HPXygfPqPRBnGOtQbPRjE1AH7L3l2qqfkPKWodqwNHM'



const FileDropper = (props) => {

  const {
    accessControlConditions,
    chain,
    onUploaded,
    folderId
  } = props
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles) => {
    // get the auth sig first, because if the user denies this, we have nothing to do
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })

    setUploading(true)

    const fileUploadPromises = []
    for (let i = 0; i < acceptedFiles.length; i++) {
      console.log(`processing ${i + 1} of ${acceptedFiles.length}`)

      const file = acceptedFiles[i]
      const fileId = uuidv4()
      const fileShareUrl = getFileLink(fileId)
      const readme = `Well hello there!  If you're reading this, then you are looking at a zip file with assets encrypted via the Lit Protocol.  You won't be able to open these encrypted assets unless you meet the on-chain access control conditions and use the Lit JS SDK to decrypt them.  To decrypt this file, please visit this url in your browser: ${fileShareUrl}`
      const zipBlob = await LitJsSdk.encryptFileAndZipWithMetadata({
        authSig,
        accessControlConditions,
        chain,
        file,
        litNodeClient: window.litNodeClient,
        readme
      })

      const formData = new FormData()
      formData.append('file', zipBlob)

      fileUploadPromises.push(
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
            return LitJsSdk.hashAccessControlConditions(accessControlConditions)
              .then(accessControlConditionsHashAsArrayBuffer => {
                const accessControlConditionsHash = uint8arrayToString(new Uint8Array(accessControlConditionsHashAsArrayBuffer), 'base16')
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
                  accessControlConditions,
                  accessControlConditionsHash,
                  fileId,
                  chain,
                  folderId: folderId ? folderId : null
                }

                return putFile({ file: fileMetadata, authSig })
              })
          })
      )
    }

    const fileUploads = await Promise.all(fileUploadPromises)
    console.log('file upload complete:', fileUploads)
    setUploading(false)
    onUploaded()
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop })


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return uploading
    ? (
      <ProgressSpin />
    )
    : (
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    )


}


export default FileDropper