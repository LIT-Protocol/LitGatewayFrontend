import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import styles from './single-app-page.module.scss'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { IconBackward } from '@consta/uikit/IconBackward'
import { Badge } from '@consta/uikit/Badge'
import { Card } from '../../components'

import zoomLogo from './assets/zoom.png'
import gDriveLogo from './assets/googleDrive.png'
import driveBack from './assets/driveBack.png'

const SingleAppPage = () => {
  const { id } = useParams()
  const history = useHistory()

  const apps = [
    {
      id: 'zoom',
      title: 'Zoom',
      logo: zoomLogo,
      tags: ['Productivity'],
      mainBtnLabel: 'Launch',
      textBlock: (
        <>
          <p>
            Create permissions based on wallet contents for your
            already-existing Google Drive files. Our flexible permissions
            builders allows you to allow access based on token or NFT ownership
            as well as other wallet attributes, like membership in a DAO.
          </p>
          <p>
            Once files are permissioned on the Lit Google Docs App, you can edit
            wallet parameters, view/edit access, and delete it from the app
            which removes that access.
          </p>
          <p>
            Wallets that meet the conditions will enter their email address for
            access.
          </p>
        </>
      ),
      more: [
        {
          title: 'Google Drive',
          titleIcon: gDriveLogo,
          id: 'google-drive',
          desc: 'Grant access to Google Drive files with blockchain requirements',
          img: driveBack,
        },
      ],
    },
    {
      id: 'google-drive',
      title: 'Google Drive',
      logo: gDriveLogo,
      tags: ['Productivity'],
      mainBtnLabel: 'Launch',
      textBlock: (
        <>
          <p>
            Create permissions based on wallet contents for your
            already-existing Google Drive files. Our flexible permissions
            builders allows you to allow access based on token or NFT ownership
            as well as other wallet attributes, like membership in a DAO.
          </p>
          <p>
            Once files are permissioned on the Lit Google Docs App, you can edit
            wallet parameters, view/edit access, and delete it from the app
            which removes that access.
          </p>
          <p>
            Wallets that meet the conditions will enter their email address for
            access.
          </p>
        </>
      ),
      more: [
        {
          title: 'Zoom',
          titleIcon: zoomLogo,
          id: 'zoom',
          desc: 'Grant access to Zoom with blockchain requirements',
          img: driveBack,
        },
      ],
    },
  ]

  const app = apps.find((app) => app.id === id)

  if (!app) {
    history.push('/apps')
    return null
  }

  const handleOpenApp = (id) => {
    history.push(`/apps/${id}`)
  }

  return (
    <>
      <div className={styles.back}>
        <Link to="/apps" className={styles.link}>
          <IconBackward className={styles.backIcon} /> Back to all Apps
        </Link>
      </div>
      <div className={styles.main}>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.left}>
              <img src={app.logo} alt="" />
              <div className={styles.titles}>
                <h1 className={styles.title}>{app.title}</h1>
                <div className={styles.tags}>
                  {app.tags.map((tag) => (
                    <Badge status="system" label={tag} size="l" />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <Button label={app.mainBtnLabel} size="l" />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.textBlock}>{app.textBlock}</div>
          </div>
        </div>
        <div className={styles.more}>
          <div className={styles.content}>
            <h2>Similar Apps</h2>
            <div className={styles.moreList}>
              <Grid
                cols="1"
                gap="xl"
                breakpoints={{
                  s: {
                    cols: 2,
                  },
                }}
              >
                {app?.more.length &&
                  app.more.map((item) => (
                    <GridItem>
                      <Card
                        title={item.title}
                        titleIcon={item.titleIcon}
                        tags={item.tags}
                        className={styles.app}
                        btns={
                          <Button
                            className={styles.secondary}
                            size="l"
                            label="Details"
                            view="secondary"
                            onClick={() => handleOpenApp(item.id)}
                          />
                        }
                        desc={
                          <div className={styles.desc}>
                            Grant access to Google Drive files with blockchain
                            requirements
                          </div>
                        }
                        img={item.img}
                      />
                    </GridItem>
                  ))}
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleAppPage
