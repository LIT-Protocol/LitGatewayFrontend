import cx from 'classnames'

import styles from './card.module.scss'

import { Tag } from '@consta/uikit/Tag'

const Card = ({
  img,
  titleIcon,
  title,
  desc,
  btns,
  btnsWithoutMargin,
  tags,
  className,
}) => {
  return (
    <div className={cx(styles.card, className)}>
      <div className={styles.imgWrap}>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(${img})`,
          }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.titleIcon}>
          <img src={titleIcon} alt="" />
        </div>
        <h3>{title}</h3>
        <div className={styles.desc}>{desc}</div>
        <div className={styles.tags}>
          {tags?.length &&
            tags.map((tag, i) => (
              <Tag key={i} size="l" className={styles.tag} label={tag} />
            ))}
        </div>
      </div>
      <div
        className={cx(
          styles.btns,
          btnsWithoutMargin && styles.btnsWithoutMargin,
        )}
      >
        {btns}
      </div>
    </div>
  )
}

export default Card
