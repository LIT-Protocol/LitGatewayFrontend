import React from 'react'
import { Link } from "react-router-dom";

import styles from './mini-card.module.scss'

import {IconLock} from "@consta/uikit/IconLock";

import {getImg} from '../../utils'

const MiniCard = ({title, date, files, img, link}) => {

    return (
      <Link to={link} className={styles.link}>
        <div className={styles.minicard}>
          <div className={styles.imgWrap}>
            <div
              className={styles.img}
              style={{
                backgroundImage: `url(${getImg(img)})`,
              }}
            />
          </div>
          <div className={styles.cardBody}>
            <h4>{title}</h4>
            <div className={styles.bottom}><span className={styles.date}>{date}</span><span className={styles.count}><IconLock view="brand" size="m" className={styles.cardIcon} />{files}</span></div>
          </div>
        </div>
      </Link>
    )
}

export default MiniCard