import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './discover-page.module.scss'

import bg from './assets/bg.png'
import discountLogo from './assets/discount-offer-icon.png'
import discountBack from './assets/discountBack.png'
import litLogo from './assets/lit-offer-icon.png'
import litBack from './assets/litBack.png'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Modal } from '@consta/uikit/Modal'
import { IconClose } from '@consta/uikit/IconClose'

import { useAppContext } from '../../context'

import { InputWrapper, Card } from '../../components'

import { putUser } from '../../api/users'

const DiscoverPage = () => {
  const [emailVal, setEmailVal] = useState('')

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

  const handleSubmit = () => {}

  const handleOpenOffer = (title) => {
    history.push(`/offers/${title}`)
  }

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <img className={styles.bg} src={bg} alt="" />
        <div className={styles.title}>
          <h3>Discover</h3>
          <h2>Lit Gateway</h2>
        </div>
        <p className={styles.subtitle}>
          Connecting blockchain to the rest of the internet.
        </p>
        <p className={styles.text}>
          Find apps for creating token and DAO gated meetings, documents, NFTs,
          and more. Claim offers and airdrops based on your wallet holdings and
          history. Sign up below to get notified about offers based on the
          wallet you connect.
        </p>
        <div className={styles.form}>
          <InputWrapper
            value={emailVal}
            className={styles.input}
            placeholder="Email address"
            id="email"
            size="l"
            handleChange={(value) => setEmailVal(value)}
          />
          <Button
            className={styles.btn}
            label="Get Updates"
            size="l"
            onClick={handleSubmit}
          />
        </div>
      </div>
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
              img={discountBack}
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
              img={litBack}
            />
          </GridItem>
        </Grid>
      </div>
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
