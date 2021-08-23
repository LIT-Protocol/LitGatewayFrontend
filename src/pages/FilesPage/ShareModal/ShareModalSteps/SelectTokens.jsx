import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable';
import { parseEther } from '@ethersproject/units'

import styles from '../share-modal.module.scss'
import tokens from '../../../../tokens.json'

import { Button } from "@consta/uikit/Button"
import { IconBackward } from "@consta/uikit/IconBackward"

import { InputWrapper } from '../../../../components'

// const addresses = [
//   { value: "PancakeSwap", label: "PancakeSwap", image: "https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png" },
//   { value: "Dai", label: "Dai", image: "https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png" },
//   { value: "1inch", label: "1inch", image: "https://s2.coinmarketcap.com/static/img/coins/64x64/8104.png" }
// ];

const SelectTokens = ({ setActiveStep, awaitingUpload, setAccessControlConditions }) => {
  const [amount, setAmount] = useState('')
  const [selectedToken, setSelectedToken] = useState(null)

  const chain = 'fantom'

  const handleSubmit = () => {
    console.log('handleSubmit and selectedToken is', selectedToken)
    if (selectedToken.value === 'ethereum') {
      // ethereum
      const amountInWei = parseEther(amount)
      const accessControlConditions = [
        {
          contractAddress: '',
          standardContractType: '',
          chain,
          method: 'eth_getBalance',
          parameters: [
            ':userAddress',
            'latest'
          ],
          returnValueTest: {
            comparator: '>=',
            value: amountInWei.toString()
          }
        }
      ]
      setAccessControlConditions(accessControlConditions)
    } else {
      // erc20 token
      // get number of decimals in the token and convert
      const amountInWei = parseEther(amount)
      const accessControlConditions = [
        {
          contractAddress: selectedToken.address,
          standardContractType: 'ERC20',
          chain,
          method: 'balanceOf',
          parameters: [
            ':userAddress'
          ],
          returnValueTest: {
            comparator: '>=',
            value: amountInWei.toString()
          }
        }
      ]
      setAccessControlConditions(accessControlConditions)
    }
    if (awaitingUpload) {
      setActiveStep('uploading')
    } else {
      setActiveStep('accessCreated')
    }
  }

  const formatOptionLabel = (option, extra) => {
    const { name, logoURI, value } = option
    const { inputValue } = extra

    console.log('option', option)
    console.log('extra', extra)

    if (inputValue) {
      return inputValue
    }

    if (value) {
      return value
    }

    return (
      <div style={{ display: "flex" }}>
        {logoURI ?
          <img className={styles.selectIcon} src={logoURI} alt="img" />
          : null
        }
        <div>{name}</div>
      </div>
    )
  };

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
          <CreatableSelect
            isClearable
            defaultValue={''}
            formatOptionLabel={formatOptionLabel}
            getOptionValue={(option) => option.address}
            options={[
              {
                name: 'Ethereum',
                logoURI: null,
                address: 'ethereum'
              },
              ...tokens.tokens
            ]}
            value={selectedToken}
            // getNewOptionData={inputValue => ({ name: inputValue })}
            onChange={value => setSelectedToken(value)}
          />
        </div>
        <InputWrapper
          value={amount}
          className={styles.input}
          label="How many tokens does the wallet need to own?"
          id="amount"
          autoFocus
          size="m"
          handleChange={(value) => setAmount(value)}
        />
        <Button label="Create Requirement" className={styles.btn} size="l" onClick={handleSubmit} disabled={!amount || !selectedToken} />
      </div>
    </div>
  )
}

export default SelectTokens