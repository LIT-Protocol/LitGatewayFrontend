import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'
import Slider from 'react-slick'

import styles from './review-layout.module.scss'

import { Grid, GridItem } from '@consta/uikit/Grid'
import { Badge } from '@consta/uikit/Badge'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconLock } from '@consta/uikit/IconLock'

import { sliderSettings } from '../../../../../../config'

import { getExtension, getImg } from '../../../../../../utils'
import { File } from '@consta/uikit/File'
import HtmlNft from '../HtmlNft'

const ReviewLayout = ({
  publicCover,
  title,
  description,
  quantity,
  blockChain,
  code,
  setCode,
  content,
  setCreateStep,
  handleBack,
}) => {
  const ImgPreview = ({ file }) => {
    const imgFormat = ['jpg', 'jpeg', 'png']
    const ext = getExtension(file.name)

    if (imgFormat.includes(ext)) {
      return (
        <div className={styles.preview}>
          <img className={styles.ImgPreview} src={file.dataUrl} />
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

  return (
    <div className={styles.reviewStep}>
      <Button label="Back" view="ghost" onClick={handleBack} />
      <h2 className={styles.title}>Review your NFT</h2>
      <HtmlNft
        publicCover={publicCover}
        title={title}
        description={description}
        content={content}
        quantity={quantity}
        previewMode={true}
      />
      {content.length ? (
        <div className={styles.content}>
          <h4>Locked Content Preview</h4>
          <Slider {...sliderSettings}>
            {content.map((item) => (
              <div className={styles.smallCard}>
                <ImgPreview file={item} />
              </div>
            ))}
          </Slider>
        </div>
      ) : null}
      <div className={styles.bottom}>
        <Button
          className={styles.btn}
          label="Mint it"
          size="l"
          onClick={() => setCreateStep('success')}
        />
      </div>
    </div>
  )
}

export default ReviewLayout
