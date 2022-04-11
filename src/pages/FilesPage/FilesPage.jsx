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
    console.log('onFirstFilesSelected')
    setSelectedFiles(selectedFiles)
    // setFileDropperModalOpen(true)
  }

  const onFilesSelected = (selectedFiles) => {
    console.log('SET SELECTED FILES')
    console.log(selectedFiles)
    setSelectedFiles(selectedFiles)
    setFileDropperModalOpen(false)

    // todo: remove sharemodalstep
    // setShareModalStep('ableToAccess')
    setShareModalOpen(true)
  }

  const updateFiles = (updatedFiles) => {
    console.log('updateFiles')
    setSelectedFiles(updatedFiles)
  }

  // const closeShareModal = () => {
  //   console.log('closeShareModal')
  //   setShareModalOpen(false)
  //   setSelectedFiles(null)
  //   // setShareModalStep(null)
  //   // todo: show whattodo modal
  // }

  const closeAccessCreatedModal = () => {
    setAccessCreatedModalOpen(false)
  }

  const onAccessControlConditionsSelected = (conditions) => {
    console.log('onAccessControlConditionsSelected:', conditions)
    console.log('selectedFiles', selectedFiles)
    setAccessControlConditions(conditions.accessControlConditions)
    setShareModalOpen(false)
    setUploadingModalOpen(true)
  }

  const onUploaded = (fileMetadatas) => {
    console.log('upload complete!', fileMetadatas)
    if (selectedFiles.length === 1) {
      setUploadingModalOpen(false)
      // setSelectedFiles(fileMetadatas)
      // setShareModalStep('accessCreated')
      // setShareModalOpen(false)
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
    console.log('handleBackFromShareModal')
    setShareModalOpen(false)
    // setShareModalStep(null)
    // todo: show whattodomodal
    // setWhatToDoModalOpen(true)
    setFileDropperModalOpen(true)
  }

  return (
    <div className={styles.main}>
      {/* <h1 className={styles.title}>Files</h1>
      <h3 className={styles.subtitle}>
        Collaborative Decentralized Encrypted File Storage
      </h3> */}

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

      {fileDropperModalOpen ? (
        <UploadFilesModal
          updateFiles={updateFiles}
          selectedFiles={selectedFiles}
          onFilesSelected={onFilesSelected}
          onClose={() => setFileDropperModalOpen(false)}
        />
      ) : null}

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

      {uploadingModalOpen && (
        <Uploader
          uploadItems={selectedFiles}
          accessControlConditions={accessControlConditions}
          folderId={folderId}
          onUploaded={onUploaded}
        />
      )}

      {/*{shareModalOpen ? (*/}
      {/*  <ShareModal*/}
      {/*    onClose={() => closeShareModal()}*/}
      {/*    onBack={handleBackFromShareModal}*/}
      {/*    sharingItems={selectedFiles}*/}
      {/*    onAccessControlConditionsSelected={onAccessControlConditionsSelected}*/}
      {/*    getSharingLink={getSharingLink}*/}
      {/*    showStep={shareModalStep}*/}
      {/*  />*/}
      {/*) : null}*/}

      {shareModalOpen && (
        <ShareModal
          showModal={shareModalOpen}
          onClose={() => handleBackFromShareModal()}
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
