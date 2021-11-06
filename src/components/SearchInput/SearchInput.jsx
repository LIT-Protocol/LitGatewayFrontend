import React, { useState } from 'react'
import cx from 'classnames'

import styles from './search-input.module.scss'

import { TextField } from '@consta/uikit/TextField'
import { IconClose } from '@consta/uikit/IconClose'
import { IconSearch } from '@consta/uikit/IconSearch'

const SearchInput = ({
  type = 'text',
  className,
  id,
  value,
  handleChange = () => false,
  readOnly = false,
  autoFocus = false,
  size,
  onClear = () => false,
  rows,
}) => {
  const [show, setShow] = useState(false)

  const handleClear = () => {
    setShow(false)
    onClear()
  }

  return (
    <div className={cx(styles.input, className)}>
      <div className={cx(styles.wrap, show ? styles.showWrap : null)}>
        <IconClose
          size="s"
          className={styles.clearable}
          onClick={handleClear}
        />
        <TextField
          readOnly={readOnly}
          type={type}
          id={id}
          value={value}
          onChange={({ value }) => handleChange(value)}
          autoFocus={autoFocus}
          placeholder="Search..."
          leftSide={IconSearch}
          size={size}
          rows={rows}
          className={cx(styles.innerInput, show ? styles.showInput : null)}
        />
      </div>
      <IconSearch
        size="m"
        view="brand"
        className={cx(styles.search, show ? styles.hideSearch : null)}
        onClick={() => setShow(true)}
      />
    </div>
  )
}

export default SearchInput
