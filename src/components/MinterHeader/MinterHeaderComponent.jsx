import React from 'react'
import { useHistory } from "react-router-dom";

import styles from './minter-header-component.module.scss'

import logo from "./assets/MintLit.svg";

import {Header, HeaderModule, HeaderLogo, HeaderMenu} from '@consta/uikit/Header'

const MinterHeaderComponent = () => {

  const history = useHistory()

  const menuItems = [
    {
      label: 'MintIt',
      href: '/minter/create',
      active: history.location.pathname === '/minter/create'? true : false
    },
    {
      label: 'My Lits',
      href: '/minter/my-lits',
      active: history.location.pathname === '/minter/my-lits' ? true : false
    }
  ]

    return (
      <Header
        className={styles.header}
        leftSide={
          <>
            <HeaderLogo onClick={() => history.push('/minter')}>
              <img src={logo} alt=""/>
            </HeaderLogo>
          </>
        }
        rightSide={
          <>
            <HeaderModule indent="l">
              <HeaderMenu items={menuItems} />
            </HeaderModule>
          </>
        }
      />
    )
}

export default MinterHeaderComponent