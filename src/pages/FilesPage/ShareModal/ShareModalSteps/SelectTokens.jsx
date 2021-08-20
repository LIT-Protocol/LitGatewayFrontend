import React, { useState } from 'react'
import Select from 'react-select'

import styles from '../share-modal.module.scss'

import { Button } from "@consta/uikit/Button"
import { IconBackward } from "@consta/uikit/IconBackward"

import { InputWrapper } from '../../../../components'

const wallets = [
  { value: "PancakeSwap", label: "PancakeSwap", image: "https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png" },
  { value: "Dai", label: "Dai", image: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png" },
  { value: "1inch", label: "1inch", image: "https://s2.coinmarketcap.com/static/img/coins/64x64/8104.png" }
];

const SelectTokens = ({ setActiveStep }) => {
  const [amount, setAmount] = useState('')
  const [selectedTokens, setSelectedTokens] = useState([])


  const handleSubmit = () => {
    setActiveStep('accessCreated')
  }

  const formatOptionLabel = ({ value, label, image }) => (
    <div style={{ display: "flex" }}>
      <img className={styles.selectIcon} src={image} alt="img" />
      <div>{label}</div>
    </div>
  );

  return (
    <div>
      <div className={styles.back} onClick={() => setActiveStep('ableToAccess')}>
        <IconBackward view="link" className={styles.icon} /> Back
      </div>
      <div className={styles.titles}>
        <h3>Which wallets should be able to access this file?</h3>
      </div>
      <div className={styles.form}>
        <div className={styles.select}>
          <span className={styles.label}>Select token</span>
          <Select
            defaultValue={wallets[0]}
            formatOptionLabel={formatOptionLabel}
            options={wallets}
            isMulti
            value={selectedTokens}
            onChange={value => setSelectedTokens(value)}
          />
        </div>
        <InputWrapper
          value={amount}
          className={styles.input}
          label="How Many ETH Does the Wallet need to Own?"
          id="amount"
          autoFocus
          size="m"
          handleChange={(value) => setAmount(value)}
        />
        <Button label="Create  Requirment" className={styles.btn} size="l" onClick={handleSubmit} disabled={!amount || !selectedTokens.length } />
      </div>
    </div>
  )
}

export default SelectTokens