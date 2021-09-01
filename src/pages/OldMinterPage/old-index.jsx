import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './minter-page.module.scss'

import { Tabs } from '@consta/uikit/Tabs'

const MainPage = () => {
  const [activeTab, setActive] = useState({
    label: 'Main',
    path: '/minter/main',
    value: 'main',
  })

  const history = useHistory()

  const items = [
    {
      label: 'My lits',
      path: '/minter/my-lits',
      value: 'myLits',
    },
    {
      label: 'Mint it',
      path: '/minter/create',
      value: 'mintIt',
    },
  ]

  const handleChangeTab = (value) => {
    history.push(value.path)
    setActive(value)
  }

  return (
    <div className={styles.main}>
      <Tabs
        value={activeTab}
        onChange={({ value }) => handleChangeTab(value)}
        items={items}
        getLabel={(item) => item.label}
        size="m"
        linePosition="bottom"
        view="bordered"
      />
    </div>
  )
}

export default MainPage
