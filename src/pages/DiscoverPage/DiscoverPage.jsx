import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './discover-page.module.scss'

import gDriveLogo from './assets/googleDrive.png'
import driveBack from './assets/driveBack.png'
import litLogo from './assets/lit-offer-icon.png'
import litBack from './assets/litBack.png'
import discountLogo from './assets/discount-offer-icon.png'
import discountBack from './assets/discountBack.png'

import { Button } from '@consta/uikit/Button'
import { Modal } from '@consta/uikit/Modal'
import { IconClose } from '@consta/uikit/IconClose'

import { useAppContext } from '../../context'

import { Card, GetUpdates, InputWrapper } from '../../components'

import { postUser, putUser } from '../../api/users'

const DiscoverPage = () => {
  const { authSig } = useAppContext()
  const history = useHistory()

  const [showingEmailCaptureModal, setShowingEmailCaptureModal] =
    useState(false)

  const [email, setEmail] = useState('')

  const handleSubmitEmail = async () => {
    await postUser({
      email,
    })
    setShowingEmailCaptureModal(false)
  }

  const handleOpenApp = (id) => {
    history.push(`/apps/${id}`)
  }

  const handleOpenOffer = (title) => {
    history.push(`/offers/${title}`)
  }

  return (
    <div className={styles.main}>
      <div className={styles.top}>
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
        <GetUpdates className={styles.form} />
      </div>
      <div className={styles.content}>
        <Card
          title="InsurAce 30% Rebate"
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
                      rel="noreferrer"
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

        {/* <Card
          title="Unlockable NFT Minter"
          titleIcon={minterIcon}
          tags={['Create']}
          className={styles.offer}
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
              Create an NFT that contains locked content that only the owner of
              the NFT can access
            </div>
          }
          img={minterBack}
        />

        <Card
          title="IPFS Encrypted Files"
          titleIcon={ipfsIcon}
          tags={['Productivity']}
          className={styles.offer}
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
              Upload files to decentralized encrypted storage that can only be
              decrypted and downloaded by members of your c rypto community.
            </div>
          }
          img={IPFSBack}
        /> */}

        <Card
          className={styles.offer}
          title="Google Drive"
          titleIcon={gDriveLogo}
          tags={['Productivity']}
          btns={
            <>
              <Button
                size="l"
                label="Details"
                onClick={() => handleOpenApp('google-drive')}
              />
            </>
          }
          desc={
            <div className={styles.desc}>
              Grant access to Google Drive files with blockchain requirements
            </div>
          }
          img={driveBack}
        />
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
