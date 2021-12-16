import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

import styles from './single-offer-page.module.scss'

import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { IconBackward } from '@consta/uikit/IconBackward'
import { IconCheck } from '@consta/uikit/IconCheck'
import { Modal } from '@consta/uikit/Modal'
import { Badge } from '@consta/uikit/Badge'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'
import { Card, InputWrapper } from '../../components'

import { Follow } from 'react-twitter-widgets'
import { useAppContext } from '../../context'
import {
  checkForClaimedOgNft,
  getNftCount,
  twitterOauthUrl,
} from '../../api/claimNft'
import { getUserHoldings } from '../../api/users'
import { claimHodlgodOffer } from '../../api/offers'

import litLogo from './assets/lit-logo.png'
import ethIcon from './assets/eth.png'
import litMainImg from './assets/lit-offer-main-img.jpg'
import discountMainImg from './assets/discount-main-img.jpg'
import discountLogo from './assets/discount-logo.png'
import discountMiniLogo from '../OffersPage/assets/discount-offer-icon.png'
import litMiniLogo from '../OffersPage/assets/lit-offer-icon.png'
import discountBack from '../OffersPage/assets/discountBack.png'
import litBack from '../OffersPage/assets/litBack.png'
import blankCanvas from '../OffersPage/assets/blank-canvas.png'

