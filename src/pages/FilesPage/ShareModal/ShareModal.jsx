import React, { useState } from 'react'

import styles from './share-modal.module.scss'

import { IconDocFilled } from '@consta/uikit/IconDocFilled'
import { Modal } from '@consta/uikit/Modal'
import { IconClose } from "@consta/uikit/IconClose"
import { SnackBar } from '@consta/uikit/SnackBar';

import { WhatToDo, AbleToAccess, WhichWallet, AssetWallet, DAOMembers, AccessCreated, SelectTokens, RecentRequirement, Uploading } from './ShareModalSteps'

import { getSharingLink } from '../../../utils/files'


const ModalComponents = {
  whatToDo: WhatToDo,
  ableToAccess: AbleToAccess,
  whichWallet: WhichWallet,
  assetWallet: AssetWallet,
  DAOMembers: DAOMembers,
  accessCreated: AccessCreated,
  selectTokens: SelectTokens,
  recentRequirement: RecentRequirement,
  uploading: Uploading
}

const ShareModal = (props) => {
  const { onClose, sharingItems, awaitingUpload, folderId } = props

  console.log('rendering ShareModal and sharingItems is', sharingItems)

  const [showingSnackbar, setShowingSnackbar] = useState(false)
  const [activeStep, setActiveStep] = useState('whatToDo')
  const [accessControlConditions, setAccessControlConditions] = useState(null)

  const copyToClipboard = async () => {
    const fileUrl = getSharingLink(sharingItems[0])
    await navigator.clipboard.writeText(fileUrl)
    setShowingSnackbar(true)
    setTimeout(() => setShowingSnackbar(false), 5000)
  }

  const onUploaded = () => {
    console.log('files uploaded!')
  }

  const ModalComponent = (props) => {
    const { type } = props;

    let Component = ModalComponents[type]

    return <Component
      {...props}
      sharingItems={sharingItems}
      awaitingUpload={awaitingUpload}
      copyToClipboard={copyToClipboard}
      accessControlConditions={accessControlConditions}
      setAccessControlConditions={setAccessControlConditions}
      onUploaded={onUploaded}
      folderId={folderId}
    />
  }

  return (
    <Modal isOpen={true} hasOverlay>
      <div className={styles.fileModal}>
        <div className={styles.top}>
          <div>
            <IconDocFilled className={styles.icon} view="brand" />
            <div className={styles.fileName}>
              <h3>
                {sharingItems.length > 1
                  ? `${sharingItems.length} files`
                  : sharingItems[0].name}
              </h3>
              {sharingItems.length === 1 && !awaitingUpload
                ? <a className={styles.link} onClick={() => setActiveStep('recentRequirement')}>5 acceptable access requiments</a>
                : null}
            </div>
          </div>
          <IconClose className={styles.close} onClick={onClose} />
        </div>
        <div className={styles.body}>
          <ModalComponent type={activeStep} setActiveStep={setActiveStep} />
          {showingSnackbar ? <SnackBar styles={styles.snackbar} items={[{ key: 1, message: 'Copied!' }]} /> : null}
        </div>
      </div>

    </Modal>
  )
}

export default ShareModal

