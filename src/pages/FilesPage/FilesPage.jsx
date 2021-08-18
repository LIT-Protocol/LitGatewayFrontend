import React, { useCallback, useEffect, useState } from 'react'

import { Link } from "react-router-dom";
import styles from './files-page.module.scss'
import { Grid, GridItem } from "@consta/uikit/Grid";
import { Button } from "@consta/uikit/Button";
import { TextField } from '@consta/uikit/TextField';
import { IconAdd } from "@consta/uikit/IconAdd";
import { IconUpload } from "@consta/uikit/IconUpload";
import FileDropper from './FileDropper'
import LitJsSdk from 'lit-js-sdk'
import uint8arrayFromString from 'uint8arrays/from-string'
import uint8arrayToString from 'uint8arrays/to-string'
import { humanFileSize } from '../../utils/files'
import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import { Modal } from '@consta/uikit/Modal';
import { putFile, getFiles } from '../../api/files'
import FilesList from './FilesList'
import ShareFile from './ShareFile'

const chain = 'fantom'

const FilesPage = () => {
  const [rows, setRows] = useState([])
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('')

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

  const loadFiles = async () => {
    const accessControlConditionsHashAsArrayBuffer = await LitJsSdk.hashAccessControlConditions(accessControlConditions)
    const accessControlConditionsHash = uint8arrayToString(new Uint8Array(accessControlConditionsHashAsArrayBuffer), 'base16')
    const { files } = await getFiles(accessControlConditionsHash)
    console.log('got files', files)
    // add key
    setRows(files.map(f => ({ ...f, key: f.id })))
  }

  useEffect(() => {
    loadFiles()
  }, [])

  const onUploaded = () => {
    loadFiles()
    setUploadModalOpen(false)
  }

  const createNewFolder = () => {
    setNewFolderModalOpen(false)
    console.log('creating folder with name ', newFolderName)
    setNewFolderName('')
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Files - Decentralized cloud dropbox</h1>
      <h3 className={styles.subtitle}>View and upload files</h3>

      <Button
        label="Upload"
        iconLeft={IconUpload}
        onClick={() => setUploadModalOpen(true)}
      />
      <span style={{ width: 8, display: 'inline-block' }} />
      <Button
        label="New Folder"
        iconLeft={IconAdd}
        view='secondary'
        onClick={() => setNewFolderModalOpen(true)}
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

