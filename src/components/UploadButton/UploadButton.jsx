import React from 'react'
import { useDropzone } from 'react-dropzone'

import { Button } from '@consta/uikit/Button'
import { IconUpload } from '@consta/uikit/IconUpload'

const UploadButton = (props) => {
  const { onFilesSelected = () => false } = props

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onFilesSelected,
  })

  return (
    <div {...getRootProps({ style: { display: 'inline-block' } })}>
      <input {...getInputProps()} />
      <Button label="Upload" iconLeft={IconUpload} size="m" />
    </div>
  )
}

export default UploadButton
