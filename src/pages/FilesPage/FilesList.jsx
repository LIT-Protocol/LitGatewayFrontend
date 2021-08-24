import React, { useCallback, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { Button } from "@consta/uikit/Button";
import { Table } from '@consta/uikit/Table';
import { IconDownload } from "@consta/uikit/IconDownload";
import { IconDocFilled } from '@consta/uikit/IconDocFilled'
import { IconConnection } from '@consta/uikit/IconConnection'
import { IconFolders } from '@consta/uikit/IconFolders'
import { Modal } from '@consta/uikit/Modal';
import { ProgressSpin } from '@consta/uikit/ProgressSpin';

import { humanFileSize, decryptAndDownload, getSharingLink } from '../../utils/files'

import { ShareModal } from 'lit-access-control-conditions-modal'


const FilesList = (props) => {
  const { rows, chain } = props
  const [selectedItem, setSelectedItem] = useState(null)
  const [downloadingIds, setDownloadingIds] = useState([])
  const [showShareModal, setShowShareModal] = useState(false)

  const onAccessControlConditionsSelected = (accessControlConditions) => {
    console.log('in FilesList and onAccessControlConditionsSelected callback called with conditions', accessControlConditions)
  }

  const showFileLink = (file) => {
    setSelectedItem(file)
    setShowShareModal(true)
  }

  const downloadFile = async (file) => {
    setDownloadingIds(prev => [...prev, file.id])
    await decryptAndDownload({ file, chain })
    setDownloadingIds(prev => prev.filter(f => f !== file.id))
  }

  const closeShareModal = () => {
    setShowShareModal(false)
    setSelectedItem(null)
  }

  const fileTableColumns = [
    {
      title: 'Name',
      accessor: 'name',
      align: 'left',
      sortable: true,
      renderCell: (row) => {
        return (<>
          {row.ipfsHash // folders don't have an ipfs hash
            ? <IconDocFilled />
            : <IconFolders />
          }

          <span style={{ width: 8, display: 'inline-block' }} />

          {row.ipfsHash // folders don't have an ipfs hash
            ? row.name //<Link to={`/files/view/${row.id}`}>{row.name}</Link>
            : <Link to={`/files/folders/${row.id}`}>{row.name}</Link>
          }
        </>)
      }
    },
    {
      title: 'Size',
      accessor: 'size',
      sortable: true,
      renderCell: (row) => {
        return row.ipfsHash ? humanFileSize(row.size) : ''
      }
    },
    {
      title: 'Uploaded',
      accessor: 'uploadedAt',
      sortable: true,
      renderCell: (row) => {
        return row.ipfsHash ? new Date(parseInt(row.uploadedAt) * 1000).toLocaleString() : ''
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

      {showShareModal ? (
        <ShareModal
          onClose={() => closeShareModal()}
          sharingItems={[selectedItem]}
          onAccessControlConditionsSelected={onAccessControlConditionsSelected}
          getSharingLink={getSharingLink}
        />
      ) : null}
    </>
  )
}

export default FilesList

