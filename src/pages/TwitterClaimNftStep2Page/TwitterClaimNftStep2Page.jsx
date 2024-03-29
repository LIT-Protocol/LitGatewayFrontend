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
import { claimOgNft, twitterOauthUrl, getNftLink } from '../../api/claimNft'
import { REACT_APP_LIT_GATEWAY_LIT_OG_NFT_TOKEN_ADDRESS } from '../../config'

const TwitterClaimNftPage = () => {
  const { performWithAuthSig, setGlobalError, tokenList } = useAppContext()
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [nftUrl, setNftUrl] = useState(null)

  useEffect(() => {
    if (window.litNodeClient.ready) {
      handleClaimNft()
    } else {
      // wait for network to connect
      document.addEventListener(
        'lit-ready',
        function (e) {
          handleClaimNft()
        },
        false,
      )
    }
  }, [])

  const handleEnterNft = () => {
    window.open(nftUrl, '_blank')
  }

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
            value: '5000000000000000',
          },
        },
      ]

      const resourceId = {
        baseUrl: 'litgateway.com',
        path: '/offers/lit-protocol-nft',
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
          setLoading(false)
          setNftUrl(null)
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
      const resp = await claimOgNft({ jwt, authSig })
      console.log('resp', resp)

      if (resp.error) {
        setGlobalError({ title: 'Error: ' + resp.error })
        setLoading(false)
        setNftUrl(null)
        return
      }
      const { tokenId, txHash } = resp

      const nftLinkResp = await getNftLink(tokenId)

      setSuccessMessage({
        title: 'NFT sent on Polygon',
        details: (
          <>
            <a target="_blank" href={`https://polygonscan.com/tx/${txHash}`}>
              View on PolygonScan
            </a>
          </>
        ),
      })
      setLoading(false)
      setNftUrl(nftLinkResp.data.external_url)
    })
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Minting NFT</h1>

      <div style={{ height: 24 }} />

      {loading ? (
        <>
          Minting NFT on Polygon, please wait for it to be mined...{' '}
          <ProgressSpin />
        </>
      ) : nftUrl ? (
        <Button label="Enter NFT Portal" onClick={handleEnterNft} />
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
