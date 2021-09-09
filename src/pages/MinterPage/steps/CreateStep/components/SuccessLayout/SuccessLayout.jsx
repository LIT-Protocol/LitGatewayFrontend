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
      <Grid cols="1" gap="xl">
        <GridItem>
          <div className={styles.card}>
            <Badge
              className={styles.badge}
              size="l"
              status="normal"
              label="Public preview"
            />
            <div
              className={styles.img}
              style={{
                backgroundImage: `url(${getImg(item.img)})`,
              }}
            ></div>
            <div className={styles.mainContent}>
              <div className={styles.top}>
                <h4>{item.title}</h4>
                <div>
                  <IconLock view="brand" className={styles.icon} />
                  {item.files.length}
                </div>
              </div>
              {item.desc ? (
                <Text
                  className={styles.text}
                  as="p"
                  size="m"
                  lineHeight="m"
                  view="primary"
                >
                  {item.desc}
                </Text>
              ) : null}
              <div className={styles.bottomCard}>
                <Badge
                  size="l"
                  status="success"
                  label={item.blockChain.value}
                />
                <div className={styles.count}>10/10</div>
              </div>
            </div>
          </div>
        </GridItem>
      </Grid>
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
