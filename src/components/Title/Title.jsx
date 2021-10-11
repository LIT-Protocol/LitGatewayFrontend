import React from 'react'
import cx from 'classnames'

import styles from './title.module.scss'

const Title = ({ title, subtitle, icon, className }) => {
  return (
    <div className={cx(styles.wrap, className)}>
      {icon && <img src={icon} />}
      <div className={styles.title}>
        <h2>{title}</h2>
        {subtitle && <h5>{subtitle}</h5>}
      </div>
    </div>
  )
}

export default Title
