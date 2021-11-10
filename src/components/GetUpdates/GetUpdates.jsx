import { useState } from 'react'
import cx from 'classnames'

import { Button } from '@consta/uikit/Button'
import { InputWrapper } from '../../components'

import styles from './get-updates.module.scss'

const GetUpdates = (props) => {
  const { className } = props

  const [emailVal, setEmailVal] = useState('')
  const [added, setAdded] = useState(false)

  const handleSubmit = () => {
    if (!added) {
      setAdded(true)
    }
  }

  return (
    <div className={cx(styles.form, className)}>
      <InputWrapper
        value={emailVal}
        className={styles.input}
        placeholder="Email address"
        id="email"
        size="l"
        handleChange={(value) => setEmailVal(value)}
      />
      <Button
        className={cx(styles.btn, added && styles.added)}
        label={!added ? 'Get Updates' : 'Added!'}
        size="l"
        onClick={handleSubmit}
      />
    </div>
  )
}

export default GetUpdates
