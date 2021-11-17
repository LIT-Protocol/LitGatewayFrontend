import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './header-component.module.scss'

import litLogo from '../../assets/imgs/lit-logo.svg'

import { Header, HeaderButton, HeaderModule } from '@consta/uikit/Header'
import { IconAlignJustify } from '@consta/uikit/IconAlignJustify'
import { IconClose } from '@consta/uikit/IconClose'

import { AuthDependent, UserBlock } from '../'

import { useAppContext } from '../../context/app'

import useWindowDimensions from '../../hooks/useWindowDimensions'

const HeaderComponent = () => {
  const { setSideBar, sideBar, username, performWithAuthSig } = useAppContext()

  const [search, setSeacrh] = useState('')

  const { width } = useWindowDimensions()

  const connectToWallet = () => {
    performWithAuthSig()
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
                <div className={styles.connected} />
              </AuthDependent>

              <NavLink
                activeClassName={styles.activeLink}
                className={styles.link}
                ac
                to={'/about'}
              >
                About
              </NavLink>

              {!username ? (
                <span
                  className={styles.connectButton}
                  onClick={() => connectToWallet()}
                >
                  Connect Wallet
                </span>
              ) : null}

              <UserBlock />
            </div>
          </HeaderModule>
        </>
      }
    />
  )
}

export default HeaderComponent
