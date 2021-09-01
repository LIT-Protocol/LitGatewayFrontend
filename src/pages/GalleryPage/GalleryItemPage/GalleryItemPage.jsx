import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'

import styles from './gallery-item-page.module.scss'

import { Grid, GridItem } from '@consta/uikit/Grid'
import { Select } from '@consta/uikit/Select'
import { Table } from '@consta/uikit/Table'
import { Attach } from '@consta/uikit/Attach'

import { getImg } from '../../../utils'

let relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const sortSettings = [
  {
    label: 'By name (high to low)',
    value: 'title_desc',
    id: 'title_desc',
  },
  {
    label: 'By name (low to high)',
    value: 'title_asc',
    id: 'title_asc',
  },
  {
    label: 'By extension (high to low)',
    value: 'ext_desc',
    id: 'ext_desc',
  },
  {
    label: 'By extension (low to high)',
    value: 'ext_asc',
    id: 'ext_asc',
  },
]

const GalleryItemPage = () => {
  let { litId } = useParams()

  const [sort, setSort] = useState(null)

  const item = {
    id: 1,
    title: 'Crypto Dog',
    desc: 'Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before. ',
    date: '2020-07-14T14:23:11',
    minted: 10,
    files: [
      {
        title: 'WhateverItsCAlled',
        ext: 'png',
      },
      {
        title: 'Nextfile',
        ext: 'jpeg',
      },
    ],
    img: 'https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
  }

  const compareItems = (a, b) => {
    if (sort) {
      const [type, key] = sort.value.split('_')
      if (key === 'asc') {
        return a[type] > b[type] ? 1 : a[type] < b[type] ? -1 : 0
      } else {
        return b[type] > a[type] ? 1 : b[type] < a[type] ? -1 : 0
      }
    } else {
      return 0
    }
  }

  const fileTableColumns = [
    {
      title: 'Name',
      accessor: 'name',
      align: 'left',
      renderCell: (row) => {
        return <Attach fileName={row.title} fileExtension={row.ext} />
      },
    },
    {
      title: 'Extension',
      renderCell: (row) => {
        return <p>{row.ext}</p>
      },
    },
  ]

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <Grid
          cols="1"
          gap="xl"
          breakpoints={{
            s: {
              cols: 2,
            },
          }}
        >
          <GridItem>
            <div className={styles.left}>
              <div
                className={styles.img}
                style={{
                  backgroundImage: `url(${getImg(item.img)})`,
                }}
              />
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <div className={styles.bottom}>
                <span>{item.minted} Minted Total</span>
                <span>{dayjs(item.date).fromNow()}</span>
              </div>
            </div>
          </GridItem>
          <GridItem>
            <div className={styles.right}>
              <Select
                placeholder="Sort by"
                size="m"
                items={sortSettings}
                value={sort}
                onChange={({ value }) => setSort(value)}
                className={styles.select}
              />
              <h5>{item.files?.length} Locked Files</h5>
              <Table
                columns={fileTableColumns}
                rows={item.files.sort(compareItems)}
                emptyRowsPlaceholder="No files."
                borderBetweenRows
                className={styles.table}
                zebraStriped="odd"
              />
            </div>
          </GridItem>
        </Grid>
      </div>
    </div>
  )
}

export default GalleryItemPage
