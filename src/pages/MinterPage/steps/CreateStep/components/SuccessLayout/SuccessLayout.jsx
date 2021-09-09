import React from 'react'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'

import styles from './success-layout.module.scss'

import { Grid, GridItem } from '@consta/uikit/Grid'
import { Badge } from '@consta/uikit/Badge'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconLock } from '@consta/uikit/IconLock'
import { File } from '@consta/uikit/File'
import { Table } from '@consta/uikit/Table'
import { Attach } from '@consta/uikit/Attach'

import { getExtension, getImg } from '../../../../../../utils'
import HtmlNft from '../HtmlNft'

const SuccessLayout = ({
  setCreateStep,
  title,
  description,
  publicCover,
  content,
  blockChain,
  quantity,
}) => {
  const tableColumns = [
    {
      title: 'Name',
      accessor: 'name',
      align: 'left',
      sortable: true,
      renderCell: (row) => {
        return <Attach fileName={row.name} fileExtension={row.ext} />
      },
    },
    {
      title: 'Extension',
      accessor: 'ext',
    },
  ]

  const item = {
    id: 1,
    title,
    desc: description,
    minted: quantity,
    blockChain,
    files: content.map((c) => ({ name: c.name, ext: getExtension(c.name) })),
    img: publicCover?.length ? publicCover[0].dataUrl : getImg(),
  }

  return (
    <div className={styles.successStep}>
      <h2 className={styles.title}>Success!</h2>
      <HtmlNft
        publicCover={publicCover}
        title={title}
        description={description}
        content={content}
        quantity={quantity}
        previewMode={true}
      />
      <div className={styles.shareUrls}>
        <div>
          HTML NFT URL
          <Button className={styles.copyButton} view="secondary" label="Copy" />
        </div>
        <div style={{ height: 8 }} />
        <div>
          <a
            target="_blank"
            href="https://ipfs.litgateway.com/ipfs/QmW6uH8p17DcfvZroULkdEDAKThWzEDeNtwi9oezURDeXN"
          >
            https://ipfs.litgateway.com/ipfs/QmW6uH8p17DcfvZroULkdEDAKThWzEDeNtwi9oezURDeXN
          </a>{' '}
        </div>
        <div style={{ height: 32 }} />
        <div>
          OpenSea URL{' '}
          <Button className={styles.copyButton} view="secondary" label="Copy" />
        </div>
        <div style={{ height: 8 }} />
        <div>
          <a
            target="_blank"
            href="https://opensea.io/assets/0xe4cfae3aa41115cb94cff39bb5dbae8bd0ea9d41/403"
          >
            https://opensea.io/assets/0xe4cfae3aa41115cb94cff39bb5dbae8bd0ea9d41/403
          </a>{' '}
        </div>
      </div>
      {item.files.length ? (
        <div className={styles.content}>
          <h4>Locked content</h4>
          <Table
            columns={tableColumns}
            rows={item.files}
            emptyRowsPlaceholder="No files yet.  Pick some and they will show up here."
            borderBetweenRows
            zebraStriped="odd"
          />
        </div>
      ) : null}
      <div className={styles.bottom}>
        {/* <Button
          className={styles.btn}
          view="secondary"
          label="View Lit Gallery!"
          size="l"
        /> */}
        <Button
          className={styles.btn}
          label="Mint another"
          size="l"
          onClick={() => setCreateStep('create')}
        />
      </div>
    </div>
  )
}

export default SuccessLayout
