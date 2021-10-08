import React from 'react'
import { Link } from 'react-router-dom'

import styles from './single-offer-page.module.scss'

import { Star, Monitor, HelpCircle } from 'react-feather'
import { Button } from '@consta/uikit/Button'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { withTooltip } from '@consta/uikit/withTooltip'
import { IconBackward } from '@consta/uikit/IconBackward'

import litLogo from './assets/lit-logo.png'
import ethIcon from './assets/eth.png'
import Card2 from './assets/maksim-istomin-w6auPDgfDS0-unsplash.jpg'
import { Badge } from '@consta/uikit/Badge'

const SingleOfferPage = () => {
  const HelpCircleWithTooltip = withTooltip({ content: 'Help' })(HelpCircle)

  const offers = [{}]

  const offer = {
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
    nftClaims: '0/10,000',
    timeRemaining: '10 days, 2 hours',
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
              <img src={litLogo} alt="" />
              <div className={styles.titles}>
                <h1 className={styles.title}>Lit Protocol NFT Drop 01</h1>
                <Badge status="system" label="Lit Protocol" size="l" />
              </div>
            </div>
            <div className={styles.right}>
              <button className={styles.customBtn}>
                <svg
                  width="24"
                  height="20"
                  viewBox="0 0 24 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3363 5.07056C21.3502 5.28306 21.3502 5.49635 21.3502 5.71119C21.3502 12.2628 16.445 19.8174 7.47521 19.8174V19.8127C4.82464 19.8174 2.23063 19.0456 0 17.5909C0.385072 17.6378 0.772469 17.662 1.16064 17.6628C3.35641 17.6643 5.48941 16.9151 7.2172 15.5362C5.13068 15.4956 3.30062 14.1128 2.66142 12.0932C3.39205 12.237 4.14592 12.2073 4.8626 12.0081C2.58781 11.5401 0.950671 9.50885 0.950671 7.14869C0.950671 7.12681 0.950671 7.1065 0.950671 7.08541C1.62862 7.46978 2.38791 7.68306 3.16426 7.7065C1.02118 6.25025 0.361054 3.3526 1.65496 1.08697C4.1312 4.18385 7.78357 6.06666 11.7056 6.26588C11.3128 4.54478 11.8489 2.7401 13.1165 1.52916C15.0806 -0.347404 18.1697 -0.251311 20.016 1.74478C21.1077 1.52603 22.1552 1.11822 23.1129 0.540877C22.7487 1.68853 21.9871 2.66353 20.969 3.28228C21.936 3.16744 22.8796 2.90338 23.7699 2.5026C23.1152 3.50025 22.29 4.36822 21.3363 5.07056Z"
                    fill="#1D9BF0"
                  />
                </svg>
                Follow @LITProtocol
              </button>
              <Button label="Claim NFT" size="l" />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.list}>
              <div className={styles.segment}>
                <h3>REQUIREMENT</h3>
                {offer.requirement}
              </div>
              <div className={styles.segment}>
                <h3>NFTS CLAIMED</h3>
                <div className={styles.text}>{offer.nftClaims}</div>
              </div>
              <div className={styles.segment}>
                <h3>TIME REMAINING</h3>
                <div className={styles.text}>{offer.timeRemaining}</div>
              </div>
            </div>
          </div>
          <div className={styles.textBlock}>
            <Text spacing="s">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </Text>
            <Link className={styles.support}>
              Support <HelpCircleWithTooltip />
            </Link>
          </div>
          <div className={styles.text}>
            <h3>Requirement details</h3>
            <Text spacing="s">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its{' '}
              <Link className={styles.link}>layout</Link>.
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleOfferPage
