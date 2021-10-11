import React from 'react'

import styles from './app.module.scss'

import Routes from './routing/routes'

import { useAppContext } from './context'

const Main = () => {
  const { username } = useAppContext()

  return (
    <div className={styles.app}>
      <Routes />
      <div className={styles.backgroundLogo} />
      {username ? (
        <div className={styles.connected}>
          <span /> Connected to the Lit Protocol
        </div>
      ) : null}
    </div>
  )
}

export default Main
