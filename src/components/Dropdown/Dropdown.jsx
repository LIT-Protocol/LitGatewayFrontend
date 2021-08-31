import React, { useState } from 'react'
import cx from 'classnames'

import styles from './dropdown.module.scss'

const Dropdown = (props) => {
  const { className, items, children } = props

  const [toggled, setToggled] = useState(false)

  const handleClick = (e) => {
    setToggled(!toggled)
  }

  const handleItemClick = (e, action) => {
    e.stopPropagation()
    action(e)
  }

  return (
    <div className={cx(styles.wrapper, className)} onClick={handleClick}>
      {children}

      {items && items.length && toggled && (
        <ul>
          {items.map((i) => (
            <li onClick={(e) => handleItemClick(e, i.action)}>{i.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
