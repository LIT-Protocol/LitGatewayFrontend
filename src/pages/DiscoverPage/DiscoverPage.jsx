import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import styles from './discover-page.module.scss'

import Background from './assets/paul-gilmore-8kDOOrs608I-unsplash.jpg'
import Card1 from './assets/dylan-mullins-Ubhjpv7q0Pk-unsplash.jpg'
import Card2 from './assets/markus-winkler-cV9-hOgoaok-unsplash.jpg'
import Card3 from './assets/kelly-sikkema-Kl1gC0ve620-unsplash.jpg'
import Card4 from './assets/james-harrison-vpOeXr5wmR4-unsplash.jpg'
import titleIcon from './assets/Docs-icon.svg'
import zoomLogo from './assets/zoom.png'
import appLogo from './assets/appLogo.png'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Modal } from '@consta/uikit/Modal'
import { IconClose } from '@consta/uikit/IconClose'

import { useAppContext } from '../../context'

import { InputWrapper, Card } from '../../components'

import { putUser } from '../../api/users'

const DiscoverPage = () => {
  const { performWithAuthSig, authSig } = useAppContext()
  const history = useHistory()

  const [showingEmailCaptureModal, setShowingEmailCaptureModal] =
    useState(false)
  const [email, setEmail] = useState('')

  const handleConnectWallet = () => {
    performWithAuthSig((authSig) => {
      console.log(`${authSig.address} connected`)

      setShowingEmailCaptureModal(true)
    })
  }

  const handleSubmitEmail = () => {
    console.log('submitting email', email)
    putUser({
      authSig,
      email,
    })
    setShowingEmailCaptureModal(false)
  }

  return (
    <div className={styles.main}>
      <div
        className={styles.card}
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className={styles.content}>
          <h2>Lit Gateway</h2>
          <h1 className={styles.title} as="h1" inverted>
            Token gated experiences
          </h1>
          <h4 className={styles.subtitle}>Powered by the 🔥 Lit Protocol</h4>
        </div>
        <Button label="Connect wallet" size="l" onClick={handleConnectWallet} />
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
          <Link to="/minter" className={styles.smallCard}>
            <div>
              <h4>FEATURED</h4>
              <h2 className={styles.title}>Minter</h2>
              <h5>Put locked content behind NFTs</h5>
            </div>
            <img className={styles.image} src={Card1} alt={Card1} />
          </Link>
        </GridItem>
        <GridItem>
          <Link to="/files" className={styles.smallCard}>
            <div>
              <h4>FEATURED</h4>
              <h2 className={styles.title}>Files</h2>
              <h5>Collaborative Decentralized Encrypted File Storage</h5>
            </div>
            <img className={styles.image} src={Card2} alt={Card2} />
          </Link>
        </GridItem>
        <GridItem>
          <Link to="/twitterClaimNft" className={styles.smallCard}>
            <div>
              <h4>FEATURED</h4>
              <h2 className={styles.title}>Free NFT</h2>
              <h5>Follow us on Twitter for a free "Lit OG" NFT</h5>
            </div>
            <img className={styles.image} src={Card2} alt={Card2} />
          </Link>
        </GridItem>
      </Grid>
      <div className={styles.block}>
        <h2 className={styles.title}>Learn more about the Lit Gateway</h2>
        {/* <Link to="/">See all</Link> */}
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
              <img src={Card3} alt="" />
              <Link to="/guide">
                <h2 className={styles.title}>Guide</h2>
              </Link>
            </div>
            <Button
              label="View"
              size="s"
              onClick={() => history.push('/guide')}
            />
          </div>
        </GridItem>
        <GridItem>
          <div className={styles.miniCard}>
            <div>
              <img src={Card4} alt="" />
              <Link to="/build">
                <h2 className={styles.title}>Build</h2>
              </Link>
            </div>
            <Button
              label="View"
              size="s"
              onClick={() => history.push('/build')}
            />
          </div>
        </GridItem>
        {/* <GridItem>
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
        </GridItem> */}
      </Grid>
      <Modal isOpen={showingEmailCaptureModal}>
        <div className={styles.emailCaptureModal}>
          <div className={styles.closeHolder}>
            <IconClose
              className={styles.close}
              onClick={() => setShowingEmailCaptureModal(false)}
            />
          </div>
          <h3>Receive updates about Lit Gateway and Protocol</h3>
          <InputWrapper
            label="Email"
            value={email}
            handleChange={(e) => setEmail(e)}
          />
          <div style={{ height: 24 }} />
          <Button onClick={handleSubmitEmail} label="Submit" />
        </div>
      </Modal>
    </div>
  )
}

export default DiscoverPage
