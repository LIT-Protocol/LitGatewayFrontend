import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import styles from './file-dropper.module.scss'

import { IconTrash } from '@consta/uikit/IconTrash'
import { IconDownload } from '@consta/uikit/IconDownload'
import { Button } from '@consta/uikit/Button'
import { Table } from '@consta/uikit/Table'
import { Attach } from '@consta/uikit/Attach'

import { humanFileSize } from '../../utils/files'

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
  textAlign: 'center',
  backgroundColor: '#fafafa',
  color: 'rgb(119 119 119)',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
  minHeight: 95,
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

const MinterFileDropper = (props) => {
  const {
    selectedFiles,
    setSelectedFiles,
    withPreviews = false,
    withFileTable = false,
    text = "Drag 'n' drop some files here, or click to select files",
    allowedTypes = '*',
  } = props

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const removeFile = (file) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((f) => f.name !== file.name),
    )
  }

  const thumbs = selectedFiles?.map((file) => (
    <div className={styles.imgWrap} key={file.name}>
      <img src={URL.createObjectURL(file)} />
      <IconTrash
        className={styles.icon}
        view="brand"
        onClick={() => removeFile(file)}
      />
    </div>
  ))

  // useEffect(() => () => {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  // }, [selectedFiles]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: allowedTypes })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  )

  const getExtension = (name) => {
    const arr = name.split('.')
    return arr[arr.length - 1]
  }

  const fileTableColumns = [
    {
      title: 'Name',
      accessor: 'name',
      align: 'left',
      sortable: true,
      renderCell: (row) => {
        return (
          <Attach
            fileName={row.name}
            fileExtension={getExtension(row.name)}
            fileDescription={`size: ${humanFileSize(row.size)}`}
          />
        )
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
        <div>
          <IconDownload view="brand" size="m" />
          <p>{text}</p>
        </div>
      </div>
      {withFileTable && selectedFiles?.length > 0 ? (
        <>
          <div style={{ height: 16 }} />
          <Table
            columns={fileTableColumns}
            rows={selectedFiles.map((f) => ({ name: f.name, size: f.size }))}
            emptyRowsPlaceholder="No files yet.  Pick some and they will show up here."
            borderBetweenRows
            zebraStriped="odd"
          />
          <div style={{ height: 16 }} />
        </>
      ) : null}
      {withPreviews && thumbs?.length ? (
        <div className={styles.previews}>{thumbs}</div>
      ) : null}
    </div>
  )
}

export default MinterFileDropper
