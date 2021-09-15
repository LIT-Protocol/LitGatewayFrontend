import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import uint8arrayToString from 'uint8arrays/to-string'
import { ShareModal } from 'lit-access-control-conditions-modal'

import { Button } from '@consta/uikit/Button'
import { Table } from '@consta/uikit/Table'
import { IconDownload } from '@consta/uikit/IconDownload'
import { IconDocFilled } from '@consta/uikit/IconDocFilled'
import { IconConnection } from '@consta/uikit/IconConnection'
import { IconFolders } from '@consta/uikit/IconFolders'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'
import { Informer } from '@consta/uikit/Informer'

import { useAppContext } from '../../context'

import {
  humanFileSize,
  decryptAndDownload,
  getSharingLink,
} from '../../utils/files'
import { patchFile } from '../../api/files'

const FilesList = (props) => {
  const { rows, loadFiles } = props

  const { performWithAuthSig, tokenList } = useAppContext()

  const [selectedItem, setSelectedItem] = useState(null)
  const [downloadingIds, setDownloadingIds] = useState([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [error, setError] = useState(false)

  // called when an additional access control requirement is added to an existing
  // file
  const onAccessControlConditionsSelected = async (accessControlConditions) => {
    console.log(
      'in FilesList and onAccessControlConditionsSelected callback called to add an additional condition with conditions',
      accessControlConditions,
    )

    console.log('selectedItem is ', selectedItem)
    const toDecrypt = selectedItem.encryptedSymmetricKey
    const chain = accessControlConditions[0].chain

    await performWithAuthSig(
      async (authSig) => {
        const symmetricKey = await window.litNodeClient.getEncryptionKey({
          accessControlConditions: selectedItem.accessControlConditions,
          toDecrypt,
          chain: selectedItem.accessControlConditions[0].chain,
          authSig,
        })

        // re-encrypt symmetric key
        // the BLS encryption is non-deterministic so this will "just work"
        // even though we are storing the same symmetric key
        const encryptedSymmetricKey =
          await window.litNodeClient.saveEncryptionKey({
            accessControlConditions,
            chain,
            authSig,
            symmetricKey,
          })

        // store re-encrypted key
        let additionalAccessControlConditions =
          selectedItem.additionalAccessControlConditions
        if (!additionalAccessControlConditions) {
          additionalAccessControlConditions = []
        }
        additionalAccessControlConditions.push({
          accessControlConditions,
          encryptedSymmetricKey: uint8arrayToString(
            encryptedSymmetricKey,
            'base16',
          ),
        })

        await patchFile(selectedItem.id, {
          additionalAccessControlConditions,
          authSig,
        })
        console.log('file patched, reloading')
        const files = await loadFiles()
        // set selectedItem to newly loaded item
        const newFile = files.find((r) => r.id === selectedItem.id)
        console.log('new file is', newFile)
        setSelectedItem(newFile)
      },
      {
        chain,
      },
    )
  }

  const showFileLink = (file) => {
    setSelectedItem(file)
    setShowShareModal(true)
  }

  const downloadFile = async (file) => {
    setError(false)
    setDownloadingIds((prev) => [...prev, file.id])
    const { error } = await decryptAndDownload({ file, tokenList })
    setDownloadingIds((prev) => prev.filter((f) => f !== file.id))
    if (error) {
      setError(error)
    }
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
        return (
          <>
            {row.ipfsHash ? ( // folders don't have an ipfs hash
              <IconDocFilled />
            ) : (
              <IconFolders />
            )}

            <span style={{ width: 8, display: 'inline-block' }} />

            {row.ipfsHash ? ( // folders don't have an ipfs hash
              row.name //<Link to={`/files/view/${row.id}`}>{row.name}</Link>
            ) : (
              <Link to={`/files/folders/${row.id}`}>{row.name}</Link>
            )}
          </>
        )
      },
    },
    {
      title: 'Size',
      accessor: 'size',
      sortable: true,
      renderCell: (row) => {
        return row.ipfsHash ? humanFileSize(row.size) : ''
      },
    },
    {
      title: 'Uploaded',
      accessor: 'uploadedAt',
      sortable: true,
      renderCell: (row) => {
        return row.ipfsHash
          ? new Date(parseInt(row.uploadedAt) * 1000).toLocaleString()
          : ''
      },
    },
    {
      title: 'Actions',
      renderCell: (row) => {
        return (
          <>
            {downloadingIds.includes(row.id) ? (
              <ProgressSpin />
            ) : (
              <Button
                label="Download"
                onClick={() => downloadFile(row)}
                iconLeft={IconDownload}
                onlyIcon
                size="s"
                view="clear"
              />
            )}

            <Button
              label="Share"
              onClick={() => showFileLink(row)}
              iconLeft={IconConnection}
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
    <>
      {error ? (
        <>
          <Informer
            status="alert"
            view="filled"
            title={error.title}
            label={error.details}
          />
          <div style={{ height: 24 }} />
        </>
      ) : null}
      <Table
        columns={fileTableColumns}
        rows={rows}
        emptyRowsPlaceholder="No files yet.  Upload some and they will show up here."
      />

      {showShareModal ? (
        <ShareModal
          onClose={() => closeShareModal()}
          sharingItems={[selectedItem]}
          onAccessControlConditionsSelected={onAccessControlConditionsSelected}
          getSharingLink={getSharingLink}
          onlyAllowCopySharingLink={!selectedItem.ipfsHash} // true if folder
          copyLinkText={
            !selectedItem.ipfsHash
              ? 'Anyone with the link can see the files, but only authorized wallets can open them'
              : null
          }
        />
      ) : null}
    </>
  )
}

export default FilesList
