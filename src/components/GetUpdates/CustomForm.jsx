import { useEffect, useState } from 'react'
import { putUser } from '../../api/users'
import cx from 'classnames'
import { InputWrapper } from '../index'
import { Button } from '@consta/uikit/Button'
import { useAppContext } from '../../context'
import styles from './get-updates.module.scss'

const CustomForm = ({ status, message, onValidated, className }) => {
  const { validateEmail } = useAppContext()

  const [emailVal, setEmailVal] = useState('')
  const [messageStatus, setMessageStatus] = useState('error')
  const [inputMessage, setInputMessage] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (status === 'success') {
      setAdded(true)
    }
    if (status === 'success') {
      setInputMessage('success')
      setInputMessage(message)
    } else if (status === 'duplicate_parameter') {
      setInputMessage('success')
      setInputMessage('This email is already subscribed!')
    }
  }, [message, status])

  const submit = async () => {
    if (!validateEmail(emailVal)) {
      setMessageStatus('warning')
      setInputMessage('Please enter a valid email')
      return
    }

    if (!added) {
      setMessageStatus('regular')
      setInputMessage(null)
      await putUser({
        email: emailVal,
        authSig: null,
      })
    }

    onValidated({
      email: emailVal,
    })
  }

  return (
    <div className={cx(styles.form, className)}>
      <InputWrapper
        value={emailVal}
        className={styles.input}
        placeholder="Email address"
        error={inputMessage}
        id="email"
        size="l"
        status={messageStatus}
        handleChange={(value) => setEmailVal(value)}
      />
      <Button
        className={cx(styles.btn, added && styles.added)}
        label={!added ? 'Get Updates' : 'Added!'}
        size="l"
        onClick={submit}
      />
    </div>
  )
}

export default CustomForm
