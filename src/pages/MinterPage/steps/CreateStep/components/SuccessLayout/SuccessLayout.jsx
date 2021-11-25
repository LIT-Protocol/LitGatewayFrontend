import React, { useState } from 'react'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'

import styles from './success-layout.module.scss'

import { Button } from '@consta/uikit/Button'
import { IconOpenInNew } from '@consta/uikit/IconOpenInNew'

import { ShareLinkModal } from 'components'

import { getExtension, getImg, openseaUrl } from '../../../../../../utils'
import HtmlNft from '../HtmlNft'

const SuccessLayout = ({
  isMinter,
  setCreateStep,
  title,
  description,
  publicCover,
  content,
  blockChain,
  quantity,
  fileUrl,
  tokenId,
  tokenAddress,
}) => {
  const [showModal, setShowModal] = useState(true)
  // const tableColumns = [
  //   {
  //     title: 'Name',
  //     accessor: 'name',
  //     align: 'left',
  //     sortable: true,
  //     renderCell: (row) => {
  //       return <Attach fileName={row.name} fileExtension={row.ext} />
  //     },
  //   },
  //   {
  //     title: 'Extension',
  //     accessor: 'ext',
  //   },
  // ]

  // const item = {
  //   id: 1,
  //   title,
  //   desc: description,
  //   minted: quantity,
  //   blockChain,
  //   files: content.map((c) => ({ name: c.name, ext: getExtension(c.name) })),
  //   img: publicCover?.length ? publicCover[0].dataUrl : getImg(),
  // }

  // const [showingSnackbar, setShowingSnackbar] = useState(false)

  // const copyToClipboard = async (toCopy) => {
  //   await navigator.clipboard.writeText(toCopy)
  //   setShowingSnackbar(true)
  //   setTimeout(() => setShowingSnackbar(false), 5000)
  // }

  // const urlOnOpensea = openseaUrl({
  //   chain: blockChain.value,
  //   tokenAddress,
  //   tokenId,
  // })

  return (
    <>
      {showModal ? (
        <ShareLinkModal
          subtitle="You unlockable NFT has been minted!"
          link={fileUrl}
          otherBtns={
            isMinter ? (
              <a
                href={`https://etherscan.io/address/${tokenAddress}`}
                target="_blank"
              >
                <Button
                  view="secondary"
                  size="l"
                  label="View ETH Scan"
                  iconRight={IconOpenInNew}
                />
              </a>
            ) : null
          }
          onClose={() => setShowModal(false)}
        />
      ) : null}

      <div className={styles.successStep}>
        <Button
          className={styles.btn}
          label="Mint another"
          size="l"
          onClick={() => setCreateStep('create')}
        />
      </div>
    </>
  )
}

export default SuccessLayout
