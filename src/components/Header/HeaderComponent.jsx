import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './header-component.module.scss'

import litLogo from '../../assets/imgs/lit-logo.svg'
import litMiniLogo from '../../assets/imgs/lit-mini-logo.svg'

import { Header, HeaderModule, HeaderButton } from '@consta/uikit/Header'
import { IconAlignJustify } from '@consta/uikit/IconAlignJustify'
import { IconClose } from '@consta/uikit/IconClose'

import { SearchInput, UserBlock, Icons } from '../'

import { useAppContext } from '../../context/app'

import useWindowDimensions from '../../hooks/useWindowDimensions'

const HeaderComponent = () => {
  const { setSideBar, sideBar, username } = useAppContext()

  const [search, setSeacrh] = useState('')

  const { width } = useWindowDimensions()

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
              {width > 1024 ? (
                <img src={litLogo} alt="" style={{ height: 54 }} />
              ) : (
                <img src={litMiniLogo} alt="" />
              )}
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
              <SearchInput
                className={styles.search}
                value={search}
                handleChange={(val) => setSeacrh(val)}
                onClear={() => setSeacrh('')}
              />
              <a
                className={styles.twitter}
                href="https://twitter.com/litprotocol"
                target="_blank"
              >
                <Icons.Twitter />
              </a>
              <NavLink
                activeClassName={styles.activeLink}
                className={styles.link}
                ac
                to={'/about'}
              >
                About
              </NavLink>

              {!username ? (
                <NavLink
                  activeClassName={styles.activeLink}
                  className={styles.link}
                  to={'/connect'}
                >
                  Connect Wallet
                </NavLink>
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
