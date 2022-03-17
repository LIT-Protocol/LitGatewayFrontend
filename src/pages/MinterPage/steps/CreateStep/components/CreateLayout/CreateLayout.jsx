import React from 'react'

import styles from './create-layout.module.scss'

import Select from 'react-select'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconForward } from '@consta/uikit/IconForward'

import {
  MinterFileDropper,
  InputWrapper,
  QuantityInputWrapper,
  Title,
} from '../../../../../../components'

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
      <Title
        className={styles.title}
        title="Unlockable NFT Minter"
        subtitle="Create an NFT that contains locked content that only the owner of the NFT can access."
      />
      <div className={styles.form}>
        <InputWrapper
          value={title}
          className={styles.input}
          placeholder="Create a title for your NFT"
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
              multiple={false}
            />
          </div>
          <div className={styles.fileBlock}>
            <h4>Locked Content (Optional)</h4>
            <MinterFileDropper
              selectedFiles={content}
              setSelectedFiles={setContent}
              allowedTypes="video/*,image/*"
              withFileTable
              multiple={true}
            />
          </div>
        </div>
        <Text
          className={styles.text}
          as="p"
          size="m"
          lineHeight="m"
          view="secondary"
        >
          Upload images, videos or gif files (25mb max total)
        </Text>
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
        <InputWrapper
          value={description}
          className={styles.input}
          label="Description (Optional)"
          placeholder="Create a description for your NFT"
          id="description"
          size="l"
          handleChange={(value) => setDescription(value)}
          rows="4"
          type="textarea"
        />
        <Button
          className={styles.btn}
          label="Next"
          size="l"
          iconRight={IconForward}
          onClick={() => setCreateStep('review')}
        />
      </div>
    </div>
  )
}

export default CreateLayout
