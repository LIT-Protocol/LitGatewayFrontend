import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import styles from './share-link.module.scss'

import icon from './assets/fire_check.svg'

import { Button } from '@consta/uikit/Button'

import Modal from '../Modal'
import LinkInput from '../LinkInput'

const ShareLinkModal = ({ subtitle, onClose, otherBtns, link }) => {
  const [label, setLabel] = useState('Copy link')

  const handleCopyLink = () => {
    setLabel('Copied!')
    setTimeout(() => {
      setLabel('Copy link')
    }, 3000)
  }
  return (
    <Modal isOpen={true} title="CONFIRMATION" onClose={onClose}>
      <div className={styles.body}>
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <img className={styles.checkIcon} src={icon} alt="icon" />
        <LinkInput className={styles.link} value={link} />
        <div className={styles.btns}>
          {otherBtns}
          <CopyToClipboard text={link} onCopy={handleCopyLink}>
            <Button size="l" className={styles.btnLink} label={label} />
          </CopyToClipboard>
        </div>
      </div>
    </Modal>
  )
}

export default ShareLinkModal
