import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import styles from './apps-page.module.scss'

import driveBack from './assets/driveBack.png'
import zoomBack from './assets/zoomBack.png'
import IPFSBack from './assets/IPFSBack.png'
import minterBack from './assets/minterBack.png'

import driveIcon from './assets/googleDrive.png'
import zoomIcon from './assets/zoom.png'
import ipfsIcon from './assets/IPFS.png'
import minterIcon from './assets/minter.png'

import titleIcon from './assets/apps-icon.png'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'

import { Card, Title } from '../../components'
import blockArt from './assets/block-art.png'

import { apps } from '../../data/apps'
import { useAppContext } from '../../context'

const AppsPage = () => {
  const history = useHistory()
  const { performWithAuthSig } = useAppContext()

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
          {apps.map((app) => (
            <GridItem key={app.id}>
              <Card
                title={app.title}
                titleIcon={app.logo}
                tags={app.tags}
                btns={
                  <>
                    <Button
                      className={styles.secondaryBtn}
                      view="secondary"
                      size="l"
                      label="Details"
                      onClick={() => handleOpenApp(app.id)}
                    />
                    {app.mainBtnImage ? (
                      <img
                        className={styles.imageBtn}
                        src={app.mainBtnImage}
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
                    ) : (
                      <Button
                        label="Launch"
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
                    )}
                  </>
                }
                btnsWithoutMargin={app.btnsWithoutMargin}
                desc={<div className={styles.desc}>{app.shortDesc}</div>}
                img={app.backgroundImg}
              />
            </GridItem>
          ))}

          <GridItem>
            <Card
              title="IPFS Encrypted Files"
              titleIcon={ipfsIcon}
              tags={['Productivity']}
              btns={
                <>
                  <Button
                    label="Launch"
                    size="l"
                    onClick={() => history.push('/files')}
                  />
                </>
              }
              desc={
                <div className={styles.desc}>
                  Upload files to decentralized encrypted storage that can only
                  be decrypted and downloaded by members of your c rypto
                  community.
                </div>
              }
              img={IPFSBack}
            />
          </GridItem>

          <GridItem>
            <Card
              title="Unlockable NFT Minter"
              titleIcon={minterIcon}
              tags={['Create']}
              btns={
                <>
                  <Button
                    label="Launch"
                    size="l"
                    onClick={() => history.push('/minter')}
                  />
                </>
              }
              desc={
                <div className={styles.desc}>
                  Create an NFT that contains locked content that only the owner
                  of the NFT can access
                </div>
              }
              img={minterBack}
            />
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default AppsPage
