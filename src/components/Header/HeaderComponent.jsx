import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './header-component.module.scss'

import litLogo from '../../assets/imgs/lit-logo.svg'

import { Header, HeaderButton, HeaderModule } from '@consta/uikit/Header'
import { IconAlignJustify } from '@consta/uikit/IconAlignJustify'
import { Modal } from '@consta/uikit/Modal'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconClose } from '@consta/uikit/IconClose'

import { AuthDependent, UserBlock } from '../'

import { useAppContext } from '../../context/app'

import useWindowDimensions from '../../hooks/useWindowDimensions'

const HeaderComponent = () => {
  const { setSideBar, sideBar, username, performWithAuthSig, appIsLoaded } =
    useAppContext()
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const [search, setSeacrh] = useState('')

  const loginStatus = useRef(null)

  const { width } = useWindowDimensions()

  const checkScreenSize = () => {
    if (window.innerWidth < 650) {
      setIsModalOpen(true)
    } else {
      connectToWallet()
    }
  }

  const connectToWallet = () => {
    performWithAuthSig(() => {})
  }

  return (
    <Header
      className={styles.header}
      leftSide={
        <>
          <HeaderModule className={styles.burger} indent="s">
            {!sideBar ? (
              <HeaderButton
                iconLeft={IconAlignJustify}
                onClick={() => setSideBar(true)}
              />
            ) : (
              <HeaderButton
                iconLeft={IconClose}
                onClick={() => setSideBar(false)}
              />
            )}
          </HeaderModule>
          <HeaderModule indent="s">
            <NavLink to="/discover">
              <img
                className={width <= 1024 && styles.mobileLogo}
                src={litLogo}
                alt="Lit Gateway Logo"
                style={{ height: 44.36 }}
              />
            </NavLink>
          </HeaderModule>
          {/* <HeaderModule indent="l">
            <span className={styles.light}>Powered by the Lit Protocol</span>
          </HeaderModule> */}
        </>
      }
      rightSide={
        <>
          <HeaderModule>
            <div className={styles.rightSide}>
              {/* <SearchInput
                className={styles.search}
                value={search}
                handleChange={(val) => setSeacrh(val)}
                onClear={() => setSeacrh('')}
              /> */}
              {/* <a
                className={styles.twitter}
                href="https://twitter.com/litprotocol"
                target="_blank"
              >
                <Icons.Twitter />
              </a> */}
              <AuthDependent>
                <div className={styles.connected}>
                  <div className={styles.connectedTooltip}>
                    Connected to the Lit Protocol
                  </div>
                </div>
                {/*<Tooltip className={styles.connectedStatus} size="s" position={{x: 50, y: 50}}>*/}
                {/*  Connected to the Lit Protocol*/}
                {/*</Tooltip>*/}
              </AuthDependent>

              <NavLink
                activeClassName={styles.activeLink}
                className={styles.link}
                ac
                to={'/about'}
              >
                About
              </NavLink>

              {appIsLoaded && !username ? (
                <span
                  className={styles.connectButton}
                  onClick={() => checkScreenSize()}
                >
                  Connect Wallet
                </span>
              ) : null}

              <UserBlock />
            </div>
            <Modal
              className={styles.mobileWarningModal}
              isOpen={isModalOpen}
              hasOverlay
            >
              <div className={styles.warningModalContent}>
                <Text as="p" size="s" view="secondary">
                  Warning regarding mobile compatability
                </Text>
                <Text as="p" size="m" view="primary">
                  The Lit Gateway works best on the desktop version of Metamask,
                  and unforeseen issues may arise through mobile. Would you like
                  to proceed?
                </Text>
                <div className={styles.warningModalActions}>
                  <Button
                    size="m"
                    view="primary"
                    label="Go Ahead"
                    width="default"
                    onClick={() => {
                      connectToWallet()
                      setIsModalOpen(false)
                    }}
                  />
                  <Button
                    size="m"
                    view="primary"
                    label="Cancel"
                    width="default"
                    onClick={() => setIsModalOpen(false)}
                  />
                </div>
              </div>
            </Modal>
          </HeaderModule>
        </>
      }
    />
  )
}

export default HeaderComponent
