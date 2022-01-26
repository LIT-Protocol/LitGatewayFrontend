import EmailSubscribe from './EmailSubscribe'

import CustomForm from './CustomForm'

const GetUpdates = (props) => {
  const { className } = props

  return (
    <div>
      <EmailSubscribe
        render={({ subscribe, status, message }) => {
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
