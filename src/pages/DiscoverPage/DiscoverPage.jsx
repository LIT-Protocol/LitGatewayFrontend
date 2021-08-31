import React from 'react'
import { Link } from 'react-router-dom'

import styles from './discover-page.module.scss'

import Background from './assets/maksim-istomin-w6auPDgfDS0-unsplash.jpg'
import Card1 from './assets/keming-tan-BouGISvED5w-unsplash.jpg'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'

const DiscoverPage = () => {
  return (
    <div className={styles.main}>
      <div
        className={styles.card}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className={styles.content}>
          <h2>Lit Gateway - token gated experiences</h2>
          <h1 className={styles.title} as="h1" inverted>
            Find your tribe <br /> and playground
          </h1>
        </div>
        <Button label="Connect wallet" size="l" />
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
        <GridItem>
          <div className={styles.smallCard}>
            <div>
              <h4>FEATURED</h4>
              <h2 className={styles.title}>ETH Whales Beat Saber</h2>
              <h5>Compete for ETH and NFTs</h5>
            </div>
            <img className={styles.image} src={Card1} alt={Card1} />
          </div>
        </GridItem>
        <GridItem>
          <div className={styles.smallCard}>
            <div>
              <h4>FEATURED</h4>
              <h2 className={styles.title}>ETH Whales Beat Saber</h2>
              <h5>Compete for ETH and NFTs</h5>
            </div>
            <img className={styles.image} src={Card1} alt={Card1} />
          </div>
        </GridItem>
      </Grid>
      <div className={styles.block}>
        <h2 className={styles.title}>Experiences we love</h2>
        <Link to="/">See all</Link>
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
        <GridItem>
          <div className={styles.miniCard}>
            <div>
              <img src={Card1} alt="" />
              <Link to="/app">
                <h2 className={styles.title}>Yield Farming Chat</h2>
              </Link>
            </div>
            <Button label="Get" size="s" />
          </div>
        </GridItem>
        <GridItem>
          <div className={styles.miniCard}>
            <div>
              <img src={Card1} alt="" />
              <Link to="/app">
                <h2 className={styles.title}>Yield Farming Chat</h2>
              </Link>
            </div>
            <Button label="Get" size="s" />
          </div>
        </GridItem>
        <GridItem>
          <div className={styles.miniCard}>
            <div>
              <img src={Card1} alt="" />
              <Link to="/app">
                <h2 className={styles.title}>Yield Farming Chat</h2>
              </Link>
            </div>
            <Button label="Get" size="s" />
          </div>
        </GridItem>
        <GridItem>
          <div className={styles.miniCard}>
            <div>
              <img src={Card1} alt="" />
              <Link to="/app">
                <h2 className={styles.title}>Yield Farming Chat</h2>
              </Link>
            </div>
            <Button label="Get" size="s" />
          </div>
        </GridItem>
      </Grid>
    </div>
  )
}

export default DiscoverPage
