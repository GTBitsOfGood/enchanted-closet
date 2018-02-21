import React from 'react';
import { connect } from 'react-redux';

import { withRouter, Route, Redirect, Switch } from 'react-router-dom';

// SmartRoute: AuthedRoutes
// accepts : ['Admin', 'Volunteer', 'Participant', 'loggedIn', 'loggedOut']
// redirect: redirect url
// component: on success render
const SmartRoute = ( props ) => {
  const { accepts, redirect, user, ...other } = props;
  if (( !accepts || accepts.length === 0 ) ||
      ( !user && accepts.includes('loggedOut') ) ||
      ( user && accepts.includes('loggedIn')) ||
      ( user && accepts.includes(user.role) )) {
    return (
      <Route {...other} />
    );
  }

  if (redirect) return <Redirect to={redirect} />;
  else return <Redirect to="/error" />;
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps)(SmartRoute));
