import EmailSubscribe from './EmailSubscribe'
import styles from './get-updates.module.scss'
import CustomForm from './CustomForm'

const GetUpdates = (props) => {
  const { className } = props

  return (
    <div>
      <div
        id="custom-substack-embed"
        className={styles.customSubstackEmbed}
      ></div>
      {/*<EmailSubscribe*/}
      {/*  render={({ subscribe, status, message }) => {*/}
      {/*    return (*/}
      {/*      <CustomForm*/}
      {/*        className={className}*/}
      {/*        status={status}*/}
      {/*        message={message}*/}
      {/*        onValidated={(formData) => subscribe(formData)}*/}
      {/*      />*/}
      {/*    )*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  )
}

export default GetUpdates
