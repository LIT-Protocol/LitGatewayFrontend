import React from 'react'

import styles from './main-page.module.scss'

import {Grid, GridItem} from "@consta/uikit/Grid";

import {MiniCard} from '../../../components'

const MainPage = () => {

  const items = [
    {
      id: 1,
      title: 'Crypto Dog',
      date: '2/18/2021',
      files: '2',
      img: 'https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80'
    },
    {
      id: 1,
      title: 'Crypto Dog',
      date: '2/18/2021',
      files: '2',
      img: 'https://images.unsplash.com/photo-1598134493202-9a02529d86bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80'
    },
    {
      id: 1,
      title: 'Crypto Dog',
      date: '2/18/2021',
      files: '2',
      img: 'https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80'
    },
    {
      id: 1,
      title: 'Crypto Dog',
      date: '2/18/2021',
      files: '2',
      img: 'https://images.unsplash.com/photo-1598134493202-9a02529d86bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80'
    },
    {
      id: 1,
      title: 'Crypto Dog',
      date: '2/18/2021',
      files: '2',
      img: 'https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80'
    },
  ]


  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <div className={styles.top}>
          <h1>access off chain resources, data, and files based on on-chain conditions</h1>
          <div className={styles.bg}>
            <span></span>
            Mint
          </div>
        </div>
        <div className={styles.list}>
          <h2>Featured Lits</h2>
          <Grid cols="1" gap="xl" breakpoints={{
            xl: {
              cols: 5
            },
            l: {
              cols: 4
            },
            m: {
              cols: 3
            },
            s: {
              cols: 2
            },
            xs: {
              cols: 2
            }
          }}>
            {items?.length? (
              <>
                {
                  items.map(item => (
                    <GridItem>
                      <MiniCard link={`/minter/lit/${item.id}`} title={item.title} date={item.date} files={item.files} img={item.img}/>
                    </GridItem>
                  ))
                }
              </>
            ): null}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default MainPage