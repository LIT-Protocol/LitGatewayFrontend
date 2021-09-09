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

import { sliderSettings } from '../../../../../../config'

import { getExtension, getImg } from '../../../../../../utils'
import { File } from '@consta/uikit/File'

const ReviewLayout = ({
  publicCover,
  title,
  description,
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

  console.log('title', title)

  return (
    <div className={styles.reviewStep}>
      <Button label="Back" view="ghost" onClick={handleBack} />
      <h2 className={styles.title}>Review Your Lit</h2>
      {/* <Grid
        cols="1"
        gap="xl"
        breakpoints={{
          s: {
            cols: 2,
          },
        }}
      >
        <GridItem> */}
      <div className={styles.card}>
        <Badge
          className={styles.badge}
          size="l"
          status="normal"
          label="Public preview"
        />
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
        <div className={styles.count}>10/10</div>
      </div>
      {/* </GridItem>
        <GridItem>
          <Badge
            className={styles.blockchain}
            size="l"
            status="success"
            label={blockChain.label}
          />
          <div className={styles.code}>
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={(code) => setCode({ code })}
              name="UNIQUE_ID_OF_DIV"
              value={code}
            />
          </div>
        </GridItem>
      </Grid> */}
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
          label="Mint It!"
          size="l"
          onClick={() => setCreateStep('success')}
        />
      </div>
    </div>
  )
}

export default ReviewLayout
