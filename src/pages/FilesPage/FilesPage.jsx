import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ShareModal } from 'lit-access-control-conditions-modal'

import styles from './files-page.module.scss'

import { Button } from '@consta/uikit/Button'
import { TextField } from '@consta/uikit/TextField'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconUpload } from '@consta/uikit/IconUpload'
import { Modal } from '@consta/uikit/Modal'
import { Breadcrumbs } from '@consta/uikit/Breadcrumbs'

import FilesList from './FilesList'
import FileDropper from './FileDropper'
import Uploader from './Uploader'

import { useAppContext } from '../../context'

import { putFolder, getFolder } from '../../api/files'
import { getSharingLink } from '../../utils/files'

const FilesPage = () => {
  const { folderId } = useParams()
  const history = useHistory()
  const { performWithAuthSig } = useAppContext()

  const [parentFolders, setParentFolders] = useState([])
  const [rows, setRows] = useState([])
  const [fileDropperModalOpen, setFileDropperModalOpen] = useState(false)
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [accessControlConditions, setAccessControlConditions] = useState(null)
  const [uploadingModalOpen, setUploadingModalOpen] = useState(false)
  const [shareModalStep, setShareModalStep] = useState(null)

  const loadFiles = async () => {
    return performWithAuthSig(async (authSig) => {
      const { files, folders, parentFolders } = await getFolder(
        folderId || '',
        { authSig },
      )
      // console.log('got files', files)
      // add key
      setRows([
        ...folders.map((f) => ({ ...f, key: f.id })),
        ...files.map((f) => ({ ...f, key: f.id })),
      ])
      setParentFolders([
        {
          label: 'Home',
          link: '/files',
        },
        ...parentFolders.map((f) => ({
          label: f.name,
          link: `/files/folders/${f.id}`,
        })),
      ])
      return files
    })
  }

  useEffect(() => {
    loadFiles()
  }, [folderId])

  const onFilesSelected = (selectedFiles) => {
    setSelectedFiles(selectedFiles)
    setFileDropperModalOpen(false)
    setShareModalStep('ableToAccess')
    setShareModalOpen(true)
  }

  const closeShareModal = () => {
    setShareModalOpen(false)
    setSelectedFiles(null)
    setShareModalStep(null)
  }

  const onAccessControlConditionsSelected = (conditions) => {
    console.log('onAccessControlConditionsSelected:', conditions)
    setAccessControlConditions(conditions)
    setShareModalOpen(false)
    setUploadingModalOpen(true)
  }

  const onUploaded = (fileMetadatas) => {
    console.log('upload complete!', fileMetadatas)
    if (selectedFiles.length === 1) {
      setUploadingModalOpen(false)
      setSelectedFiles(fileMetadatas)
      setShareModalStep('accessCreated')
      setShareModalOpen(true)
    } else {
      setUploadingModalOpen(false)
    }
    loadFiles()
  }

  const createNewFolder = async () => {
    await performWithAuthSig(async (authSig) => {
      setNewFolderModalOpen(false)

      console.log('creating folder with name ', newFolderName)
      await putFolder({
        name: newFolderName,
        folderId: folderId ? folderId : null,
        authSig,
      })
    })

    loadFiles()
    setNewFolderName('')
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Files</h1>
      <h3 className={styles.subtitle}>
        Collaborative Decentralized Encrypted File Storage
      </h3>
      <div className={styles.path}>
        {parentFolders.length > 0 ? (
          <Breadcrumbs
            pages={parentFolders}
            getLabel={(page) => page.label}
            getLink={(page) => page.link}
            onClick={(page, e) => {
              e.preventDefault()
              history.push(page.link)
            }}
          />
        ) : null}
      </div>
      <div style={{ height: 16 }} />
      <Button
        label="Upload"
        iconLeft={IconUpload}
        onClick={() => setFileDropperModalOpen(true)}
        size="m"
      />
      <span style={{ width: 8, display: 'inline-block' }} />
      <Button
        label="New Folder"
        iconLeft={IconAdd}
        view="secondary"
        onClick={() => setNewFolderModalOpen(true)}
        size="m"
      />

      <Modal
        isOpen={fileDropperModalOpen}
        hasOverlay
        onOverlayClick={() => setFileDropperModalOpen(false)}
      >
        <div style={{ margin: 16 }}>
          <h3 className={styles.subtitle}>Upload Files</h3>
          <FileDropper onFilesSelected={onFilesSelected} />
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
            placeholder="Folder name"
            value={newFolderName}
            onChange={({ value }) => setNewFolderName(value)}
          />{' '}
          <Button label="Save" onClick={createNewFolder} />
        </div>
      </Modal>

      {uploadingModalOpen ? (
        <Modal isOpen={uploadingModalOpen} hasOverlay>
          <div style={{ margin: 16 }}>
            <Uploader
              uploadItems={selectedFiles}
              accessControlConditions={accessControlConditions}
              folderId={folderId}
              onUploaded={onUploaded}
            />
          </div>
        </Modal>
      ) : null}

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

      <FilesList rows={rows} loadFiles={loadFiles} />
    </div>
  )
}

export default FilesPage
