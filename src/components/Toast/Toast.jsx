import React from 'react'
import cx from 'classnames'

import styles from './toast.module.scss'

const Toast = (props) => {
  const { className, children } = props

  return (
    <div className={cx(styles.toast, className)}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}

export default Toast
