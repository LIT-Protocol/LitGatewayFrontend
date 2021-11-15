import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import styles from './single-app-page.module.scss'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { IconBackward } from '@consta/uikit/IconBackward'
import { Badge } from '@consta/uikit/Badge'
import { Card } from '../../components'
import { apps } from '../../data/apps'
import { useAppContext } from '../../context'

const SingleAppPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const { performWithAuthSig } = useAppContext()

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
              <Button
                label={app.mainBtnLabel}
                size="l"
                onClick={() => {
                  if (app.url) {
                    if (app.url.startsWith('http')) {
                      // open in new page
                      window.location = app.url
                    } else {
                      history.push(app.url)
                    }
                  } else {
                    app.launchClickedHandler({ performWithAuthSig })
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.textBlock}>{app.textBlock}</div>
          </div>
        </div>
        {app?.more.length > 0 ? (
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
                  {app.more.map((item) => (
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
                        desc={<div className={styles.desc}>{item.desc}</div>}
                        img={item.img}
                      />
                    </GridItem>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default SingleAppPage
