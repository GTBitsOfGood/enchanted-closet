import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter, Link, Switch } from 'react-router-dom'

import { performLogout } from '../actions/index.js'

class Logout extends Component {
  componentWillMount () {
    this.props.performLogout()
  }

  render () {
    return (
      <div>
  Click <Link to="/">here </Link> if you are not redirected.
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    performLogout: performLogout
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout))
