import React, { useCallback, useEffect, useState } from 'react'

import { useParams, Link } from "react-router-dom";

import styles from './files-page.module.scss'

import { Button } from "@consta/uikit/Button";
import { TextField } from '@consta/uikit/TextField';
import { IconAdd } from "@consta/uikit/IconAdd";
import { IconUpload } from "@consta/uikit/IconUpload";
import { Modal } from '@consta/uikit/Modal';

import LitJsSdk from 'lit-js-sdk'
import uint8arrayToString from 'uint8arrays/to-string'

import { putFolder, getFolder } from '../../api/files'
import FilesList from './FilesList'
import FileDropper from './FileDropper'


const chain = 'fantom'

const FilesPage = () => {
  const params = useParams()
  const { folderId } = params
  const [parentFolders, setParentFolders] = useState([])
  const [rows, setRows] = useState([])
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('')

  // pick the access control conditions
  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain,
      method: 'eth_getBalance',
      parameters: [
        ':userAddress',
        'latest'
      ],
      returnValueTest: {
        comparator: '>=',
        value: '10000000000000'
      }
    }
  ]

  const loadFiles = async () => {
    const accessControlConditionsHashAsArrayBuffer = await LitJsSdk.hashAccessControlConditions(accessControlConditions)
    const accessControlConditionsHash = uint8arrayToString(new Uint8Array(accessControlConditionsHashAsArrayBuffer), 'base16')
    const { files, folders, parentFolders } = await getFolder(folderId || '')
    // console.log('got files', files)
    // add key
    setRows([
      ...folders.map(f => ({ ...f, key: f.id })),
      ...files.map(f => ({ ...f, key: f.id }))
    ])
    setParentFolders(parentFolders)
  }

  useEffect(() => {
    loadFiles()
  }, [folderId])

  const onUploaded = () => {
    loadFiles()
    setUploadModalOpen(false)
  }

  const createNewFolder = async () => {
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    setNewFolderModalOpen(false)
    console.log('creating folder with name ', newFolderName)
    await putFolder({
      name: newFolderName,
      folderId: folderId ? folderId : null,
      authSig
    })
    loadFiles()
    setNewFolderName('')
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Files - Decentralized cloud dropbox</h1>
      <h3 className={styles.subtitle}>View and upload files</h3>
      <div className={styles.path}>
        {parentFolders.length > 0
          ? [
            <>
              <Link to={`/files/`}>Home</Link>
              {' / '}
            </>,
            ...parentFolders.map((f, i) => (
              <>
                <Link to={`/files/folders/${f.id}`}>{f.name}</Link>
                {i !== parentFolders.length - 1 ? ' / ' : ''}
              </>
            ))
          ]
          : ''
        }
      </div>
      <div style={{ height: 16 }} />
      <Button
        label="Upload"
        iconLeft={IconUpload}
        onClick={() => setUploadModalOpen(true)}
        size='m'
      />
      <span style={{ width: 8, display: 'inline-block' }} />
      <Button
        label="New Folder"
        iconLeft={IconAdd}
        view='secondary'
        onClick={() => setNewFolderModalOpen(true)}
        size='m'
      />

      <Modal
        isOpen={uploadModalOpen}
        hasOverlay
        onOverlayClick={() => setUploadModalOpen(false)}
      >
        <div style={{ margin: 16 }}>
          <h3 className={styles.subtitle}>Upload Files</h3>
          <FileDropper
            onUploaded={onUploaded}
            accessControlConditions={accessControlConditions}
            chain={chain}
            folderId={folderId}
          />
        </div>

      </Modal>

      <Modal
        isOpen={newFolderModalOpen}
        hasOverlay
        onOverlayClick={() => setNewFolderModalOpen(false)}
      >
        <div style={{ margin: 16 }}>
          <h3 className={styles.subtitle}>New Folder</h3>
          <TextField
            placeholder='Folder name'
            value={newFolderName}
            onChange={({ value }) => setNewFolderName(value)}
          />
          {' '}
          <Button
            label='Save'
            onClick={createNewFolder}
          />
        </div>

      </Modal>

      <div style={{ height: 32 }} />

      <FilesList rows={rows} chain={chain} />

    </div>
  )
}

export default FilesPage

