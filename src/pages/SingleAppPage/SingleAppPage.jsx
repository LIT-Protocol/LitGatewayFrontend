import React from 'react'
import { Link } from 'react-router-dom'

import styles from './single-app-page.module.scss'

import { Star, Monitor, HelpCircle } from 'react-feather'
import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { withTooltip } from '@consta/uikit/withTooltip'

import Card1 from './assets/keming-tan-BouGISvED5w-unsplash.jpg'
import Card2 from './assets/maksim-istomin-w6auPDgfDS0-unsplash.jpg'
import { Badge } from '@consta/uikit/Badge'

const SingleAppPage = () => {
  const HelpCircleWithTooltip = withTooltip({ content: 'Help' })(HelpCircle)

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <div className={styles.top}>
          <img src={Card1} alt="" />
          <div>
            <h1 className={styles.title}>PancakeSwap Yield Farming Chat</h1>
            <Button label="Get" size="m" />
          </div>
        </div>
        <Grid
          cols="1"
          className={styles.list}
          breakpoints={{
            s: {
              cols: 5,
            },
            xs: {
              cols: 3,
            },
          }}
        >
          <GridItem>
            <div className={styles.segment}>
              <div>
                <h2>
                  > 5 <Badge status="warning" label="cake" />
                </h2>
              </div>
              <h5>Requirement</h5>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.segment}>
              <div className={styles.publisher}>
                <img className={styles.image} src={Card1} alt="" />
                <h3>Sneider.ETH</h3>
              </div>
              <h5>Publisher</h5>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.segment}>
              <div>
                <Monitor />
              </div>
              <h5>Browser</h5>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.segment}>
              <div className={styles.flex}>
                <Star />
                <h2>4.3</h2>
              </div>
              <h5>145 ratings</h5>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.segment}>
              <div>
                <h2>EN</h2>
              </div>
              <h5>language</h5>
            </div>
          </GridItem>
        </Grid>
        <Grid
          cols="1"
          gap="xl"
          breakpoints={{
            s: {
              cols: 2,
            },
          }}
          className={styles.imgs}
        >
          <GridItem>
            <img src={Card2} alt="" />
          </GridItem>
          <GridItem>
            <img src={Card2} alt="" />
          </GridItem>
        </Grid>
        <div className={styles.textBlock}>
          <Text spacing="s">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </Text>
          <Link className={styles.support}>
            Support <HelpCircleWithTooltip />
          </Link>
        </div>
        <div className={styles.text}>
          <h3>Requirement details</h3>
          <Text spacing="s">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its{' '}
            <Link className={styles.link}>layout</Link>.
          </Text>
        </div>
      </div>
    </div>
  )
}

export default SingleAppPage
