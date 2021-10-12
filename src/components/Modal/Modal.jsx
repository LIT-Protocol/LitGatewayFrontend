import React, { useState } from 'react'
import cx from 'classnames'

import styles from './modal.module.scss'

import UnsavedPopup from './UnsavedPopup'

import { Modal } from '@consta/uikit/Modal'

import { Icons } from '../'

const ModalComponent = (props) => {
  const {
    isOpen,
    children,
    withCloseButton = true,
    unsavedPopup = false,
    onClose = () => false,
  } = props

  const passedProps = { ...props }
  delete passedProps.children
  delete passedProps.withCloseButton
  delete passedProps.onClose
  delete passedProps.unsavedPopup

  const [showUnsavedPopup, setShowUnsavedPopup] = useState(false)

  const handleClose = () => {
    if (!unsavedPopup) {
      onClose()
    } else {
      setShowUnsavedPopup(true)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <Modal
      {...passedProps}
      onOverlayClick={handleClose}
      className={cx(passedProps.className, styles.modal)}
    >
      {showUnsavedPopup ? (
        <UnsavedPopup
          onClose={onClose}
          onCancel={() => setShowUnsavedPopup(false)}
        />
      ) : null}

      {withCloseButton ? (
        <div className={styles.closeButton}>
          <Icons.Close onClick={handleClose} />
        </div>
      ) : null}

      {children}
    </Modal>
  )
}

export default ModalComponent
