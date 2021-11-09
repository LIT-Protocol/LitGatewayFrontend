import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import styles from './frame-page.module.scss'

const FRAME_URLS = {
  google: process.env.REACT_APP_LIT_GATEWAY_OAUTH_APP_HOST + '/google',
  zoom: process.env.REACT_APP_LIT_GATEWAY_OAUTH_APP_HOST + '/zoom',
}

const FramePage = () => {
  const { frameType } = useParams()
  const history = useHistory()

  if (!frameType) {
    history.push('/apps')
    return null
  }

  const frameUrl = FRAME_URLS[frameType]

  return (
    <iframe
      width="100%"
      height="100%"
      style={{ width: '100%', height: '100vh', border: 'none' }}
      src={frameUrl}
    />
  )
}

export default FramePage
