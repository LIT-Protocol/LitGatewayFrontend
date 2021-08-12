import React from 'react'

import styles from './header-component.module.scss'

import {Header, HeaderModule, HeaderButton} from '@consta/uikit/Header'
import {IconAlignJustify} from '@consta/uikit/IconAlignJustify'
import {IconClose} from '@consta/uikit/IconClose'
import {User} from '@consta/uikit/User'

import { useAppContext } from '../../context/app'

const HeaderComponent = () => {

  const {
    setSideBar,
    sideBar
  } = useAppContext()

    return (
      <Header
        leftSide={
          <>
            <HeaderModule>
              <HeaderModule indent="s">
                {!sideBar? (
                  <HeaderButton iconLeft={IconAlignJustify} onClick={() => setSideBar(true)} />
                ):(
                  <HeaderButton iconLeft={IconClose} onClick={() => setSideBar(false)} />
                )}
              </HeaderModule>
            </HeaderModule>
          </>
        }
        rightSide={
          <>
            <HeaderModule>
              <User avatarUrl="https://i.ibb.co/K2R8Lqb/Rectangle-1496.png" name="Sneider.ETH"/>
            </HeaderModule>
          </>
        }
      />
    )
}

export default HeaderComponent