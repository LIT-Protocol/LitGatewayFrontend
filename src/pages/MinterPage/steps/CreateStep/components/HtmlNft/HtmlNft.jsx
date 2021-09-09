import React, { useState } from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'
import Slider from 'react-slick'

import styles from './html-nft-layout.module.scss'

import { Grid, GridItem } from '@consta/uikit/Grid'
import { Badge } from '@consta/uikit/Badge'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconLock } from '@consta/uikit/IconLock'
import { IconUnlock } from '@consta/uikit/IconUnlock'

import { sliderSettings } from '../../../../../../config'

import { getExtension, getImg } from '../../../../../../utils'
import { File } from '@consta/uikit/File'
import MediaGrid from './MediaGrid'

const HtmlNft = ({
  publicCover,
  title,
  description,
  content,
  previewMode,
  quantity,
}) => {
  const ImgPreview = ({ file }) => {
    const imgFormat = ['jpg', 'jpeg', 'png']
    const ext = getExtension(file.name)

    if (imgFormat.includes(ext)) {
      return (
        <div className={styles.preview}>
          <img className={styles.ImgPreview} src={URL.createObjectURL(file)} />
          <h5>{file.name}</h5>
        </div>
      )
    } else {
      return (
        <div className={styles.preview}>
          <File className={styles.FilePreview} extension={ext} />
          <h5>{file.name}</h5>
        </div>
      )
    }
  }

  const [locked, setLocked] = useState(true)

  return (
    <div className={styles.htmlNft}>
      <div className={styles.card}>
        {locked ? (
          <>
            {previewMode ? (
              <Badge
                className={styles.badge}
                size="l"
                status="normal"
                label="Public preview"
              />
            ) : null}
            <div className={styles.img}>
              <img
                className={styles.ImgPreview}
                src={
                  publicCover?.length
                    ? URL.createObjectURL(publicCover[0])
                    : getImg()
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
        ) : (
          <>
            {previewMode ? (
              <Badge
                className={styles.badge}
                size="l"
                status="success"
                label="Private preview"
              />
            ) : null}
            <div className={styles.lockedContentView}>
              <MediaGrid files={content} />
            </div>
          </>
        )}

        <div className={styles.bottomBar}>
          <div>
            {locked ? (
              <Button
                onClick={() => setLocked((prevState) => !prevState)}
                iconLeft={IconLock}
                label="Unlock"
              />
            ) : (
              <Button
                onClick={() => setLocked((prevState) => !prevState)}
                iconLeft={IconUnlock}
                label="Lock"
              />
            )}
          </div>
          <div className={styles.count}>1 of {quantity}</div>
        </div>
      </div>
    </div>
  )
}

export default HtmlNft
