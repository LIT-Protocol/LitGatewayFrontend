import React, { useCallback, useEffect, useState } from 'react'
import { Button } from "@consta/uikit/Button";
import { TextField } from "@consta/uikit/TextField";
import { IconCopy } from '@consta/uikit/IconCopy'
import styles from './files-page.module.scss'
import { SnackBar } from '@consta/uikit/SnackBar';

const ShareFile = (props) => {
  const { fileUrl } = props
  const [showingSnackbar, setShowingSnackbar] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(fileUrl)
    setShowingSnackbar(true)
    setTimeout(() => setShowingSnackbar(false), 5000)
  }

  return (
    <>
      <h3 className={styles.subtitle}>Share File</h3>
      <TextField value={fileUrl} width="full" />
      <div style={{ height: 16 }} />
      <Button label='Copy' iconLeft={IconCopy} onClick={copyToClipboard} />
      <div style={{ height: 16 }} />
      {showingSnackbar ? <SnackBar items={[{ key: 1, message: 'Copied!' }]} /> : null}
    </>
  )
}

export default ShareFile

