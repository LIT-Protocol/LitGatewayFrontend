import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styles from './connect-gather-page.module.scss'
import { Follow } from 'react-twitter-widgets'
import { InputWrapper } from '../../components'
import { Button } from '@consta/uikit/Button'
import { Informer } from '@consta/uikit/Informer'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'
import { useAppContext } from '../../context'
import LitJsSdk from 'lit-js-sdk'
import { claimOgNft, twitterOauthUrl } from '../../api/claimNft'
import { REACT_APP_LIT_GATEWAY_LIT_OG_NFT_TOKEN_ADDRESS } from '../../config'

const TwitterClaimNftPage = () => {
  const { performWithAuthSig, setGlobalError, tokenList } = useAppContext()

  const handleConnectWallet = async () => {
    // saved in localStorage so no need to store locally
    performWithAuthSig(() => {})
  }

  const handleConnectGather = () => {
    performWithAuthSig((authSig) => {
      const q = {
        authSig: JSON.stringify(authSig),
      }
      const redirectUrl =
        process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL +
        '/oauth/gather/callback?' +
        new URLSearchParams(q).toString() +
        '&'
      // console.log('redirectUrl', redirectUrl)
      window.location = `https://gather.town/getPublicId?redirectTo=${encodeURIComponent(
        redirectUrl,
      )}`
    })
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Token Gated Gather.Town</h1>

      <div style={{ height: 24 }} />
      <h3>Step 1: </h3>
      <Button label="Connect Wallet" onClick={handleConnectWallet} />

      <div style={{ height: 24 }} />
      <h3>Step 2:</h3>
      <Button label="Connect and join Gather" onClick={handleConnectGather} />
    </div>
  )
}

export default TwitterClaimNftPage
