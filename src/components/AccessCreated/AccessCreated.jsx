import React, { useState } from 'react'
import union from '../../assets/union.svg'
import styles from './access-created.module.scss'

const AccessCreated = ({
  sharingItems,
  copyLinkText,
  getSharingLink,
  onClose,
}) => {
  const [showCopied, setShowCopied] = useState(false)

  const copyToClipboard = async () => {
    const fileUrl = getSharingLink(sharingItems[0])
    await navigator.clipboard.writeText(fileUrl)
    setShowCopied(true)
  }

  const closeModal = () => {
    setShowCopied(false)
    onClose()
  }

  return (
    <div
      className={styles.accessCreatedModalOverlay}
      onClick={() => closeModal()}
    >
      <div
        className={styles.accessCreatedModal}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.accessCreatedHeaderContainer}>
          <h3 className={styles.accessCreatedHeaderTitle}>ACCESS CONTROL</h3>
          <button className={styles.accessCreatedHeaderClose}>
            <img
              alt={'close'}
              className={'lsm-h-4'}
              src={union}
              onClick={() => closeModal()}
            />
          </button>
        </header>
        <div className={styles.titles}>
          {/*<h3>Access Requirement Created!</h3>*/}
          <p>
            Your condition(s) have been successfully added to the Lit Protocol!
          </p>
          {/* <a className={styles.link} onClick={() => setActiveStep('whatToDo')}>Create Another</a> */}
        </div>
        <svg
          className={styles.confirmationLogo}
          width="66"
          height="78"
          viewBox="0 0 66 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.39"
            d="M61.8301 32.63C59.5735 28.1404 58.4281 23.1745 58.4901 18.15C58.5929 16.4298 59.2408 14.7871 60.3401 13.46C60.3401 13.46 59.8501 13.52 59.1201 13.66C57.4501 13.98 54.4801 14.66 53.0301 15.95C51.1787 17.4881 49.779 19.4995 48.9801 21.77C47.9142 19.1659 46.6051 16.6682 45.0701 14.31C43.1846 12.0384 41.0664 9.97043 38.7501 8.13999C39.5329 11.0722 39.8467 14.1097 39.6801 17.14C39.4003 19.8487 38.8748 22.5264 38.1101 25.14C36.4401 23.3337 35.1762 21.1908 34.4034 18.8553C33.6307 16.5198 33.367 14.0459 33.6301 11.6C34.5201 4.6 40.2301 0.379995 40.6301 0.119995C40.1401 0.219995 32.3101 1.97 27.5801 8.78C23.6201 14.42 23.1701 20.26 25.0201 28C26.6501 34.84 24.4101 38.81 24.4101 38.81C24.4101 38.81 17.4101 40.3 14.6101 35.9C11.8101 31.5 12.9101 24 12.9101 24C12.9101 24 0.120117 33.76 0.120117 46.61C0.120117 60.1 10.8501 77.51 32.4101 77.51C57.2101 77.51 64.5001 56.35 64.9301 49.89C65.3001 44.33 65.1501 39.52 61.8301 32.63ZM45.1401 32.56C45.1401 32.56 45.4701 33.04 45.9901 33.74C46.4013 34.3217 46.7562 34.9411 47.0501 35.59C47.0501 35.59 47.2101 24 51.2901 18.89C53.3823 16.4857 56.0785 14.6837 59.1001 13.67C55.0001 15.76 52.5301 18.14 51.8701 23.15C51.3401 27.2 52.6701 34.92 52.1301 39.77C51.6901 43.77 49.5801 46.77 47.8801 47.65C46.1801 48.53 45.1101 47.86 45.0501 46.55C44.9701 45.03 46.0501 42.37 45.9201 40.23C45.6808 38.1779 45.0816 36.1841 44.1501 34.34L45.1401 32.56ZM33.1501 71C8.74012 70.76 6.87012 48 8.93012 42.79C8.93012 42.79 10.5001 54.97 24.2301 51.86C37.9601 48.75 30.9601 28.2 30.7401 27.54C32.5309 29.2681 34.124 31.1899 35.4901 33.27C37.6501 36.57 38.2601 42.17 37.5501 47.07C36.8401 51.97 37.3001 58.65 46.0701 56.17C56.9801 53.08 56.0701 36.04 56.0701 36.04C61.0301 41.79 61.4601 71.19 33.1501 71Z"
            fill="#C4C4C4"
          />
          <path
            opacity="0.39"
            d="M33.1502 71C8.74016 70.76 6.87016 48 8.93016 42.79C8.93016 42.79 10.5002 54.97 24.2302 51.86C37.9602 48.75 30.9602 28.2 30.7402 27.54C32.5309 29.2681 34.124 31.1899 35.4902 33.27C37.6502 36.57 38.2602 42.17 37.5502 47.07C36.8402 51.97 37.3002 58.65 46.0702 56.17C56.9802 53.08 56.0702 36.04 56.0702 36.04C61.0302 41.79 61.4602 71.19 33.1502 71Z"
            fill="#C4C4C4"
          />
          <path
            opacity="0.39"
            d="M51.8699 23.15C51.3399 27.2 52.6699 34.92 52.1299 39.77C51.6899 43.77 49.5799 46.77 47.8799 47.65C46.1799 48.53 45.1099 47.86 45.0499 46.55C44.9699 45.03 46.0499 42.37 45.9199 40.23C45.6806 38.1779 45.0814 36.1841 44.1499 34.34L45.1499 32.56C45.1499 32.56 45.4799 33.04 45.9999 33.74C46.4111 34.3217 46.766 34.9411 47.0599 35.59C47.0599 35.59 47.2099 24 51.2899 18.89C53.3821 16.4857 56.0783 14.6837 59.0999 13.67C54.9999 15.76 52.5299 18.14 51.8699 23.15Z"
            fill="#C4C4C4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.1613 56.3029L24.1901 50.4535L22.8892 52.0039L31.4093 59.1531L43.108 45.2111L41.559 43.9114L31.1613 56.3029Z"
            fill="#42974A"
          />
        </svg>
        {!!copyLinkText && (
          <div>
            <p>
              {copyLinkText || 'Only authorized users will be granted access.'}
            </p>
          </div>
        )}

        {!showCopied ? (
          <div className={styles.types}>
            <div
              className={styles.type}
              onClick={async () => {
                await copyToClipboard()
              }}
            >
              <div className={styles.btnBock}>
                <h5 className={styles.link}>COPY LINK</h5>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.types}>
            <div
              className={styles.type}
              onClick={async () => {
                await copyToClipboard()
              }}
            >
              <div className={styles.copied}>
                <h5 className={styles.link}>COPIED!</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccessCreated
