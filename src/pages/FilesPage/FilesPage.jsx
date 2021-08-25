import React, { useCallback, useEffect, useState } from 'react'

import { useParams, useHistory } from "react-router-dom";

import styles from './files-page.module.scss'

import { Button } from "@consta/uikit/Button";
import { TextField } from '@consta/uikit/TextField';
import { IconAdd } from "@consta/uikit/IconAdd";
import { IconUpload } from "@consta/uikit/IconUpload";
import { Modal } from '@consta/uikit/Modal';
import { Breadcrumbs } from '@consta/uikit/Breadcrumbs';

import LitJsSdk from 'lit-js-sdk'
import uint8arrayToString from 'uint8arrays/to-string'

import { putFolder, getFolder } from '../../api/files'
import FilesList from './FilesList'
import FileDropper from './FileDropper'
import { ShareModal } from 'lit-access-control-conditions-modal'
import { getSharingLink } from '../../utils/files'
import Uploader from './Uploader'



const chain = 'fantom'

const FilesPage = () => {
  const params = useParams()
  const { folderId } = params
  const history = useHistory()
  const [parentFolders, setParentFolders] = useState([])
  const [rows, setRows] = useState([])
  const [fileDropperModalOpen, setFileDropperModalOpen] = useState(false);
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('')
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [accessControlConditions, setAccessControlConditions] = useState(null)
  const [uploadingModalOpen, setUploadingModalOpen] = useState(false)
  const [shareModalStep, setShareModalStep] = useState(null)

  const loadFiles = async () => {
    // const accessControlConditionsHashAsArrayBuffer = await LitJsSdk.hashAccessControlConditions(accessControlConditions)
    // const accessControlConditionsHash = uint8arrayToString(new Uint8Array(accessControlConditionsHashAsArrayBuffer), 'base16')
    const { files, folders, parentFolders } = await getFolder(folderId || '')
    // console.log('got files', files)
    // add key
    setRows([
      ...folders.map(f => ({ ...f, key: f.id })),
      ...files.map(f => ({ ...f, key: f.id }))
    ])
    setParentFolders([
      {
        label: 'Home',
        link: '/files'
      },
      ...parentFolders.map(f => ({
        label: f.name,
        link: `/files/folders/${f.id}`
      }))
    ])
  }

  useEffect(() => {
    loadFiles()
  }, [folderId])

  const onFilesSelected = (selectedFiles) => {
    setSelectedFiles(selectedFiles)
    setFileDropperModalOpen(false)
    setShareModalOpen(true)
  }

  const closeShareModal = () => {
    setShareModalOpen(false)
    setSelectedFiles(null)
    setShareModalStep(null)
  }

  const onAccessControlConditionsSelected = (conditions) => {
    setAccessControlConditions(conditions)
    setShareModalOpen(false)
    setUploadingModalOpen(true)
  }

  const onUploaded = () => {
    console.log('upload complete!')
    if (selectedFiles.length === 1) {
      setUploadingModalOpen(false)
      setShareModalStep('accessCreated')
      setShareModalOpen(true)
    }
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
      <h1 className={styles.title}>Files</h1>
      <h3 className={styles.subtitle}>Collaborative Decentralized Encrypted File Storage</h3>
      <div className={styles.path}>
        {parentFolders.length > 0
          ? <Breadcrumbs
            pages={parentFolders}
            getLabel={(page) => page.label}
            getLink={(page) => page.link}
            onClick={(page, e) => {
              e.preventDefault();
              history.push(page.link)
            }}
          />
          : null
        }
      </div>
      <div style={{ height: 16 }} />
      <Button
        label="Upload"
        iconLeft={IconUpload}
        onClick={() => setFileDropperModalOpen(true)}
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
        isOpen={fileDropperModalOpen}
        hasOverlay
        onOverlayClick={() => setFileDropperModalOpen(false)}
      >
        <div style={{ margin: 16 }}>
          <h3 className={styles.subtitle}>Upload Files</h3>
          <FileDropper
            onFilesSelected={onFilesSelected}
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

      <Modal
        isOpen={uploadingModalOpen}
        hasOverlay
        onOverlayClick={() => setUploadingModalOpen(false)}
      >
        <div style={{ margin: 16 }}>
          <Uploader
            uploadItems={selectedFiles}
            accessControlConditions={accessControlConditions}
            folderId={folderId}
            onUploaded={onUploaded}
          />
        </div>

      </Modal>

      {shareModalOpen ? (
        <ShareModal
          onClose={() => closeShareModal()}
          sharingItems={selectedFiles}
          onAccessControlConditionsSelected={onAccessControlConditionsSelected}
          getSharingLink={getSharingLink}
          showStep={shareModalStep}
        />
      ) : null}

      <div style={{ height: 32 }} />

      <FilesList rows={rows} chain={chain} />

    </div>
  )
}

export default FilesPage

