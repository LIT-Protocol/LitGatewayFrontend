import React from 'react'

import styles from './build-page.module.scss'

import { Star, Monitor, HelpCircle } from 'react-feather'
import { withTooltip } from '@consta/uikit/withTooltip'

const SingleAppPage = () => {
  const HelpCircleWithTooltip = withTooltip({ content: 'Help' })(HelpCircle)

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Build</h1>
      <h3 className={styles.subtitle}>On the Lit Protocol</h3>
      <div className={styles.body}>
        Start building with the Lit Protocol via our JS SDK located{' '}
        <a href="https://github.com/LIT-Protocol/lit-js-sdk">here</a>
      </div>

      <div className={styles.body}>
        The API of this SDK is located{' '}
        <a href="https://lit-protocol.github.io/lit-js-sdk/api_docs_html/index.html">
          here
        </a>
      </div>

      <div className={styles.body}>
        Looking to use Lit to verify access to some dynamic content located on a
        server? A minimal example is located{' '}
        <a href="https://github.com/LIT-Protocol/lit-minimal-jwt-example">
          here
        </a>
      </div>

      <div className={styles.body}>
        Questions or want to get in touch? Contact us{' '}
        <a href="https://airtable.com/shr2NWJbH1Y6Y3kOU">here</a>
      </div>
    </div>
  )
}

export default SingleAppPage
