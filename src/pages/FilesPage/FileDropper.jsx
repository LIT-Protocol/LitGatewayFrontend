import React, { useMemo, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import LitJsSdk from 'lit-js-sdk'
import { getSharingLink, humanFileSize } from '../../utils/files'
import { IconTrash } from '@consta/uikit/IconTrash'
import { Button } from '@consta/uikit/Button'
import { Table } from '@consta/uikit/Table'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: 'rgb(119 119 119)',
  outline: 'none',
  transition: 'border .24s ease-in-out',
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

const FileDropper = ({ onFilesSelected }) => {
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    // console.log('dropped', acceptedFiles)
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])
  // console.log(selectedFiles)

  const removeFile = (file) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((f) => f.name !== file.name),
    )
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
      accessor: 'name',
      align: 'left',
      sortable: true,
      renderCell: (row) => {
        console.log('rendering', row)
        return row.name
      },
    },
    {
      title: 'Size',
      accessor: 'size',
      sortable: true,
      renderCell: (row) => {
        return humanFileSize(row.size)
      },
    },
    {
      title: 'Actions',
      renderCell: (row) => {
        return (
          <>
            <Button
              onClick={() => removeFile(row)}
              iconLeft={IconTrash}
              onlyIcon
              size="s"
              view="clear"
            />
          </>
        )
      },
    },
  ]

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {selectedFiles.length > 0 ? (
        <>
          <div style={{ height: 16 }} />
          <Table
            columns={fileTableColumns}
            rows={selectedFiles.map((f) => ({
              name: f.name,
              size: f.size,
              id: f.name,
            }))}
            emptyRowsPlaceholder="No files yet.  Pick some and they will show up here."
          />
          <div style={{ height: 16 }} />
          <Button label="Next" onClick={() => onFilesSelected(selectedFiles)} />
        </>
      ) : null}
    </div>
  )
}

export default FileDropper
