import React from 'react'

import styles from './title.module.scss'

const Title = ({ title }) => {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
    </div>
  )
}

export default Title
