import React from 'react'
import { Link } from 'react-router-dom'

import styles from './guide-page.module.scss'

import { Grid, GridItem } from '@consta/uikit/Grid'
import { content } from './content'
import { capitalizeFirstLetter } from '../../utils'

const GuidePage = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Guide</h1>
      <h3 className={styles.subtitle}>Welcome to the Lit Gateway!</h3>
      <h4></h4>
      <div className={styles.mainText}>
        This is the place to browse, use, and create token gated applications,
        offers, and experiences that have been created with the Lit Protocol.
      </div>
      <div className={styles.mainText}>
        Lit Gateway is a blockchain enabled application and uses a blockchain
        wallet for login, opposed to an email and password. If you don’t have a
        blockchain wallet, download MetaMask{' '}
        <a href="https://metamask.io/">here</a>.
      </div>
      <Grid
        cols="1"
        gap="xl"
        className={styles.smallCards}
        breakpoints={{
          s: {
            cols: 2,
          },
        }}
      >
        {Object.keys(content).map((k) => (
          <GridItem key={k}>
            <Link to={`/guide/${k}`} className={styles.card}>
              <h2>{capitalizeFirstLetter(k)}</h2>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}

export default GuidePage
