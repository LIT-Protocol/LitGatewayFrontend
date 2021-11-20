import { useState } from 'react'
import cx from 'classnames'

import { Button } from '@consta/uikit/Button'
import { InputWrapper } from '../../components'

import styles from './get-updates.module.scss'
import MailchimpSubscribe from './MailchimpSubscribe'
import { useAppContext } from '../../context'
import { putUser } from '../../api/users'

const GetUpdates = (props) => {
  const { validateEmail } = useAppContext()
  const { className } = props

  const [emailVal, setEmailVal] = useState('')
  const [added, setAdded] = useState(false)
  const [errorStatus, setErrorStatus] = useState(false)
  const [inputMessage, setInputMessage] = useState(false)

  const addUrl =
    'https://litprotocol.us20.list-manage.com/subscribe/post?u=37eeb6bbc8f1fee01838fd9df&id=4f37de62dc'

  const CustomForm = ({ status, message, onValidated }) => {
    const submit = async () => {
      if (!validateEmail(emailVal)) {
        setErrorStatus('error')
        setInputMessage('Email is invalid')
        return
      }

      if (!added) {
        setErrorStatus('regular')
        setInputMessage(null)
        await putUser({
          email: emailVal,
          authSig: null,
        })
        setAdded(true)
      }

      onValidated({
        EMAIL: emailVal,
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
          status={errorStatus}
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

  return (
    <div>
      <MailchimpSubscribe
        url={addUrl}
        render={({ subscribe, status, message }) => {
          return (
            <CustomForm
              status={status}
              message={message}
              onValidated={(formData) => subscribe(formData)}
            />
          )
        }}
      />
    </div>
  )
}

export default GetUpdates
