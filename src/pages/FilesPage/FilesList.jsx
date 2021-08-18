import React, { useCallback, useEffect, useState } from 'react'
import { Button } from "@consta/uikit/Button";
import { Table } from '@consta/uikit/Table';
import { IconDownload } from "@consta/uikit/IconDownload";
import { humanFileSize, decryptAndDownload, getFileLink } from '../../utils/files'
import { IconDocFilled } from '@consta/uikit/IconDocFilled'
import { IconConnection } from '@consta/uikit/IconConnection'
import { Modal } from '@consta/uikit/Modal';
import ShareFile from './ShareFile'
import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import { downloadFile } from 'lit-js-sdk';



const FilesList = (props) => {
  const { rows, chain } = props
  const [sharingFileLink, setSharingFileLink] = useState(null)
  const [downloadingIds, setDownloadingIds] = useState([])

  const showFileLink = (file) => {
    const url = getFileLink(file.id)
    console.log('file url is ', url)
    setSharingFileLink(url)
  }

  const downloadFile = async (file) => {
    setDownloadingIds(prev => [...prev, file.id])
    await decryptAndDownload({ file, chain })
    setDownloadingIds(prev => prev.filter(f => f !== file.id))
  }

  const fileTableColumns = [
    {
      title: 'Name',
      accessor: 'name',
      align: 'left',
      sortable: true,
      renderCell: (row) => {
        return (<>
          <IconDocFilled />
          <span style={{ width: 8, display: 'inline-block' }} />
          {row.name}
        </>)
      }
    },
    {
      title: 'Size',
      accessor: 'size',
      sortable: true,
      renderCell: (row) => {
        return humanFileSize(row.size)
      }
    },
    {
      title: 'Uploaded',
      accessor: 'uploadedAt',
      sortable: true,
      renderCell: (row) => {
        return new Date(parseInt(row.uploadedAt) * 1000).toLocaleString()
      }
    },
    {
      title: 'Actions',
      renderCell: (row) => {
        return (<>
          {downloadingIds.includes(row.id)
            ?
            <ProgressSpin />
            : <Button
              label='Download'
              onClick={() => downloadFile(row)}
              iconLeft={IconDownload}
              onlyIcon
              size='s'
              view='clear'
            />
          }

          <Button
            label='Share'
            onClick={() => showFileLink(row)}
            iconLeft={IconConnection}
            onlyIcon
            size='s'
            view='clear'
          />
        </>
        )
      }
    }
  ];

  return (
    <>
      <Table
        columns={fileTableColumns}
        rows={rows}
        emptyRowsPlaceholder='No files yet.  Upload some and they will show up here.'
      />
      <Modal
        isOpen={Boolean(sharingFileLink)}
        hasOverlay
        onOverlayClick={() => setSharingFileLink(null)}
      >
        <div style={{ margin: 16 }}>
          <ShareFile
            fileUrl={sharingFileLink}
          />
        </div>

      </Modal>
    </>
  )
}

export default FilesList

