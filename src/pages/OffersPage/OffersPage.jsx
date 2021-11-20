import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import styles from './offers-page.module.scss'

import discountLogo from './assets/discount-offer-icon.png'
import litLogo from '../SingleOfferPage/assets/lit-offer-icon.png'
import discountBack from './assets/discountBack.png'
import litBack from './assets/litBack.png'

import hodlgodBack from './assets/hodlgodBack.jpg'
import hodlgodLogo from './assets/hodlgodLogo.png'

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
      <Title
        title="Current Offers"
        subtitle="Find airdrops, quests, and discounts based on your wallet’s holdings and history."
      />

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
              title="Insurace 30% Rebate"
              titleIcon={discountLogo}
              tags={['Staking', 'Finance']}
              className={styles.offer}
              btns={
                <Button
                  size="l"
                  label="Details"
                  onClick={() => handleOpenOffer('insurace-discount')}
                />
              }
              desc={
                <div className={styles.descList}>
                  <ul>
                    <li>
                      REQUIREMENT: <span>Yield farmer</span>
                    </li>
                    <li>
                      REWARD: <span>$INSUR</span>
                    </li>
                  </ul>
                </div>
              }
              img={discountBack}
            />
          </GridItem>
          <GridItem>
            <Card
              title="HodlGod - Play to Earn"
              titleIcon={hodlgodLogo}
              tags={['Gaming']}
              className={styles.offer}
              btns={
                <Button
                  size="l"
                  label="Details"
                  onClick={() => handleOpenOffer('hodlgod')}
                />
              }
              desc={
                <div className={styles.descList}>
                  <ul>
                    <li>
                      REQUIREMENT: <span>Hold $SLP or $DEC</span>
                    </li>
                    <li>
                      REWARD: <span>50,000 $VOID</span>
                    </li>
                  </ul>
                </div>
              }
              img={hodlgodBack}
            />
          </GridItem>
          <GridItem>
            <Card
              title="Lit Genesis Gate NFT"
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
                        Own ETH & follow{' '}
                        <a
                          className={styles.link}
                          href="https://twitter.com/litprotocol"
                          target="_blank"
                        >
                          @LitProtocol
                        </a>
                      </span>
                    </li>
                    <li>
                      REWARD: <span>Genesis NFT</span>
                    </li>
                  </ul>
                </div>
              }
              img={litBack}
            />
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default OffersPage
