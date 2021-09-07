import React from 'react'
import { Link } from 'react-router-dom'

import styles from './guide-page.module.scss'

import { Grid, GridItem } from '@consta/uikit/Grid'

const GuidePage = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Guide - How to use Lit Gateway</h1>
      <h3 className={styles.subtitle}>The place for getting started</h3>
      <p>
        Welcome to the Lit Gateway! This is the place to browse, use, and create
        token gated applications, offers, and experiences that have been created
        with the Lit Protocol. Lit Gateway is a blockchain enabled application
        and uses a blockchain wallet for login, opposed to an email and
        password. If you don’t have a first blockchain wallet, download MetaMask
        here.
      </p>
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
        <GridItem>
          <Link to={'/requirement'} className={styles.card}>
            <h2>Blockchain basics</h2>
          </Link>
        </GridItem>
        <GridItem>
          <Link to={'/requirement'} className={styles.card}>
            <h2>What are "Requirements"</h2>
          </Link>
        </GridItem>
        <GridItem>
          <Link to={'/requirement'} className={styles.card}>
            <h2>Publising on Lit Gateway</h2>
          </Link>
        </GridItem>
        <GridItem>
          <Link to={'/requirement'} className={styles.card}>
            <h2>Lit protocol overview</h2>
          </Link>
        </GridItem>
      </Grid>
    </div>
  )
}

export default GuidePage
