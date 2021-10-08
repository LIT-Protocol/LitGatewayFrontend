import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import styles from './offers-page.module.scss'

import discountLogo from './assets/discount-offer-icon.png'
import litLogo from '../SingleOfferPage/assets/lit-offer-icon.png'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'

import { Card, Title } from '../../components'

const OffersPage = () => {
  const history = useHistory()

  const handleOpenOffer = (title) => {
    history.push(`/offers/${title}`)
  }

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
              title="InsureAce Discount"
              titleIcon={discountLogo}
              tags={['Staking', 'Finance']}
              className={styles.offer}
              btns={
                <Button
                  size="l"
                  label="Details"
                  onClick={() => handleOpenOffer('insureace-discount')}
                />
              }
              desc={
                <div className={styles.descList}>
                  <ul>
                    <li>
                      REQUIREMENT: <span>Referral purchase</span>
                    </li>
                    <li>
                      REWARD: <span>30% off for 1 month</span>
                    </li>
                  </ul>
                </div>
              }
              img="https://images.unsplash.com/photo-1632830025073-3da7ac07402b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
            />
          </GridItem>
          <GridItem>
            <Card
              title="Lit Protocol NFT Drop 01"
              titleIcon={litLogo}
              tags={['Lit Protocol']}
              className={styles.offer}
              btns={
                <Button
                  size="l"
                  label="Details"
                  onClick={() => handleOpenOffer('lit-protocol-nft')}
                />
              }
              desc={
                <div className={styles.descList}>
                  <ul>
                    <li>
                      REQUIREMENT:{' '}
                      <span>
                        Follow{' '}
                        <a
                          className={styles.link}
                          href="https://twitter.com/litprotocol"
                          target="_blank"
                        >
                          @LitProtocol on Twitter
                        </a>
                      </span>
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
