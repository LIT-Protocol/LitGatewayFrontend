import MailchimpSubscribe from './MailchimpSubscribe'

import CustomForm from './CustomForm'

const GetUpdates = (props) => {
  const { className } = props

  const addUrl =
    'https://litprotocol.us20.list-manage.com/subscribe/post?u=37eeb6bbc8f1fee01838fd9df&id=4f37de62dc'

  return (
    <div>
      <MailchimpSubscribe
        url={addUrl}
        render={({ subscribe, status, message }) => {
          console.log('email submit status', status)
          return (
            <CustomForm
              className={className}
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
