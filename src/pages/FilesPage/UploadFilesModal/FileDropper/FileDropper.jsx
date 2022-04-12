import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { humanFileSize } from 'utils/files'

import { Table } from 'components'

import styles from './file-dropper.module.scss'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 36px',
  border: '1px dashed rgba(0, 5, 51, 0.6)',
  borderRadius: '3px',
  backgroundColor: '#fafafa',
  color: 'rgb(119 119 119)',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  maxWidth: '304px',
  margin: '0 auto',
  boxSizing: 'border-box',
  cursor: 'pointer',
}

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

const FileDropper = (props) => {
  const { defaultFiles = [], onFilesSelected, updateFiles } = props

  const [selectedFiles, setSelectedFiles] = useState([...defaultFiles])

  useEffect(() => {
    updateFiles(selectedFiles)
  }, [selectedFiles])

  const onDrop = useCallback((acceptedFiles) => {
    console.log('dropped', acceptedFiles)
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const removeFile = (file) => {
    const filteredFiles = selectedFiles.filter((f) => f.name !== file.name)
    setSelectedFiles(filteredFiles)
    updateFiles(filteredFiles)
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  )

  const fileTableColumns = [
    {
      title: 'Name',
      name: 'name',
    },
    {
      title: 'Size',
      name: 'size',
    },
  ]

  return (
    <div>
      {/*{selectedFiles.length > 0 ? (*/}
      <>
        <Table
          className={styles.tableWrapper}
          columns={fileTableColumns}
          rows={selectedFiles.map((f) => ({
            name: f.name,
            size: humanFileSize(f.size),
            id: f.name,
          }))}
          onRemove={removeFile}
        />
      </>
      {/*) : null}*/}

      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>+ Add additional files</p>
      </div>
    </div>
  )
}

export default FileDropper
