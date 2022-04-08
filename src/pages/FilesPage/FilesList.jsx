import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import uint8arrayToString from 'uint8arrays/to-string'
// import { ShareModal } from 'lit-access-control-conditions-modal'

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
import WhatToDo from '../../components/WhatToDo/WhatToDo'

const FilesList = (props) => {
  const { rows, loadFiles, goToCreateConditions } = props
  console.log('rows', rows)

  const { performWithAuthSig, tokenList, authSig } = useAppContext()

  const [selectedItem, setSelectedItem] = useState(null)
  const [downloadingIds, setDownloadingIds] = useState([])
  //todo remove access created modal
  const [showAccessCreatedModal, setShowAccessCreatedModal] = useState(false)
  const [whatToDoModalOpen, setWhatToDoModalOpen] = useState(false)
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
    // setShowAccessCreatedModal(true);
    setWhatToDoModalOpen(true)
  }

  const downloadFile = async (file) => {
    setError(false)
    setDownloadingIds((prev) => [...prev, file.id])
    const { error } = await decryptAndDownload({
      file,
      tokenList,
      performWithAuthSig,
    })
    setDownloadingIds((prev) => prev.filter((f) => f !== file.id))
    if (error) {
      setError(error)
    }
  }

  const closeWhatToDoModal = () => {
    // setShowAccessCreatedModal(false)
    setWhatToDoModalOpen(false)
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
        console.log('row', row)

        return (
          <>
            {/* only show download button if this is a file and not a folder */}
            {row.ipfsHash ? (
              downloadingIds.includes(row.id) ? (
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
              )
            ) : null}

            {/* only show share button if user is the original creator */}
            {/* or, show it if the thing is a folder */}
            {(authSig && authSig.address === row.creatorId) || !row.ipfsHash ? (
              <Button
                label="Share"
                onClick={() => showFileLink(row)}
                iconLeft={IconConnection}
                onlyIcon
                size="s"
                view="clear"
              />
            ) : null}
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

      {/*{showAccessCreatedModal && (*/}
      {/*  <AccessCreated*/}
      {/*    onClose={() => closeWhatToDoModal()}*/}
      {/*    sharingItems={[selectedItem]}*/}
      {/*    getSharingLink={getSharingLink}*/}
      {/*    onlyAllowCopySharingLink={!selectedItem.ipfsHash}*/}
      {/*    copyLinkText={*/}
      {/*      !selectedItem.ipfsHash*/}
      {/*        ? 'Anyone with the link can see the files, but only authorized wallets can open them'*/}
      {/*        : null*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}

      {whatToDoModalOpen && (
        <WhatToDo
          onClose={() => closeWhatToDoModal()}
          sharingItems={[selectedItem]}
          getSharingLink={getSharingLink}
          onlyAllowCopySharingLink={!selectedItem.ipfsHash}
          goToCreateConditions={goToCreateConditions}
        />
      )}
      {/*{showShareModal ? (*/}
      {/*  <ShareModal*/}
      {/*    onClose={() => closeShareModal()}*/}
      {/*    sharingItems={[selectedItem]}*/}
      {/*    onAccessControlConditionsSelected={onAccessControlConditionsSelected}*/}
      {/*    getSharingLink={getSharingLink}*/}
      {/*    onlyAllowCopySharingLink={!selectedItem.ipfsHash} // true if folder*/}
      {/*    copyLinkText={*/}
      {/*      !selectedItem.ipfsHash*/}
      {/*        ? 'Anyone with the link can see the files, but only authorized wallets can open them'*/}
      {/*        : null*/}
      {/*    }*/}
      {/*    myWalletAddress={authSig && authSig.address}*/}
      {/*  />*/}
      {/*) : null}*/}
    </>
  )
}

export default FilesList
