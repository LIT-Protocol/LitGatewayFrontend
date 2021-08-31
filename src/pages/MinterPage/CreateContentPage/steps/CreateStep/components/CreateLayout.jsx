import React from "react";

import styles from "../../../create-content-page.module.scss";

import {ChoiceGroup} from "@consta/uikit/ChoiceGroup";
import {Text} from "@consta/uikit/Text";
import {Button} from "@consta/uikit/Button";
import {IconForward} from "@consta/uikit/IconForward";

import {FileDropper, InputWrapper, QuantityInputWrapper} from "../../../../../../components";

import {blockChainItems} from "../../../../../../config";

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
                        setCreateStep
                      }) => {
  return (
    <div className={styles.createStep}>
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
        <ChoiceGroup
          value={blockChain}
          onChange={({value}) => setBlockChain(value)}
          items={blockChainItems}
          getLabel={(item) => item.label}
          className={styles.choice}
        />
        <QuantityInputWrapper
          className={styles.quantity}
          value={quantity}
          handleChange={(value) => setQuantity(value)}
          size="l"
          label="Quantity"
        />
        <div className={styles.files}>
          <div className={styles.fileBlock}>
            <h4>Public Cover (Optional)</h4>
            <FileDropper selectedFiles={publicCover} setSelectedFiles={setPublicCover} withPreviews/>
          </div>
          <div className={styles.fileBlock}>
            <h4>Locked Content (Optional)</h4>
            <FileDropper selectedFiles={content} setSelectedFiles={setContent} withFileTable/>
          </div>
        </div>
        <Text className={styles.text} as="p" size="m" lineHeight="m" view="brand">Upload images, videos or audio files
          (25mb max total)</Text>
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
        <InputWrapper
          value={url}
          className={styles.input}
          label="Social Media URL (Optional)"
          id="url"
          size="l"
          handleChange={(value) => setUrl(value)}
        />
      </div>
      <div className={styles.bottom}>
        <Button className={styles.btn} label="next" size="l" iconRight={IconForward}
                onClick={() => setCreateStep('review')}/>
      </div>
    </div>
  )
}

export default CreateLayout