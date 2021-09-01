import React from 'react'

import styles from './header-component.module.scss'

import { Header, HeaderModule, HeaderButton } from '@consta/uikit/Header'
import { IconAlignJustify } from '@consta/uikit/IconAlignJustify'
import { IconClose } from '@consta/uikit/IconClose'
import { IconArrowDown } from '@consta/uikit/IconArrowDown'

import UserBlock from '../UserBlock'

import { useAppContext } from '../../context/app'

const HeaderComponent = () => {
  const { setSideBar, sideBar, authSig } = useAppContext()

  const userItems = [
    {
      name: 'Logout',
      action: () => false,
    },
  ]

  return (
    <Header
      className={styles.header}
      leftSide={
        <>
          <HeaderModule>
            <HeaderModule indent="s">
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
          </HeaderModule>
        </>
      }
      rightSide={
        <>
          <HeaderModule>
            {authSig?.address ? (
              <UserBlock
                withMenu
                iconRight={IconArrowDown}
                size="l"
                view="clear"
                items={userItems}
                className={styles.user}
                username={authSig.address}
                avatar="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png"
              />
            ) : null}
          </HeaderModule>
        </>
      }
    />
  )
}

export default HeaderComponent
