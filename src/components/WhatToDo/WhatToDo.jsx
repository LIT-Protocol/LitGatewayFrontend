import React, { useState } from 'react'

import styles from './what-to-do.module.scss'
import union from '../../assets/union.svg'

const WhatToDo = ({
  onClose,
  openShareModal,
  sharingItems,
  onlyAllowCopySharingLink,
  getSharingLink,
}) => {
  const [showCopied, setShowCopied] = useState(false)

  const copyToClipboard = async () => {
    const fileUrl = getSharingLink(sharingItems[0])
    await navigator.clipboard.writeText(fileUrl)
    // setShowingSnackbar(true);
    // setTimeout(() => setShowingSnackbar(false), 5000);
  }

  return (
    <div className={styles.whatToDoModalOverlay} onClick={() => onClose()}>
      <div
        className={styles.whatToDoModal}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.whatToDoHeaderContainer}>
          <h3 className={styles.whatToDoHeaderTitle}>ACCESS CONTROL</h3>
          <button className={styles.whatToDoHeaderClose}>
            <img
              alt={'close'}
              className={'lsm-h-4'}
              src={union}
              onClick={() => onClose()}
            />
          </button>
        </header>
        <div className={styles.titles}>
          <p>What would you like to do?</p>
        </div>
        <svg
          className={styles.confirmationLogo}
          width="66"
          height="66"
          viewBox="0 0 66 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/1999/xlink"
        >
          <rect
            width="66"
            height="66"
            fill="url(#pattern0)"
            fill-opacity="0.2"
          />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                href="#image0_127_6371"
                transform="translate(0 -0.00166667) scale(0.00333333)"
              />
            </pattern>
            <image
              id="image0_127_6371"
              width="300"
              height="301"
              href="data:image/png;base64,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"
            />
          </defs>
        </svg>

        <div className={styles.types}>
          {!onlyAllowCopySharingLink ? (
            <div className={styles.btnBlock}>
              <button
                className={styles.btnBock}
                onClick={() => {
                  openShareModal()
                  onClose()
                }}
              >
                <h5 className={styles.link}>CREATE REQUIREMENT(S)</h5>
              </button>
            </div>
          ) : null}

          {sharingItems.length === 1 &&
            (sharingItems[0].accessControlConditions ||
              onlyAllowCopySharingLink) && (
              <div>
                {!showCopied ? (
                  <div
                    onClick={async () => {
                      await copyToClipboard()
                      setShowCopied(true)
                    }}
                  >
                    <button className={styles.btnBock}>
                      <h5 className={styles.link}>COPY LINK</h5>
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={async () => {
                      await copyToClipboard()
                    }}
                  >
                    <button className={styles.copied}>
                      <h5 className={styles.link}>COPIED!</h5>
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default WhatToDo
