import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ShareModal from 'lit-share-modal'

import styles from './files-page.module.scss'

import { Button } from '@consta/uikit/Button'
import { TextField } from '@consta/uikit/TextField'
import { IconAdd } from '@consta/uikit/IconAdd'
import { Breadcrumbs } from '@consta/uikit/Breadcrumbs'

import UploadFilesModal from './UploadFilesModal'
import FilesList from './FilesList'
import Uploader from './Uploader'

import { Modal, Title, UploadButton } from '../../components'

import { useAppContext } from '../../context'

import { getFolder, putFolder } from '../../api/files'
import { getSharingLink } from '../../utils/files'
import AccessCreated from '../../components/AccessCreated/AccessCreated'

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
  const [accessCreatedModalOpen, setAccessCreatedModalOpen] = useState(false)
  const [whatToDoModalOpen, setWhatToDoModalOpen] = useState(false)
  const [accessControlConditions, setAccessControlConditions] = useState(null)
  const [uploadingModalOpen, setUploadingModalOpen] = useState(false)
  const [shareModalStep, setShareModalStep] = useState(null)

  const loadFiles = async () => {
    return performWithAuthSig(async (authSig) => {
      const { files, folders, parentFolders } = await getFolder(
        folderId || '',
        { authSig },
      )
      console.log('got files', files)
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

  const onFirstFilesSelected = (selectedFiles) => {
    setSelectedFiles(selectedFiles)
    setFileDropperModalOpen(true)
  }

  const onFilesSelected = (selectedFiles) => {
    setSelectedFiles(selectedFiles)
    setFileDropperModalOpen(false)

    setShareModalOpen(true)
  }

  const updateFiles = (updatedFiles) => {
    setSelectedFiles(updatedFiles)
  }

  const closeShareModal = () => {
    setShareModalOpen(false)
    setSelectedFiles(null)
  }

  const closeAccessCreatedModal = () => {
    setAccessCreatedModalOpen(false)
  }

  const onAccessControlConditionsSelected = (conditions) => {
    setShareModalOpen(false)
    setAccessControlConditions(conditions.accessControlConditions)
    setUploadingModalOpen(true)
  }

  const onUploaded = (fileMetadatas) => {
    if (selectedFiles.length === 1) {
      setUploadingModalOpen(false)
      setSelectedFiles(fileMetadatas)
      setShareModalOpen(false)
      setAccessCreatedModalOpen(true)
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

  const handleBackFromShareModal = () => {
    setShareModalOpen(false)
    setFileDropperModalOpen(true)
  }

  return (
    <div className={styles.main}>
      <Title
        className={styles.title}
        title="IPFS Encrypted Files"
        subtitle="Upload files to decentralized encrypted storage that can only be decrypted and downloaded by members of your crypto community."
      />

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
      <UploadButton onFilesSelected={onFirstFilesSelected} />
      <span style={{ width: 8, display: 'inline-block' }} />
      <Button
        label="New Folder"
        iconLeft={IconAdd}
        view="secondary"
        onClick={() => setNewFolderModalOpen(true)}
        size="m"
      />

      <Modal
        isOpen={newFolderModalOpen}
        hasOverlay
        title="New Folder"
        onOverlayClick={() => setNewFolderModalOpen(false)}
        onClose={() => setNewFolderModalOpen(false)}
      >
        <div className={styles.folderModal}>
          <TextField
            placeholder="Folder name"
            value={newFolderName}
            onChange={({ value }) => setNewFolderName(value)}
          />{' '}
          <Button
            className={styles.folderSaveButton}
            label="Save"
            onClick={createNewFolder}
          />
        </div>
      </Modal>

      {fileDropperModalOpen ? (
        <UploadFilesModal
          updateFiles={updateFiles}
          selectedFiles={selectedFiles}
          onFilesSelected={onFilesSelected}
          onClose={() => setFileDropperModalOpen(false)}
        />
      ) : null}

      {uploadingModalOpen && (
        <Uploader
          uploadItems={selectedFiles}
          accessControlConditions={accessControlConditions}
          folderId={folderId}
          onUploaded={onUploaded}
        />
      )}

      {shareModalOpen && (
        <ShareModal
          showModal={shareModalOpen}
          onClose={() => {
            handleBackFromShareModal()
          }}
          onAccessControlConditionsSelected={onAccessControlConditionsSelected}
        />
      )}

      {accessCreatedModalOpen ? (
        <AccessCreated
          onClose={() => closeAccessCreatedModal()}
          sharingItems={selectedFiles}
          getSharingLink={getSharingLink}
        />
      ) : null}

      <div style={{ height: 32 }} />

      <FilesList rows={rows} loadFiles={loadFiles} />
    </div>
  )
}

export default FilesPage
