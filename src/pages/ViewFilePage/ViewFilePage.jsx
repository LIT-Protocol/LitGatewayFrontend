import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import styles from './view-file-page.module.scss'
import { getFile } from '../../api/files'
import { Button } from '@consta/uikit/Button'
import { IconDownload } from '@consta/uikit/IconDownload'
import { humanFileSize, decryptAndDownload } from '../../utils/files'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'

const ViewFilePage = () => {
  let { fileId } = useParams()
  const [file, setFile] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getTheFile = async () => {
      console.log('getting file ', fileId)
      const { file } = await getFile(fileId)
      console.log('got file', file)
      setFile(file)
      setLoading(false)
    }

    getTheFile()
  }, [fileId])

  const downloadFile = async () => {
    setLoading(true)
    await decryptAndDownload({ file, chain: file.chain })
    setLoading(false)
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>View File</h1>
      <h3 className={styles.subtitle}>
        {file.name} - {humanFileSize(file.size)}
      </h3>
      {loading ? (
        <ProgressSpin />
      ) : (
        <Button
          label="Download"
          iconLeft={IconDownload}
          onClick={downloadFile}
        />
      )}
    </div>
  )
}

export default ViewFilePage
