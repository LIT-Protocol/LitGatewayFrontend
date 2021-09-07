import React from 'react'

import styles from './header-component.module.scss'

import { Header, HeaderModule, HeaderButton } from '@consta/uikit/Header'
import { IconAlignJustify } from '@consta/uikit/IconAlignJustify'
import { IconClose } from '@consta/uikit/IconClose'
import { IconArrowDown } from '@consta/uikit/IconArrowDown'

import UserBlock from '../UserBlock'

import { useAppContext } from '../../context/app'

const HeaderComponent = () => {
  const { setSideBar, sideBar, username } = useAppContext()

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
            <div></div>
          </HeaderModule>
        </>
      }
    />
  )
}

export default HeaderComponent
