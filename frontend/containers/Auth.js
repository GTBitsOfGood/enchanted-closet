import React from 'react'
import { connect } from 'react-redux'

import { withRouter, Redirect, Switch } from 'react-router-dom'

const Auth = (props) => {
  const { loggedIn } = props

  if (loggedIn) {
    return (
      <Switch>
        {props.children}
      </Switch>
    )
  } else return <Redirect to="/login" />
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user
  }
}

export default withRouter(connect(mapStateToProps)(Auth))
