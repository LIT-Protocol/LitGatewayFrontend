import React from 'react'
import cx from 'classnames'

import styles from './link-input.module.scss'

import IconLink from './assets/IconLink.svg'

const LinkInput = ({ id, value, className }) => {
  return (
    <div className={cx(styles.linkInput, className)}>
      <div className={styles.copyBtn}>
        <img src={IconLink} />
      </div>
      <input id={id} type="text" value={value} disabled />
    </div>
  )
}

export default LinkInput
