import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import * as Icon from 'react-feather'
import cx from 'classnames'

import styles from './sidebar.module.scss'

import { IconArrowDown } from '@consta/uikit/IconArrowDown'

import UserBlock from '../UserBlock'

import { useAppContext } from '../../context/app'

const menuItems = [
  {
    title: 'discover',
    icon: 'star',
    to: '/discover',
  },
  {
    title: 'guide',
    icon: 'book',
    to: '/guide',
  },
  {
    title: 'gallery',
    icon: 'play',
    to: '/gallery',
  },
  {
    title: 'apps',
    icon: 'box',
    to: '/apps',
  },
  {
    title: 'earn',
    icon: 'chart',
    to: '/earn',
  },
  {
    title: 'files',
    icon: 'file',
    to: '/files',
  },
  {
    title: 'minter',
    icon: 'briefcase',
    to: '/minter',
  },
  // {
  //     title: 'publish',
  //     icon: 'login',
  //     to: '/publish'
  // },
  {
    title: 'build',
    icon: 'code',
    to: '/build',
  },
]

const componentsIcons = {
  star: Icon.Star,
  play: Icon.Play,
  video: Icon.Video,
  message: Icon.MessageSquare,
  chart: Icon.BarChart,
  briefcase: Icon.Briefcase,
  file: Icon.File,
  login: Icon.LogIn,
  code: Icon.Code,
  box: Icon.Box,
  book: Icon.BookOpen,
}

const IconComponent = (icon) => {
  const Component = componentsIcons[icon]
  return <Component />
}

const SideBar = () => {
  const [chain, setChain] = useState(null)

  const { sideBar, username, setSideBar } = useAppContext()

  const userItems = [
    {
      name: 'Logout',
      action: () => false,
    },
  ]

  return (
    <div className={cx(styles.sideBar, sideBar ? styles.activeSideBar : null)}>
      {username !== null ? (
        <UserBlock
          withMenu
          iconRight={IconArrowDown}
          size="l"
          view="clear"
          items={userItems}
          className={styles.user}
          username={username}
          avatar="/blank-avatar.jpg"
        />
      ) : null}
      <div className={styles.menu}>
        <ul>
          {menuItems.map((item) => (
            <li className="size_m">
              <NavLink
                to={item.to}
                className={styles.link}
                activeClassName={styles.activeLink}
                onClick={() => setSideBar(false)}
              >
                {IconComponent(item.icon)}
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
