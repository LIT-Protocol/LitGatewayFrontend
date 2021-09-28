import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styles from './twitter-claim-nft-page.module.scss'
import { Follow } from 'react-twitter-widgets'
import { InputWrapper } from '../../components'
import { Button } from '@consta/uikit/Button'
import { Informer } from '@consta/uikit/Informer'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'
import { useAppContext } from '../../context'
import LitJsSdk from 'lit-js-sdk'

const TwitterClaimNftPage = () => {
  const { performWithAuthSig, setGlobalError, tokenList } = useAppContext()
  const [twitterUsername, setTwitterUsername] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleClaimNft = () => {
    setGlobalError(null)
    setSuccessMessage(null)
    performWithAuthSig(async (authSig) => {
      setLoading(true)

      // validate that they hold more than 0.05 eth
      const chain = 'ethereum'

      const accessControlConditions = [
        {
          contractAddress: '',
          standardContractType: '',
          chain,
          method: 'eth_getBalance',
          parameters: [':userAddress', 'latest'],
          returnValueTest: {
            comparator: '>=',
            value: '50000000000000000',
          },
        },
      ]

      const resourceId = {
        baseUrl: 'litgateway.com',
        path: '/twitterClaimNft',
        orgId: '',
        role: '',
        extraData: '',
      }
      let jwt
      try {
        jwt = await window.litNodeClient.getSignedToken({
          accessControlConditions,
          chain,
          authSig,
          resourceId,
        })
      } catch (e) {
        console.log(e)
        if (e.errorCode === 'not_authorized') {
          console.log('not authorized')
          const humanized = [
            await LitJsSdk.humanizeAccessControlConditions({
              accessControlConditions,
              tokenList,
              myWalletAddress: authSig.address,
            }),
          ]
          setGlobalError({
            title:
              "Unable to claim NFT.  You probably don't meet the access control conditions below",
            details: humanized.map((f, i) => <div key={i}>{f}</div>),
          })
          return
        } else {
          throw e
        }
      }

      console.log('jwt', jwt)

      // send JWT to server which will gift the NFT if the JWT is valid
      // await claimOgNft({jwt, authSig})

      setSuccessMessage({
        title: 'NFT sent on Polygon',
        details: (
          <a target="_blank" href="https://opensea.io">
            View on OpenSea
          </a>
        ),
      })
      setLoading(false)
    })
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Claim your Lit OG NFT</h1>
      <h3 className={styles.subtitle}>
        Connect your wallet and follow us on Twitter to receive a free NFT
      </h3>
      <h4>
        Note: You must have at least 0.05 ETH in your wallet to be eligible
      </h4>
      <Follow username="litprotocol" options={{ size: 'large' }} />
      <p>
        Once you're following @litprotocol, enter your Twitter username below to
        connect your wallet and claim your NFT
      </p>
      <InputWrapper
        label="Your Twitter username"
        value={twitterUsername}
        handleChange={setTwitterUsername}
      />
      <div style={{ height: 24 }} />

      {loading ? (
        <ProgressSpin />
      ) : (
        <Button label="Claim NFT" onClick={handleClaimNft} />
      )}

      {successMessage ? (
        <>
          <div style={{ height: 24 }} />
          <Informer
            status="success"
            view="filled"
            title={successMessage.title}
            label={successMessage.details}
          />
        </>
      ) : null}
    </div>
  )
}

export default TwitterClaimNftPage
