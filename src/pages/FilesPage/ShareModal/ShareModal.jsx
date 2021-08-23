import React, { useState } from 'react'

import styles from './share-modal.module.scss'

import { IconDocFilled } from '@consta/uikit/IconDocFilled'
import { Modal } from '@consta/uikit/Modal'
import { IconClose } from "@consta/uikit/IconClose"

import { WhatToDo, AbleToAccess, WhichWallet, AssetWallet, DAOMembers, AccessCreated, SelectTokens, RecentRequirement } from './ShareModalSteps'

const ModalComponents = {
  whatToDo: WhatToDo,
  ableToAccess: AbleToAccess,
  whichWallet: WhichWallet,
  assetWallet: AssetWallet,
  DAOMembers: DAOMembers,
  accessCreated: AccessCreated,
  selectTokens: SelectTokens,
  recentRequirement: RecentRequirement
}

const ShareModal = (props) => {

  const { onClose, sharingItem } = props

  const [activeStep, setActiveStep] = useState('whatToDo')

  const ModalComponent = (props) => {
    const { type } = props;

    let Component = ModalComponents[type]

    return <Component {...props} sharingItem={sharingItem} />
  }

  return (
    <Modal isOpen={true} hasOverlay>
      <div className={styles.fileModal}>
        <div className={styles.top}>
          <div>
            <IconDocFilled className={styles.icon} view="brand" />
            <div className={styles.fileName}>
              <h3>{sharingItem.name} </h3>
              <a className={styles.link} onClick={() => setActiveStep('recentRequirement')}>5 acceptable access requiments</a>
            </div>
          </div>
          <IconClose className={styles.close} onClick={onClose} />
        </div>
        <div className={styles.body}>
          <ModalComponent type={activeStep} setActiveStep={setActiveStep} />
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal

