import React, { useEffect, useState } from 'react'

import { User } from '@consta/uikit/User'

import Dropdown from '../Dropdown'

const UserWithDropdown = ({
  view = 'ghost',
  info,
  size,
  iconRight,
  items,
  username,
  avatar,
  className,
}) => {
  return (
    <Dropdown items={items}>
      <User
        view={view}
        iconRight={iconRight}
        info={info}
        size={size}
        name={username || ''}
        avatarUrl={avatar}
        className={className}
      />
    </Dropdown>
  )
}

const UserBlock = (props) => {
  const { withMenu, username, avatar, className } = props
  const passedProps = { ...props }
  delete passedProps.withMenu

  const Component = !withMenu ? User : UserWithDropdown

  return (
    <Component
      {...passedProps}
      name={username || ''}
      avatarUrl={avatar}
      className={className}
    />
  )
}

export default UserBlock
