import React from 'react'
import PropTypes from 'prop-types'
import { postUser } from '../../api/users'

class EmailSubscribe extends React.Component {
  state = {
    status: null,
    message: null,
  }
  subscribe = (data) => {
    this.setState({
      status: 'sending',
      message: null,
    })
    postUser({
      email: data.email,
    })
      .then((data) => {
        this.setState({
          status: data.status,
          message: data.message,
        })
      })
      .catch((err) => {
        this.setState({
          status: 'error',
          message: err,
        })
      })
  }

  render() {
    return this.props.render({
      subscribe: this.subscribe,
      status: this.state.status,
      message: this.state.message,
    })
  }
}

EmailSubscribe.propTypes = {
  render: PropTypes.func,
}

export default EmailSubscribe
