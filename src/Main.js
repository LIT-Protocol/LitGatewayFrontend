import React from 'react'

import styles from './app.module.scss'

import Routes from './routing/routes'

import { Button } from '@consta/uikit/Button'

import { Icons } from './components'

const Main = () => {
  const handleSubmitFeedback = () => {}

  return (
    <div className={styles.app}>
      <Routes />
      <div className={styles.backgroundLogo} />

      <div className={styles.linksWrapper}>
        <a href="#">
          <Icons.Discord />
        </a>

        <a href="https://twitter.com/litprotocol" target="_blank">
          <Icons.Twitter />
        </a>

        <a href="#" className={styles.developerDocs}>
          Developer Docs <Icons.Outside />
        </a>

        <Button
          size="s"
          view="secondary"
          label="Submit Feedback"
          onClick={handleSubmitFeedback}
        />
      </div>
    </div>
  )
}

export default Main
