import React from 'react'
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

import styles from "../../../create-content-page.module.scss";

import {Grid, GridItem} from "@consta/uikit/Grid";
import {Badge} from "@consta/uikit/Badge";
import {Text} from "@consta/uikit/Text";
import {Button} from "@consta/uikit/Button";
import {IconLock} from "@consta/uikit/IconLock";
import {File} from "@consta/uikit/File";
import {Table} from "@consta/uikit/Table";

import {getExtension, getImg} from "../../../../../../utils";
import {Attach} from "@consta/uikit/Attach";
import {humanFileSize} from "../../../../../../utils/files";

const SuccessLayout = ({
                         publicCover,
                         title,
                         description,
                         content,
                         blockChain,
                         setStep
                       }) => {
  const ImgPreview = ({file}) => {
    const imgFormat = ['jpg', 'jpeg', 'png']
    const ext = getExtension(file.name)

    if (imgFormat.includes(ext)) {
      return (
        <div className={styles.preview}>
          <img className={styles.ImgPreview} src={URL.createObjectURL(file)}/>
          <h5>{file.name}</h5>
        </div>
      )
    } else {
      return (
        <div className={styles.preview}>
          <File className={styles.FilePreview} extension={ext}/>
          <h5>{file.name}</h5>
        </div>
      )
    }
  }

  const tableColumns = [
    {
      title: 'Name',
      accessor: 'title',
      align: 'left',
      sortable: true,
    },
    {
      title: 'Extension',
      accessor: 'ext',
    }
  ];

  const item = {
    id: 1,
    title: 'Crypto Dog',
    desc: 'Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before. ',
    date: '2020-07-14T14:23:11',
    minted: 10,
    blockChain: "Etherium",
    files: [{
      title: 'WhateverItsCAlled',
      ext: 'png'
    },
      {
        title: 'Nextfile',
        ext: 'jpeg'
      }],
    img: 'https://images.unsplash.com/photo-1583512603784-a8e3ea8355b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80'
  }

  return (
    <div className={styles.successStep}>
      <h2 className={styles.title}>Success!</h2>
      <Grid cols="1" gap="xl">
        <GridItem>
          <div className={styles.card}>
            <Badge className={styles.badge} size="l" status="normal" label="Public preview"/>
            <div className={styles.img} style={{
              backgroundImage: `url(${getImg(item.img)})`,
            }}>
            </div>
            <div className={styles.mainContent}>
              <div className={styles.top}>
                <h4>{item.title}</h4>
                <div><IconLock view="brand" className={styles.icon}/>{item.files.length}</div>
              </div>
              {description ? (
                <Text className={styles.text} as="p" size="m" lineHeight="m" view="primary">{item.desc}</Text>
              ) : null}
              <div className={styles.bottomCard}>
                <Badge size="l" status="success" label={item.blockChain}/>
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
            emptyRowsPlaceholder='No files yet.  Pick some and they will show up here.'
            borderBetweenRows
            zebraStriped="odd"
          />
        </div>
      ) : null}
      <div className={styles.bottom}>
        <Button className={styles.btn} view="secondary" label="View Lit Gallery!" size="l"/>
        <Button className={styles.btn} label="Mint Another Lit!" size="l" onClick={() => setStep('selectToDo')}/>
      </div>
    </div>
  )
}

export default SuccessLayout