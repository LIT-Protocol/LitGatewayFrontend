import React from 'react'

import styles from './create-layout.module.scss'

import { ChoiceGroup } from '@consta/uikit/ChoiceGroup'
import Select from 'react-select'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconForward } from '@consta/uikit/IconForward'

import {
  MinterFileDropper,
  InputWrapper,
  QuantityInputWrapper,
} from '../../../../../../components'

import { blockChainItems } from '../../../../../../config'

const CreateLayout = ({
  title,
  setTitle,
  blockChain,
  setBlockChain,
  quantity,
  setQuantity,
  publicCover,
  setPublicCover,
  content,
  setContent,
  description,
  setDescription,
  url,
  setUrl,
  setCreateStep,
  chainOptions,
}) => {
  return (
    <div className={styles.createStep}>
      <h1>Mint an NFT with locked content</h1>
      <div className={styles.form}>
        <InputWrapper
          value={title}
          className={styles.input}
          placeholder="Create a title for your LIT"
          label="Title"
          id="title"
          size="l"
          handleChange={(value) => setTitle(value)}
        />
        <h5 className={styles.label}>Blockchain</h5>
        {/* <ChoiceGroup
          value={blockChain}
          onChange={({ value }) => setBlockChain(value)}
          items={blockChainItems}
          getLabel={(item) => item.label}
          className={styles.choice}
        /> */}
        <Select
          isClearable
          options={chainOptions}
          value={blockChain}
          onChange={(value) => setBlockChain(value)}
        />
        <div style={{ height: 32 }} />
        <QuantityInputWrapper
          className={styles.quantity}
          value={quantity}
          handleChange={(value) => setQuantity(value)}
          size="l"
          label="Quantity to mint"
        />
        <div className={styles.files}>
          <div className={styles.fileBlock}>
            <h4>Public Cover (Optional)</h4>
            <MinterFileDropper
              selectedFiles={publicCover}
              setSelectedFiles={setPublicCover}
              allowedTypes="video/*,image/*"
              text="Drag 'n' drop a file here, or click to select a file"
              withPreviews
            />
          </div>
          <div className={styles.fileBlock}>
            <h4>Locked Content (Optional)</h4>
            <MinterFileDropper
              selectedFiles={content}
              setSelectedFiles={setContent}
              allowedTypes="video/*,image/*"
              withFileTable
            />
          </div>
        </div>
        <Text
          className={styles.text}
          as="p"
          size="m"
          lineHeight="m"
          view="brand"
        >
          Upload images, videos or gif files (25mb max total)
        </Text>
        <InputWrapper
          value={description}
          className={styles.input}
          label="Description (Optional)"
          id="description"
          size="l"
          handleChange={(value) => setDescription(value)}
          rows="4"
          type="textarea"
        />
        {/* <InputWrapper
          value={url}
          className={styles.input}
          label="Social Media URL (Optional)"
          id="url"
          size="l"
          handleChange={(value) => setUrl(value)}
        /> */}
      </div>
      <div className={styles.bottom}>
        <Button
          className={styles.btn}
          label="next"
          size="l"
          iconRight={IconForward}
          onClick={() => setCreateStep('review')}
        />
      </div>
    </div>
  )
}

export default CreateLayout
