import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './header-component.module.scss'

import litLogo from '../../assets/imgs/lit-logo.svg'
import litMiniLogo from '../../assets/imgs/lit-mini-logo.svg'

import { Header, HeaderModule, HeaderButton } from '@consta/uikit/Header'
import { IconAlignJustify } from '@consta/uikit/IconAlignJustify'
import { IconClose } from '@consta/uikit/IconClose'

import SeacrchInput from '../SeacrhInput'
import UserBlock from '../UserBlock'

import { useAppContext } from '../../context/app'

import useWindowDimensions from '../../hooks/useWindowDimensions'

const HeaderComponent = () => {
  const { setSideBar, sideBar } = useAppContext()

  const userItems = [
    {
      name: 'Logout',
      action: () => false,
    },
  ]

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
            {width > 1024 ? (
              <img src={litLogo} alt="" />
            ) : (
              <img src={litMiniLogo} alt="" />
            )}
          </HeaderModule>
          <HeaderModule indent="l">
            <span className={styles.light}>Powered by the Lit Protocol</span>
          </HeaderModule>
        </>
      }
      rightSide={
        <>
          <HeaderModule>
            <div className={styles.rightSide}>
              <SeacrchInput
                className={styles.search}
                value={search}
                handleChange={(val) => setSeacrh(val)}
                onClear={() => setSeacrh('')}
              />
              <NavLink
                activeClassName={styles.activeLink}
                className={styles.link}
                ac
                to={'/about'}
              >
                About
              </NavLink>
              <NavLink
                activeClassName={styles.activeLink}
                className={styles.link}
                to={'/connect'}
              >
                Connect Wallet
              </NavLink>
            </div>
          </HeaderModule>
        </>
      }
    />
  )
}

export default HeaderComponent
