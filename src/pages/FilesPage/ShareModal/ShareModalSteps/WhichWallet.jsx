import React, { useState } from 'react'

import styles from '../share-modal.module.scss'

import { Button } from "@consta/uikit/Button"
import { IconBackward } from "@consta/uikit/IconBackward"

import { InputWrapper } from '../../../../components'

const WhichWallet = ({setActiveStep}) => {
  const [walletAddress, setWalletAddress] = useState('')

  const handleSubmit = () => {
    setActiveStep('accessCreated')
  }

  return (
    <div>
      <div className={styles.back} onClick={() => setActiveStep('ableToAccess')}>
        <IconBackward view="link" className={styles.icon}/> Back
      </div>
      <div className={styles.titles}>
        <h3>Which wallet should be able to access this file?</h3>
        <a className={styles.link}  onClick={() => setActiveStep('assetWallet')}>Grant Access on NFT Ownership</a>
      </div>
      <div className={styles.form}>
        <InputWrapper
          value={walletAddress}
          className={styles.input}
          label="Add Wallet Address or Blockchain Domain (e.g. ENS, Unstoppable) here:"
          id="walletAddress"
          autoFocus
          size="m"
          handleChange = {(value) => setWalletAddress(value)}
        />
        <Button label="Create  Requirment" className={styles.btn} size="l" onClick={handleSubmit} disabled={!walletAddress} />
      </div>
    </div>
  )
}

export default WhichWallet