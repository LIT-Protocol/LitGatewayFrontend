import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import styles from './apps-page.module.scss'

import driveBack from './assets/driveBack.png'
import googleDrive from './assets/googleDrive.png'
import zoomIcon from './assets/zoom.png'
import titleIcon from './assets/apps-icon.png'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'

import { Card, Title } from '../../components'
import blockArt from './assets/block-art.png'

const AppsPage = () => {
  const history = useHistory()

  const handleOpenApp = (id) => {
    history.push(`/apps/${id}`)
  }

  return (
    <div className={styles.main}>
      <Title
        className={styles.title}
        icon={titleIcon}
        title="Lit Apps"
        subtitle="The power of blockchain-defined access combined with your current tool suite"
      />
      <img className={styles.art} src={blockArt} alt="" />
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
              title="Google Drive"
              titleIcon={googleDrive}
              tags={['Productivity']}
              btns={
                <>
                  <Button
                    className={styles.secondaryBtn}
                    view="secondary"
                    size="l"
                    label="Details"
                    onClick={() => handleOpenApp('google-drive')}
                  />
                  <Button label="Launch" size="l" />
                </>
              }
              desc={
                <div className={styles.desc}>
                  Grant access to Google Drive files with blockchain
                  requirements
                </div>
              }
              img={driveBack}
            />
          </GridItem>
          <GridItem>
            <Card
              title="Zoom"
              titleIcon={zoomIcon}
              tags={['Productivity']}
              btns={
                <>
                  <Button
                    className={styles.secondaryBtn}
                    view="secondary"
                    size="l"
                    label="Details"
                    onClick={() => handleOpenApp('zoom')}
                  />
                  <Button label="Launch" size="l" />
                </>
              }
              desc={
                <div className={styles.desc}>
                  Grant access to Zoom with blockchain requirements
                </div>
              }
              img={driveBack}
            />
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default AppsPage
