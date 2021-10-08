import React from 'react'

import styles from './offers-page.module.scss'

import appLogo from './assets/appLogo.png'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'

import { Card, Title } from '../../components'

const OffersPage = () => {
  return (
    <div className={styles.main}>
      <Title title="Current Offers" />
      <div className={styles.content}>
        <Grid
          cols="1"
          gap="xl"
          breakpoints={{
            l: {
              cols: 3,
            },
            s: {
              cols: 2,
            },
          }}
        >
          <GridItem>
            <Card
              title="Star Atlas Referral Quest for
Axie Infinity Players"
              titleIcon={appLogo}
              tags={['Axie Infinity', 'Gaming']}
              btns={<Button size="l" label="Details" />}
              desc={
                <div className={styles.descList}>
                  <ul>
                    <li>
                      REQUIREMENT: <span>Follow @LitProtocol on Twitter</span>
                    </li>
                    <li>
                      REWARD: <span>NFT</span>
                    </li>
                  </ul>
                </div>
              }
              img="https://images.unsplash.com/photo-1632830025073-3da7ac07402b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
            />
          </GridItem>
          <GridItem>
            <Card
              title="Star Atlas Referral Quest for
Axie Infinity Players"
              titleIcon={appLogo}
              tags={['Axie Infinity', 'Gaming']}
              btns={<Button size="l" label="Details" />}
              desc={
                <div className={styles.descList}>
                  <ul>
                    <li>
                      REQUIREMENT: <span>Follow @LitProtocol on Twitter</span>
                    </li>
                    <li>
                      REWARD: <span>NFT</span>
                    </li>
                  </ul>
                </div>
              }
              img="https://images.unsplash.com/photo-1632830025073-3da7ac07402b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
            />
          </GridItem>
          <GridItem>
            <Card
              title="Star Atlas Referral Quest for
Axie Infinity Players"
              titleIcon={appLogo}
              tags={['Axie Infinity', 'Gaming']}
              btns={<Button size="l" label="Details" />}
              desc={
                <div className={styles.descList}>
                  <ul>
                    <li>
                      REQUIREMENT: <span>Follow @LitProtocol on Twitter</span>
                    </li>
                    <li>
                      REWARD: <span>NFT</span>
                    </li>
                  </ul>
                </div>
              }
              img="https://images.unsplash.com/photo-1632830025073-3da7ac07402b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
            />
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default OffersPage
