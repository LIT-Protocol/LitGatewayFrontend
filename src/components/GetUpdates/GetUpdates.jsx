import EmailSubscribe from './EmailSubscribe'

import CustomForm from './CustomForm'

const GetUpdates = (props) => {
  const { className } = props

  // const addUrl = 'https://api.sendinblue.com/v3/'
  // 'https://litprotocol.us20.list-manage.com/subscribe/post?u=37eeb6bbc8f1fee01838fd9df&id=4f37de62dc'
  // 'https://7042085f.sibforms.com/serve/MUIEAMDL33yi1q0r0az7XhaMhoAzb8I2xx42utbpUFkKwnt2U_DlYCV15pMoqE_G2uJY9-fWgVi0RlH5h5EfeY1LU5dfToUMnEUke6Q0It2NBHTrjRlJwGITWSBQHER-3WImGT5eEfvijWbMeMQOWRNKBTr8izMDpC7jsLs-UYjErR7T2HQJqr_AVijSwhQR69b5gdOgv70FJ3ZZ'

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