const SingleOfferPage = () => {
  const { title } = useParams()
  const { performWithAuthSig, setGlobalError, tokenList } = useAppContext()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [waxAddress, setWaxAddress] = useState('')
  const [showingHodlgodModal, setShowingHodlgodModal] = useState(false)
  const [nftsRemaining, setNftsRemaining] = useState(null)
  const [ogNftClaimed, setOgNftClaimed] = useState(null)

  // clear global error when the user navigates away
  useEffect(() => {
    return () => {
      setGlobalError(null)
    }
  }, [])

  useEffect(() => {
    if (!nftsRemaining) {
      getNftCount().then((data) => {
        setNftsRemaining(`${data.collection.stats.total_supply}/10,000`)
      })
    }
    handleCheckForOgNftClaims()
  }, [nftsRemaining, ogNftClaimed])

  const handleOgNftButtonAction = async () => {
    if (ogNftClaimed) {
    } else {
      performWithAuthSig(async (authSig) => {
        setGlobalError(null)
        const resp = await twitterOauthUrl({ authSig })
        if (resp && resp.error) {
          setGlobalError({ title: resp.error })
          return
        }
        window.location = resp.url
      })
    }
  }

  const handleCheckForOgNftClaims = async () => {
    performWithAuthSig(async (authSig) => {
      const resp = await checkForClaimedOgNft({ authSig })
      console.log('NFT RESP ', resp)
      // setOgNftClaimed(resp)
    })
  }

  const handleCheckInsuraceEligibility = async () => {
    setGlobalError(null)
    setLoading(true)
    await performWithAuthSig(
      async (authSig) => {
        const { offerEligibilities } = await getUserHoldings({ authSig })
        console.log(offerEligibilities)

        const eligible = offerEligibilities.find(
          (o) => o.campaign === 'insurace_0001',
        )

        if (eligible) {
          // send them to insurace
          window.location =
            'https://app.insurace.io/Insurance/BuyCovers?referrer=142427135090057495346349881552413912237505016455'
        } else {
          setLoading(false)
          setGlobalError({
            title: 'Sorry, you are not eligible for this offer.',
          })
        }
      },
      { chain: 'ethereum', getHoldings: false },
    )
  }
  const handleHodlgodClick = () => {
    setShowingHodlgodModal(true)
  }

  const handleHodlgodWaxWalletEntered = async () => {
    setLoading(true)
    console.log('handleHodlgodWaxWalletEntered', waxAddress)
    setShowingHodlgodModal(false)
    await performWithAuthSig(async (authSig) => {
      const conditions = [
        {
          // check if they hold SLP on ETH
          accessControlConditions: [
            {
              contractAddress: '0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25',
              standardContractType: 'ERC721',
              chain: 'ethereum',
              method: 'balanceOf',
              parameters: [':userAddress'],
              returnValueTest: {
                comparator: '>',
                value: '150',
              },
            },
          ],
          resourceId: {
            baseUrl: 'litgateway.com',
            path: '/offers/hodlgod',
            orgId: '',
            role: '',
            extraData: JSON.stringify({
              chain: 'ethereum',
              contractAddress: '0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25',
            }),
          },
        },
        {
          // check if they hold DEC on ETH
          accessControlConditions: [
            {
              contractAddress: '0x9393fdc77090f31c7db989390d43f454b1a6e7f3',
              standardContractType: 'ERC721',
              chain: 'ethereum',
              method: 'balanceOf',
              parameters: [':userAddress'],
              returnValueTest: {
                comparator: '>',
                value: '1000',
              },
            },
          ],
          resourceId: {
            baseUrl: 'litgateway.com',
            path: '/offers/hodlgod',
            orgId: '',
            role: '',
            extraData: JSON.stringify({
              chain: 'ethereum',
              contractAddress: '0x9393fdc77090f31c7db989390d43f454b1a6e7f3',
            }),
          },
        },
        {
          // check if they hold DEC on BSC
          accessControlConditions: [
            {
              contractAddress: '0xe9d7023f2132d55cbd4ee1f78273cb7a3e74f10a',
              standardContractType: 'ERC721',
              chain: 'bsc',
              method: 'balanceOf',
              parameters: [':userAddress'],
              returnValueTest: {
                comparator: '>',
                value: '1000',
              },
            },
          ],
          resourceId: {
            baseUrl: 'litgateway.com',
            path: '/offers/hodlgod',
            orgId: '',
            role: '',
            extraData: JSON.stringify({
              chain: 'bsc',
              contractAddress: '0xe9d7023f2132d55cbd4ee1f78273cb7a3e74f10a',
            }),
          },
        },
      ]

      const jwts = await Promise.all(
        conditions.map(async (rid) => {
          const resourceId = rid.resourceId
          const chain = rid.accessControlConditions[0].chain
          const accessControlConditions = rid.accessControlConditions

          try {
            const jwt = await window.litNodeClient.getSignedToken({
              accessControlConditions,
              chain,
              authSig,
              resourceId,
            })
            return { rid, jwt }
          } catch (e) {
            return { rid, error: e }
          }
        }),
      )
      console.log('jwts: ', jwts)
      const validJwts = jwts.filter((j) => j.jwt)
      console.log('validJwts: ', validJwts)

      if (validJwts.length > 0) {
        // save their wax address to a claimed offers db table
        await claimHodlgodOffer({
          resources: validJwts,
          waxAddress,
        })

        window.location = 'https://hodlgod.com/'
      } else {
        setGlobalError({
          title: 'Sorry, you are not eligible for this offer.',
        })
        setLoading(false)
      }
    })
  }

  const offers = [
    {
      id: 'lit-protocol-nft',
      title: 'Lit Genesis Gate NFT',
      logo: litLogo,
      tags: ['Lit Protocol'],
      mainBtnLabel: ogNftClaimed
        ? 'Enter NFT Portal'
        : 'Connect Twitter and Claim NFT',
      twitterBtn: true,
      handleMainButtonClick: handleOgNftButtonAction,
      requirement: (
        <div>
          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.4332 5.03516C21.4471 5.24766 21.4471 5.46095 21.4471 5.67579C21.4471 12.2274 16.5419 19.782 7.57213 19.782V19.7773C4.92156 19.782 2.32755 19.0102 0.0969238 17.5555C0.481996 17.6024 0.869393 17.6266 1.25756 17.6273C3.45333 17.6289 5.58633 16.8797 7.31412 15.5008C5.22761 15.4602 3.39754 14.0774 2.75834 12.0578C3.48897 12.2016 4.24284 12.1719 4.95953 11.9727C2.68473 11.5047 1.0476 9.47344 1.0476 7.11329C1.0476 7.09141 1.0476 7.0711 1.0476 7.05001C1.72554 7.43438 2.48484 7.64766 3.26118 7.6711C1.1181 6.21485 0.457978 3.3172 1.75188 1.05157C4.22812 4.14845 7.8805 6.03126 11.8025 6.23048C11.4097 4.50938 11.9458 2.7047 13.2134 1.49376C15.1775 -0.382804 18.2666 -0.286711 20.1129 1.70938C21.2046 1.49063 22.2521 1.08282 23.2098 0.505477C22.8456 1.65313 22.084 2.62813 21.0659 3.24688C22.0329 3.13204 22.9766 2.86798 23.8668 2.4672C23.2121 3.46485 22.387 4.33282 21.4332 5.03516Z"
              fill="#1D9BF0"
            />
          </svg>
          Follow&nbsp;{' '}
          <a
            className={styles.link}
            href="https://twitter.com/litprotocol"
            target="_blank"
          >
            @LitProtocol
          </a>{' '}
          <span className={styles.plus}>+</span>
          >0.005{' '}
          <div className={styles.badge}>
            <img src={ethIcon} alt="" />
            ETH
          </div>
        </div>
      ),
      segmentCenterValue: nftsRemaining,
      timeRemaining: '10 days, 2 hours',
      imgText: "Join the Lit community and let's make an NFT together!",
      segmentCenterTitle: 'NFTS CLAIMED',
      mainImg: litMainImg,
      textBlock: (
        <>
          <p>
            The Lit Genesis Gate NFT is available to the first 9,500 people who
            claim it! In order to claim, you must have more than 0.005 ETH in
            your wallet (though you will not have to pay any ETH for the
            transaction) and follow @LitProtocol on twitter.
          </p>
          <p>
            Once you own the NFT, give it a click and be transported through the
            gate to arrive at a page where you can join a private Discord server
            room and add to the collaborative pixel art project.
          </p>
          <br />
          <img src={blankCanvas} className={styles.blankCanvas} />
          <br />
          <p>
            After 30 days, we’ll turn the resulting canvas, we’ll create two
            NFTs. One will be given to someone in the community and the other
            will be fractionalized and distributed to the artists.
          </p>
          <p>More community projects ahead too!</p>
          <p>
            To get started, click “Claim” to verify that you own at least a bit
            of ETH and connect your twitter account to claim the NFT. We’ll
            cover the transaction fee :)
          </p>
        </>
      ),
      more: [
        {
          title: 'InsurAce 30% Rebate',
          titleIcon: discountMiniLogo,
          tags: ['Staking', 'Finance'],
          id: 'insurace-discount',
          requirement: 'Referral purchase',
          reward: '$INSUR',
          img: discountBack,
        },
      ],
    },
    {
      id: 'insurace-discount',
      title: 'InsurAce 30% Rebate',
      tags: ['Staking', 'Finance'],
      logo: discountLogo,
      mainBtnLabel: 'Get Discount',
      twitterBtn: false,
      requirement: 'Yield farming any supported tokens',
      timeRemaining: '10 days, 2 hours',
      imgText: 'Maintain peace-of-mind while you live your decentralized life.',
      mainImg: discountMainImg,
      handleMainButtonClick: handleCheckInsuraceEligibility,
      textBlock: (
        <>
          <p>
            InsurAce is the leading decentralized insurance protocol, providing
            reliable, robust and secure DeFi insurance services to the DeFi
            users. InsurAce not only guarantees unbeatable portfolio premiums
            but also offers sustainable investment returns. When you sign up via
            this offer, you’ll get a 30% automatic rebate paid in $INSUR tokens
            for your first month and 10% thereafter.
          </p>
        </>
      ),
      more: [
        {
          title: 'Lit Genesis Gate NFT',
          titleIcon: litMiniLogo,
          tags: ['Lit Protocol'],
          id: 'lit-protocol-nft',
          requirement: (
            <span>
              Own ETH & follow{' '}
              <a
                className={styles.link}
                href="https://twitter.com/litprotocol"
                target="_blank"
              >
                @LitProtocol
              </a>
            </span>
          ),
          reward: 'Genesis NFT',
          img: litBack,
        },
      ],
    },
    // {
    //   id: 'hodlgod',
    //   title: 'HodlGod - Play to Earn',
    //   tags: ['Gaming'],
    //   logo: hodlgodLogo,
    //   mainBtnLabel: 'Play',
    //   twitterBtn: false,
    //   requirement: '150 $SLP or 1000 $DEC',
    //   timeRemaining: '10 days, 2 hours',
    //   imgText: 'Find, Collect, and Combine the Immortal Shards',
    //   mainImg: hodlgodBack,
    //   handleMainButtonClick: handleHodlgodClick,
    //   textBlock: (
    //     <>
    //       <p>
    //         If you’re an Axie Infinity or Splinterlands player, this is an
    //         opportunity to earn 50,000 $VOID tokens by playing HodlGod and
    //         earning at least 12,500 XP.
    //       </p>
    //       <p>
    //         The reward of 50,000 $VOID is available to the first 1000 players
    //         who sign up via this offer and reach the XP milestone. Also, this
    //         offer is only available to be claimed by players who have 150 $SLP
    //         or 1000 $DEC in their ETH or BSC wallets.
    //       </p>
    //       <p>
    //         To claim the offer, connect your wallet where you’re holding your
    //         SLP or DEC, enter your WAX blockchain address, and start playing
    //         HodlGod with that same address. This offer is still live as long as
    //         this page is up, and once 1000 players have reached 12,500 XP this
    //         offer will be closed and the $VOID will be directly distributed to
    //         your WAX address.
    //       </p>
    //     </>
    //   ),
    //   more: [
    //     {
    //       title: 'Lit Genesis Gate NFT',
    //       titleIcon: litMiniLogo,
    //       tags: ['Lit Protocol'],
    //       id: 'lit-protocol-nft',
    //       requirement: (
    //         <span>
    //           Own ETH & follow{' '}
    //           <a
    //             className={styles.link}
    //             href="https://twitter.com/litprotocol"
    //             target="_blank"
    //           >
    //             @LitProtocol
    //           </a>
    //         </span>
    //       ),
    //       reward: 'Genesis NFT',
    //       img: litBack,
    //     },
    //   ],
    // },
  ]

  const offer = offers.find((offer) => offer.id === title)

  if (!offer) {
    history.push('/offers')
    return null
  }

  const handleOpenOffer = (title) => {
    history.push(`/offers/${title}`)
  }

  return (
    <>
      <div className={styles.back}>
        <Link to="/offers" className={styles.link}>
          <IconBackward className={styles.backIcon} /> Back to all Offers
        </Link>
      </div>
      <div className={styles.main}>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.left}>
              <img src={offer.logo} alt="" />
              <div className={styles.titles}>
                <h1 className={styles.title}>{offer.title}</h1>
                <div className={styles.tags}>
                  {offer.tags.map((tag, i) => (
                    <Badge key={i} status="system" label={tag} size="l" />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.right}>
              {offer.twitterBtn ? (
                <>
                  {ogNftClaimed ? (
                    <span className={styles.claimedStatus}>
                      <IconCheck className={styles.claimedIcon} />
                      <p className={styles.claimedText}>Claimed!</p>
                    </span>
                  ) : (
                    <>
                      <Follow
                        username="litprotocol"
                        options={{ size: 'large', showCount: false }}
                      />
                      <div style={{ height: 16 }} />
                    </>
                  )}
                </>
              ) : // <button className={styles.customBtn}>
              //   <svg
              //     width="24"
              //     height="20"
              //     viewBox="0 0 24 20"
              //     fill="none"
              //     xmlns="http://www.w3.org/2000/svg"
              //   >
              //     <path
              //       d="M21.3363 5.07056C21.3502 5.28306 21.3502 5.49635 21.3502 5.71119C21.3502 12.2628 16.445 19.8174 7.47521 19.8174V19.8127C4.82464 19.8174 2.23063 19.0456 0 17.5909C0.385072 17.6378 0.772469 17.662 1.16064 17.6628C3.35641 17.6643 5.48941 16.9151 7.2172 15.5362C5.13068 15.4956 3.30062 14.1128 2.66142 12.0932C3.39205 12.237 4.14592 12.2073 4.8626 12.0081C2.58781 11.5401 0.950671 9.50885 0.950671 7.14869C0.950671 7.12681 0.950671 7.1065 0.950671 7.08541C1.62862 7.46978 2.38791 7.68306 3.16426 7.7065C1.02118 6.25025 0.361054 3.3526 1.65496 1.08697C4.1312 4.18385 7.78357 6.06666 11.7056 6.26588C11.3128 4.54478 11.8489 2.7401 13.1165 1.52916C15.0806 -0.347404 18.1697 -0.251311 20.016 1.74478C21.1077 1.52603 22.1552 1.11822 23.1129 0.540877C22.7487 1.68853 21.9871 2.66353 20.969 3.28228C21.936 3.16744 22.8796 2.90338 23.7699 2.5026C23.1152 3.50025 22.29 4.36822 21.3363 5.07056Z"
              //       fill="#1D9BF0"
              //     />
              //   </svg>
              //   Follow @LITProtocol
              // </button>
              null}
              {loading ? (
                <ProgressSpin />
              ) : (
                <Button
                  label={offer.mainBtnLabel}
                  size="l"
                  onClick={offer.handleMainButtonClick}
                />
              )}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.list}>
              <div className={styles.segment}>
                <h3>REQUIREMENT</h3>
                {offer.requirement}
              </div>
              <div>
                {!!offer['segmentCenterTitle'] ? (
                  <div className={styles.segment}>
                    <h3>{offer['segmentCenterTitle']}</h3>
                    <div className={styles.text}>
                      {offer['segmentCenterValue']}
                    </div>
                  </div>
                ) : (
                  <div className={styles.segment}>
                    <h3>TIME REMAINING</h3>
                    <div className={styles.text}>{offer.timeRemaining}</div>
                  </div>
                )}
              </div>
            </div>
            <div
              className={styles.mainImg}
              style={{
                backgroundImage: `url(${offer.mainImg})`,
              }}
            >
              <div></div>
              <h3>{offer.imgText}</h3>
            </div>
            <div className={styles.textBlock}>{offer.textBlock}</div>
          </div>
        </div>
        <div className={styles.more}>
          <div className={styles.content}>
            <h2>More Offers</h2>
            <div className={styles.moreList}>
              <Grid
                cols="1"
                gap="xl"
                breakpoints={{
                  s: {
                    cols: 2,
                  },
                }}
              >
                {offer?.more.length &&
                  offer.more.map((item, i) => (
                    <GridItem key={i}>
                      <Card
                        title={item.title}
                        titleIcon={item.titleIcon}
                        tags={item.tags}
                        className={styles.offer}
                        btns={
                          <Button
                            size="l"
                            label="Details"
                            onClick={() => handleOpenOffer(item.id)}
                          />
                        }
                        desc={
                          <div className={styles.descList}>
                            <ul>
                              <li>
                                REQUIREMENT: <span>{item.requirement}</span>
                              </li>
                              <li>
                                REWARD: <span>{item.reward}</span>
                              </li>
                            </ul>
                          </div>
                        }
                        img={item.img}
                      />
                    </GridItem>
                  ))}
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showingHodlgodModal}
        hasOverlay
        onClickOutside={() => setShowingHodlgodModal(false)}
        onEsc={() => setShowingHodlgodModal(false)}
      >
        <div className={styles.hodlgodModal}>
          <InputWrapper
            id="waxAddress"
            value={waxAddress}
            handleChange={(e) => setWaxAddress(e)}
            label="Enter your WAX Wallet Address"
          />
          <div style={{ height: 24 }} />
          <div>
            <Button
              size="m"
              view="primary"
              label="Submit"
              width="default"
              onClick={handleHodlgodWaxWalletEntered}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default SingleOfferPage
