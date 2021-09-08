import React from 'react'
import { Link } from 'react-router-dom'

import styles from './build-page.module.scss'

import { Star, Monitor, HelpCircle } from 'react-feather'
import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { withTooltip } from '@consta/uikit/withTooltip'

const SingleAppPage = () => {
  const HelpCircleWithTooltip = withTooltip({ content: 'Help' })(HelpCircle)

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Build</h1>
      <h3 className={styles.subtitle}>On the Lit Protocol</h3>
      <div className={styles.body}>
        The easiest way to start building with the Lit Protocol is to use our JS
        SDK located{' '}
        <a href="https://github.com/LIT-Protocol/lit-js-sdk">here</a>
      </div>

      <div className={styles.body}>
        The API of this SDK is located{' '}
        <a href="https://lit-protocol.github.io/lit-js-sdk/api_docs_html/index.html">
          here
        </a>
      </div>

      <div className={styles.body}>
        If you're looking to use Lit to verify access to some dynamic content
        located on a server, a minimal example is located{' '}
        <a href="https://github.com/LIT-Protocol/lit-minimal-jwt-example">
          here
        </a>
      </div>
    </div>
  )
}

export default SingleAppPage
