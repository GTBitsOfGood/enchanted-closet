import React from 'react';
import { connect } from 'react-redux';

import { withRouter, Redirect, Switch } from 'react-router-dom';

import { performLogout } from '../actions/index.js';

const Logout = ( props ) => {
  if (loggedIn) {
    performLogout(state.user._id);
  }
  return <Redirect to="/homepage" />
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user
  };
}

export default withRouter(connect(mapStateToProps)(Logout));
