import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form } from 'semantic-ui-react'
import { formWrapper } from './'
import { performResetPassword } from '../../actions/auth'
class ResetPasswordForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: {
        email: -1
      },
      email: ''
    }
  }

  regLegalTest = (field, val) => {
    switch (field) {
      case 'email':
        return /^[\w@.]*$/.test(val)
    }
  }

  regFinalTest = (field, val) => {
    switch (field) {
      case 'email':
        return /^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
      default:
        return this.regLegalTest(field, val) && val.length !== 0
    }
  }

  // filter is what to filter to apply to value into state
  changeFunctionFactory = (field, warningMessage, filter) => {
    return e => {
      if (this.regLegalTest(field, e.target.value)) {
        this.props.setValid()
        this.setState({
          [field]: filter ? filter(e.target.value) : e.target.value
        })
        this.updateStatus(field, 0)
      } else {
        this.props.setError(warningMessage)
      }
    }
  }

  // verify cb
  updateStatus = (field, val, cb) => {
    this.setState({
      status: { ...this.state.status, [field]: val }
    }, () => { if (cb) this.verifyCb() })
  }

  verifyCb = () => {
    if (this.verifyAll()) {
      this.props.setComplete()
    }
  }

  blurFunctions = {
    'email': e => {
      if (this.regFinalTest('email', e.target.value)) {
        this.props.setValid()
        this.updateStatus('email', 0, true)
      } else {
        this.props.setError()
        this.updateStatus('email', 1, true)
      }
    }
  }

  blurFunctionFactory = field => (e) => {
    this.blurFunctions[field](e)
  }

  verifyAll = () => {
    const { status } = this.state
    return Object.values(status).every(k => k === 0)
  }

  errorFactory = field => this.state.status[field] === 1

  onSubmit = () => {
    const { ...formData } = this.state
    if (this.verifyAll()) {
      this.props.performResetPassword(formData)
    } else {
      this.props.setError('The form is completed incorrectly.')
    }
  }

  render () {
    const { email } = this.state
    return (
      <div>
        <Form>
          <Form.Input
            label="Email"
            required
            error={this.errorFactory('email')}
            name="email"
            type="email"
            value={email}
            onChange={this.changeFunctionFactory('email', 'Email characters only.')}
            placeholder='gburdell@gatech.edu'
            onBlur={this.blurFunctionFactory('email')}
          />
          <Button
            color="violet"
            onClick={this.onSubmit}
            content='Reset Password'
            type='submit'
          />
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    modalLoaderActive: state.modalLoaderActive
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    performResetPassword: performResetPassword
  }, dispatch)
}

export default formWrapper(connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordForm))
