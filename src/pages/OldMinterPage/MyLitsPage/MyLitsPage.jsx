import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import styles from './my-lits-page.module.scss'

import { Grid, GridItem } from '@consta/uikit/Grid'
import { Select } from '@consta/uikit/Select'

import { MiniCard } from '../../../components'

const items = [
  {
    id: 1,
    title: 'Cyclops Monkey Head #0174',
    date: '2021-07-14T14:23:11',
    files: '2',
    img: '',
  },
  {
    id: 1,
    title: 'Crypto Dog',
    date: '2021-07-15T14:23:11',
    files: '3',
    img: 'https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
  },
  {
    id: 1,
    title: 'Crypto Dog',
    date: '2021-07-15T14:23:11',
    files: '2',
    img: 'https://images.unsplash.com/photo-1598134493202-9a02529d86bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
  },
  {
    id: 1,
    title: 'Crypto Dog',
    date: '2021-07-15T14:23:11',
    files: '2',
    img: 'https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
  },
  {
    id: 1,
    title: 'Crypto Dog',
    date: '2021-07-15T14:23:11',
    files: '5',
    img: 'https://images.unsplash.com/photo-1598134493202-9a02529d86bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
  },
  {
    id: 1,
    title: 'arypto Dog',
    date: '2021-07-15T14:23:11',
    files: '2',
    img: 'https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
  },
  {
    id: 1,
    title: 'Crypto Dog',
    date: '2021-07-15T14:23:11',
    files: '2',
    img: 'https://images.unsplash.com/photo-1598134493202-9a02529d86bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
  },
]

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
    label: 'By files count (high to low)',
    value: 'files_desc',
    id: 'files_desc',
  },
  {
    label: 'By files count (low to high)',
    value: 'files_asc',
    id: 'files_asc',
  },
  {
    label: 'By date (high to low)',
    value: 'date_desc',
    id: 'date_desc',
  },
  {
    label: 'By date (low to high)',
    value: 'date_asc',
    id: 'date_asc',
  },
]

const MyLitsPage = () => {
  const [sort, setSort] = useState(null)

  const compareItems = (a, b) => {
    if (sort) {
      const [type, key] = sort.value.split('_')
      if (type !== 'date') {
        if (key === 'asc') {
          return a[type] > b[type] ? 1 : a[type] < b[type] ? -1 : 0
        } else {
          return b[type] > a[type] ? 1 : b[type] < a[type] ? -1 : 0
        }
      } else {
        if (key === 'asc') {
          return dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
        } else {
          return dayjs(b.date).isBefore(dayjs(a.date)) ? 1 : -1
        }
      }
    } else {
      return 0
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <div className={styles.list}>
          <h2>My Lits</h2>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.leftTop}>
                <svg
                  width="24"
                  height="33"
                  viewBox="0 0 24 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.7972 31.01C6.78604 32.1709 8.27766 32.8342 11.0951 33C17.0616 33 22.0929 29.3869 24 26.7372C23.6133 26.8478 22.9146 27.0985 22.4322 27.219C22.1749 27.2832 21.6331 27.219 21.4673 27.219C22.7932 26.1135 23.7153 24.7219 23.8569 21.8894C24.0226 18.5729 23.2492 15.3668 22.3652 13.9296C22.1995 14.593 22.0338 16.2513 20.7079 16.2513C19.3818 16.2513 19.3819 14.8085 19.382 12.8149V12.7688C19.382 10.4472 19.382 8.85528 17.8904 6.46734C16.233 3.81407 12.2553 0.939699 10.2665 0C10.4322 0.718593 10.7968 2.32161 11.0951 3.81407C11.4266 5.47236 11.0951 6.799 10.2665 7.46231C9.45789 8.10958 8.11193 7.46231 8.11193 7.46231C8.11193 7.46231 6.95177 9.45226 6.28883 11.9397C5.62588 14.4271 6.28883 17.5447 4.46573 17.9095C2.64263 18.2744 1.97967 15.3668 1.97966 13.9296C1.09574 16.3065 -0.50638 21.6573 0.156564 24.0452C0.819509 26.4332 2.31113 27.804 2.97408 28.191C2.80834 28.191 2.3697 28.269 1.97966 28.191C1.15101 28.0251 0.819509 27.7487 0.488037 27.5276C1.37196 28.4673 2.79707 29.8426 4.7972 31.01Z"
                    fill="#C4C4C4"
                  />
                  <path
                    d="M0.819536 10.6131C0.421769 11.409 0.543309 12.603 0.6538 13.1005C1.09575 12.6583 2.11226 11.5085 2.64263 10.4472C3.17301 9.38593 3.08461 8.34673 2.97411 7.9598C2.42165 8.51256 1.2173 9.81709 0.819536 10.6131Z"
                    fill="#C4C4C4"
                  />
                </svg>
                <span>{items?.length} Lits Created</span>
              </div>
            </div>
            <div className={styles.right}>
              <Select
                placeholder="Sort by"
                size="m"
                items={sortSettings}
                value={sort}
                onChange={({ value }) => setSort(value)}
                className={styles.select}
              />
            </div>
          </div>
          <Grid
            cols="1"
            gap="xl"
            breakpoints={{
              xl: {
                cols: 5,
              },
              l: {
                cols: 4,
              },
              s: {
                cols: 3,
              },
              xs: {
                cols: 2,
              },
            }}
          >
            {items?.length ? (
              <>
                {items.sort(compareItems).map((item) => (
                  <GridItem>
                    <MiniCard
                      link={`/minter/lit/${item.id}`}
                      title={item.title}
                      date={dayjs(item.date).format('MM/DD/YY')}
                      files={item.files}
                      img={item.img}
                    />
                  </GridItem>
                ))}
              </>
            ) : null}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default MyLitsPage
