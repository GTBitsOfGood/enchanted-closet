import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter, Redirect, Switch } from 'react-router-dom';

import { performLogout } from '../actions/index.js';

const Logout = ( props ) => {
  const { loggedIn, performLogout } = props;
  if (loggedIn) {
    performLogout();
  }
  return <Redirect to="/" />
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    performLogout: performLogout
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
