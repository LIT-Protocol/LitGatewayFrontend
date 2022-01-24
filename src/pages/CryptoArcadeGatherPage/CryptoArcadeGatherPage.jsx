import React, { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import styles from './crypto-arcade-gather-page.module.scss'

import gatherLogo from '../SingleAppPage/assets/gather.svg'
import gatherBack from '../SingleAppPage/assets/gatherBack.jpg'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { IconBackward } from '@consta/uikit/IconBackward'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'
import { Badge } from '@consta/uikit/Badge'
import { Card, GetUpdates } from '../../components'
import { apps } from '../../data/apps'
import { useAppContext } from '../../context'

import { storeHoldingsFromLit } from '../../api/users'

const CryptoArcadeGatherPage = () => {
  const { performWithAuthSig } = useAppContext()

  const [launchButtonLoading, setLaunchButtonLoading] = useState(false)

  const handleLaunchButtonClick = async () => {
    setLaunchButtonLoading(true)
    await performWithAuthSig(async (authSig) => {
      const chain = 'harmony'
      // check if they are eligible
      const accessControlConditions = [
        {
          contractAddress: '0x508f6057612b30b024dd054cabdf0c46a7124087',
          standardContractType: 'ERC1155',
          chain,
          method: 'balanceOf',
          parameters: [
            ':userAddress',
            '1053985237318200751294693195373338487820285140688',
          ],
          returnValueTest: {
            comparator: '>',
            value: '0',
          },
        },
      ]

      const resourceId = {
        addr: '0x508f6057612b30b024dd054cabdf0c46a7124087',
        resourceId: {
          baseUrl: 'gather.town',
          path: 'IIiU7UpulMdbsQ3w/nostalgea',
          orgId: '',
          role: '',
          extraData:
            '{"chain":"harmony","contractAddress":"0x508f6057612b30b024dd054cabdf0c46a7124087"}',
        },
        chain,
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
        console.log('error getting jwt.  swallowing', e)
      }
      console.log('jwt: ', jwt)
      if (jwt) {
        await storeHoldingsFromLit({
          authSig,
          resources: [{ rid: { resourceId }, jwt }],
        })
      }
      console.log('holdings stored!  now redirecting to gather.')
      const q = {
        authSig: JSON.stringify(authSig),
        gatherUrl: 'https://gather.town/app/IIiU7UpulMdbsQ3w/nostalgea',
      }
      const redirectUrl =
        process.env.REACT_APP_LIT_GATEWAY_FRONTEND_API_URL +
        '/oauth/gather/callback?' +
        new URLSearchParams(q).toString() +
        '&'
      console.log('redirectUrl', redirectUrl)
      window.location = `https://gather.town/getPublicId?redirectTo=${encodeURIComponent(
        redirectUrl,
      )}`
    })
    setLaunchButtonLoading(false)
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.left}>
              <img className={styles.logo} src={gatherLogo} alt="" />
              <div className={styles.titles}>
                <h1 className={styles.title}>Crypto Arcade</h1>
                <div className={styles.tags}>
                  <Badge status="system" label="Gaming" size="l" />
                </div>
              </div>
            </div>
            <div className={styles.right}>
              {launchButtonLoading ? (
                <ProgressSpin />
              ) : (
                <Button
                  label="Launch"
                  size="l"
                  onClick={() => handleLaunchButtonClick()}
                />
              )}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.textBlock}>
              Connect your wallet and join the Crypto Arcade Gather space
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CryptoArcadeGatherPage
