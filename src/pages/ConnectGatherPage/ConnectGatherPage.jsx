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
    // saved in localStorage
    const sig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'ethereum' })
  }

  const handleConnectGather = () => {
    const redirectUrl = process.env.REACT_APP_LIT_GATHER_FRONTEND_HOST + '?'
    console.log('redirectUrl', redirectUrl)
    window.location = `https://staging.gather.town/getPublicId?redirectTo=${encodeURIComponent(
      redirectUrl,
    )}`
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Private Gather.town rooms</h1>

      <div style={{ height: 24 }} />

      <Button label="Connect Wallet" onClick={handleConnectWallet} />

      <div style={{ height: 24 }} />

      <Button label="Connect Gather" onClick={handleConnectGather} />
    </div>
  )
}

export default TwitterClaimNftPage
