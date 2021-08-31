import React from 'react'
import cx from 'classnames'

import styles from './quantity-input-wrapper.module.scss'

import { TextField } from '@consta/uikit/TextField'
import { Button } from '@consta/uikit/Button'
import { IconArrowUp } from '@consta/uikit/IconArrowUp'
import { IconArrowDown } from '@consta/uikit/IconArrowDown'

const QuantityInputWrapper = ({
  className,
  id,
  label,
  value,
  handleChange = () => false,
  placeholder,
  size,
  withNegative = false
}) => {

  const handleQuantityUp = () => {
    handleChange(+value + 1)
  }
  const handleQuantityDown = () => {
    if(withNegative) {
      if(value > 1) {
        handleChange(value - 1)
      }
    } else {
      handleChange(value - 1)
    }
  }

  return (
    <div className={cx(styles.input, className)}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.quantity}>
        <TextField
          type="number"
          id={id}
          value={value}
          onChange={({ value }) => handleChange(value)}
          placeholder={placeholder}
          size={size}
          className={styles.textField}
        />
        <div className={styles.btns}>
          <Button onClick={handleQuantityUp} className={styles.btn} size="xs" iconLeft={IconArrowUp} onlyIcon />
          <Button onClick={handleQuantityDown} disabled={!withNegative && value <= 1} className={styles.btn} size="xs" iconLeft={IconArrowDown} onlyIcon/>
        </div>
      </div>
    </div>
  )
}

export default QuantityInputWrapper
