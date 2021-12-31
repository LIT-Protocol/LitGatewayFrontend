import React, { useState } from 'react'
import ace from 'ace-builds/src-min-noconflict/ace'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'

import styles from './html-nft-layout.module.scss'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconLock } from '@consta/uikit/IconLock'
import { IconUnlock } from '@consta/uikit/IconUnlock'

import { getImg } from '../../../../../../utils'
import MediaGrid from './MediaGrid'

const HtmlNft = ({
  publicCover,
  title,
  description,
  content,
  previewMode,
  quantity,
}) => {
  const [locked, setLocked] = useState(true)

  let showingFiles = []

  if (!locked && previewMode) {
    showingFiles = content
  }

  return (
    <div className="Theme Theme_color_gpnDefault Theme_control_gpnDefault Theme_font_gpnDefault Theme_size_gpnDefault Theme_space_gpnDefault Theme_shadow_gpnDefault">
      <div className={styles.htmlNft}>
        <div className={styles.card}>
          <div className={styles.topBar}>
            <div>
              {locked ? (
                <Button
                  onClick={() => setLocked((prevState) => !prevState)}
                  iconLeft={IconLock}
                  label="Unlock"
                  id="unlockButton"
                />
              ) : (
                <Button
                  onClick={() => setLocked((prevState) => !prevState)}
                  iconLeft={IconUnlock}
                  label="Lock"
                />
              )}
            </div>
            <div id="lockedHeader" className={styles.lockedText}>
              {(locked && previewMode) || !previewMode ? 'LOCKED' : 'UNLOCKED'}
            </div>
            <div className={styles.count}>1 of {quantity}</div>
          </div>
          {!previewMode ? (
            <div className={styles.loadingText} id="loadingText">
              Connecting to Lit Protocol...
            </div>
          ) : null}
          <div id="mediaGridHolder" className={styles.lockedContentView}>
            {(locked && previewMode) || !previewMode ? (
              <>
                <div className={styles.img}>
                  <img
                    className={styles.imgPreview}
                    src={
                      publicCover?.length ? publicCover[0].dataUrl : getImg()
                    }
                  />
                </div>
                <div className={styles.mainContent}>
                  <h4>{title}</h4>
                  {description ? (
                    <Text
                      className={styles.text}
                      as="p"
                      size="m"
                      lineHeight="m"
                      view="primary"
                    >
                      {description}
                    </Text>
                  ) : null}
                </div>
              </>
            ) : null}

            <MediaGrid files={showingFiles} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HtmlNft
