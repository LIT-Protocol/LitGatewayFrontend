import React, { useState, useEffect } from 'react'

import styles from './media-grid-layout.module.scss'

export default function MediaGrid({ files }) {
  const maxHeight = 400

  const playerTagForFile = (file) => {
    console.log('rendering player tag for file', file)
    if (!file.type) {
      return null
    }
    const fileUrl = file.dataUrl
    if (file.type.includes('image')) {
      return (
        <img
          className={styles.imageAndVideo}
          src={fileUrl}
          style={{ maxHeight: maxHeight || '100%' }}
        />
      )
    } else if (file.type.includes('audio')) {
      return (
        <div
          className={styles.audioHolder}
          style={{ maxHeight: maxHeight || '100%' }}
        >
          <audio className={styles.audio} controls>
            <source src={fileUrl} type={file.type} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )
    } else if (file.type.includes('video')) {
      return (
        <video
          className={styles.imageAndVideo}
          style={{ maxHeight: maxHeight || '100%' }}
          autoPlay
          muted
          loop
          controls
        >
          <source src={fileUrl} type={file.type} />
          Your browser does not support the video tag.
        </video>
      )
    } else if (file.type.includes('pdf')) {
      return (
        <embed
          src={fileUrl}
          type="application/pdf"
          frameBorder="0"
          scrolling="auto"
          className={styles.pdfHolder}
          height="100%"
          width="100%"
        ></embed>
      )
    }
  }

  const jsx = []
  for (let i = 0; i < files.length; i++) {
    jsx.push(
      <div
        className={styles.gridItem}
        key={i}
        style={
          files.length === 1 && files[0].type.includes('pdf')
            ? { width: '100%' }
            : {}
        }
      >
        {playerTagForFile(files[i])}
      </div>,
    )
  }

  return (
    <div className={styles.root} style={{ height: '100%' }}>
      <div className={styles.grid} style={{ height: '100%' }}>
        {jsx}
      </div>
    </div>
  )
}
