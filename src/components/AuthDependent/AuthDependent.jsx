import React from 'react'

import { useAppContext } from '../../context'

const AuthDependent = (props) => {
  const { children } = props

  const { username } = useAppContext()

  return username ? children : null
}

export default AuthDependent
