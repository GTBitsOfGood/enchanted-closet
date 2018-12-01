import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startCase, capitalize } from 'lodash'
import { Button, Divider, Form } from 'semantic-ui-react'
import { fetchUsers, upsertUser } from '../../actions'
import { formWrapper } from './'

// ProfileForm that takes soft field props (targets)
class ProfileForm extends Component {
  constructor (props) {
    super(props)
    const { user, targets } = props
    this.targets = targets
    let initStatus = {}
    let initData = {}

    Object.keys(this.targets).forEach(tar => {
      initData[tar] = user[tar] ? user[tar] : ''
      initStatus[tar] = this.regFinalTest(tar, user[tar] ? user[tar] : '') ? 0 : -1
    })

    this.state = {
      status: initStatus,
      userData: initData,
      cachedData: initData
      // dropdown: "6"
    }

    this.handleChangeFunctionFactory = this.handleChangeFunctionFactory.bind(this)
  }

  regLegalTest = (field, val) => {
    if (this.targets[field]) {
      return this.targets[field]['isLegal'](val)
    } else { return true }
  }

  regFinalTest = (field, val) => {
    if (!val) {
      if (this.state) {
        if (field === 'currentPassword') {
          if (!this.state.userData.newPassword) {
            return true
          }
        }
        if (field === 'newPassword') {
          if (!this.state.userData.currentPassword) {
            return true
          }
        }
      } else {
        return true
      }
      return false // no falsey!
    }
    if (this.targets[field]) {
      if ('isFinal' in this.targets[field]) { return this.targets[field]['isFinal'](val) }
      return this.targets[field]['isLegal'](val) && val.length !== 0 // Fallback
    }
    return true // Field not found in targets, no restrictions
  }

  // Filter is what filter to apply to value into state
  changeFunctionFactory = (field, warningMessage, filter) => {
    return e => {
      if (this.regLegalTest(field, e.target.value) || field === 'grade' || field === 'tshirt') {
        this.props.setValid()
        this.setState({ userData: { ...this.state.userData, [field]: (filter ? filter(e.target.value) : e.target.value) } })
        this.updateStatus(field, 0)
      } else {
        this.props.setError(warningMessage)
      }
    }
  }
  handleChangeFunctionFactory = key => (event, data) => {
    this.setState({ userData: { ...this.state.userData, [key]: data.value } })
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
    if (this.state.userData.currentPassword && !this.state.userData.newPassword) {
      this.props.setError()
      this.updateStatus('newPassword', 1, false)
    }
    if (this.state.userData.newPassword && !this.state.userData.currentPassword) {
      this.props.setError()
      this.updateStatus('currentPassword', 1, false)
    }
  }

  blurFunctions = { // Implement finer control here
  }

  blurFunctionFactory = field => (e) => {
    if (this.regFinalTest(field, e.target.value) || field === 'grade' || field === 'tshirt') {
      this.props.setValid()
      this.updateStatus(field, 0, true)
      if (field === 'currentPassword' && !this.state.userData.newPassword && !this.state.userData.currentPassword) {
        this.updateStatus('newPassword', 0, true)
      } else if (field === 'newPassword' && !this.state.userData.currentPassword && !this.state.userData.newPassword) {
        this.updateStatus('currentPassword', 0, true)
      }
    } else {
      this.props.setError()
      this.updateStatus(field, 1, true)
    }
  }

  verifyAll = () => {
    const { status } = this.state
    return Object.keys(status).every(k => status[k] === 0)
  }

  errorFactory = field => this.state.status[field] === 1

  onSubmit = () => {
    const { userData } = this.state
    if (this.verifyAll()) {
      // diff the objects
      const changedKeys = Object.keys(this.state.userData).filter(key => this.state.cachedData[key] !== this.state.userData[key])
      let diffDict = {}
      changedKeys.forEach(key => {
        diffDict[key] = this.state.userData[key]
      })
      if (Object.keys(diffDict).length === 0) { this.props.setError('No fields have changed!') } else {
        this.props.upsertUser({ ...diffDict, _id: this.props.user._id, email: this.props.user.email })
        // optimistic update
        this.setState({ userData: { ...this.state.userData, currentPassword: '', newPassword: '' } })
        this.setState({ cachedData: this.state.userData })
      }
    } else {
      this.props.setError('The form is completed incorrectly.')
    }
  }

  render () {
    const { userData } = this.state
    const { setError, setValid, setComplete, setMessage } = this.props

    return (
      <div>
        <Form>
          {
            Object.keys(this.targets).map(key => {
              const tar = this.targets[key]
              if (key === 'grade' || key === 'tshirt') {
                return (
                  <Form.Select
                    key={`profile${key}`}
                    label={tar.label ? tar.label : startCase(key)}
                    options={this.targets[key]['options']}
                    value={userData[key]}
                    onChange={this.handleChangeFunctionFactory(key)}
                    onBlur={this.blurFunctionFactory(key)}
                  />

                )
              } else {
                return (
                  <Form.Input
                    key={`profile${key}`}
                    // inline transparent
                    label={tar.label ? tar.label : startCase(key)}
                    error={this.errorFactory(key)}
                    name={key}
                    type={tar.type ? tar.type : 'text'}
                    value={userData[key]}
                    onChange={this.changeFunctionFactory(key, tar.constraintMsg ? tar.constraintMsg : 'Invalid character')}
                    onBlur={this.blurFunctionFactory(key)}
                  />
                )
              }
            })
          }
          <Form.Button
            color="violet"
            onClick={this.onSubmit}
            content='Save Profile'
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
    modalLoaderActive: state.modalLoaderActive,
    user: state.user,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    upsertUser: upsertUser
  }, dispatch)
}

export default formWrapper(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm))
