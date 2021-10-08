import React from 'react'

import styles from './apps-page.module.scss'

import titleIcon from './assets/Docs-icon.svg'
import zoomLogo from './assets/zoom.png'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'

import { Card, Title } from '../../components'

const AppsPage = () => {
  return (
    <div className={styles.main}>
      <Title title="Current Apps" />
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
              title="Google Docs"
              titleIcon={titleIcon}
              tags={['Axie Infinity', 'Gaming']}
              btns={
                <>
                  <Button
                    className={styles.secondaryBtn}
                    view="secondary"
                    size="l"
                    label="Details"
                  />
                  <Button label="Launch" size="l" />
                </>
              }
              desc={
                <div className={styles.desc}>
                  Grant access to Google Docs with blockchain requirements
                </div>
              }
              img="https://images.unsplash.com/photo-1632830025073-3da7ac07402b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
            />
          </GridItem>
          <GridItem>
            <Card
              title="Zoom"
              titleIcon={zoomLogo}
              tags={['Productivity']}
              btns={
                <>
                  <Button
                    className={styles.secondaryBtn}
                    view="secondary"
                    size="l"
                    label="Details"
                  />
                  <Button label="Launch" size="l" />
                </>
              }
              desc={
                <div className={styles.desc}>
                  Grant access to Google Docs with blockchain requirements
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

export default AppsPage
