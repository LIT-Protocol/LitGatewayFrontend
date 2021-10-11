import React, { useEffect, useRef } from 'react'
import Jazzicon from '@metamask/jazzicon'

import Dropdown from '../Dropdown'

import { useAppContext } from '../../context'

const UserBlock = (props) => {
  const { avatar } = props

  const { username, handleLogout } = useAppContext()

  const avatarRef = useRef(null)

  useEffect(() => {
    if (!avatar && username && avatarRef.current) {
      avatarRef.current.innerHTML = ''
      avatarRef.current.appendChild(
        Jazzicon(42, parseInt(username.slice(2, 10), 16)),
      )
    }
  }, [username])

  const menu = [
    {
      name: 'Logout',
      action: handleLogout,
    },
  ]

  if (!username) return null

  return (
    <Dropdown items={menu}>
      <div ref={avatarRef} />
    </Dropdown>
  )
}

export default UserBlock
