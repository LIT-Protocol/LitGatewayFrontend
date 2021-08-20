import React, { useState } from 'react'

import styles from '../share-modal.module.scss'

import { Button } from "@consta/uikit/Button";
import { IconBackward } from "@consta/uikit/IconBackward"

import { InputWrapper } from '../../../../components'

const DAOMembers = ({setActiveStep}) => {
  const [DAOAdress, setDAOAdress] = useState('')

  const handleSubmit = () => {
    setActiveStep('accessCreated')
  }

  return (
    <div>
      <div className={styles.back} onClick={() => setActiveStep('ableToAccess')}>
        <IconBackward view="link" className={styles.icon}/> Back
      </div>
      <div className={styles.titles}>
        <h3>Which DAO’s members should be able to access this file?</h3>
      </div>
      <div className={styles.form}>
        <InputWrapper
          value={DAOAdress}
          className={styles.input}
          label="Add DAO contract address"
          id="DAOAdress"
          autoFocus
          size="m"
          handleChange = {(value) => setDAOAdress(value)}
        />
        <p>Lit Gateway currently DAOS using the Molochv2.1 contract </p>
        <Button label="Create  Requirment" className={styles.btn} size="l" onClick={handleSubmit} disabled={!DAOAdress} />
      </div>
    </div>
  )
}

export default DAOMembers