import React from 'react';
import { connect } from 'react-redux';

import { withRouter, Route, Redirect, Switch } from 'react-router-dom';

const SmartRoute = ( props ) => {
  // accepts is an array of strings for accepted user status.
  // loggedOut - must not be logged in
  // loggedIn - must be logged in
  // Admin, Volunteer, Participant - must be that user type
  const { accepts, loggedIn, component: Component, ...other } = props;
  const canView = loggedIn; // modify this condition
  if ( canView ) 
    return (
      <Route
        { ...other }
	render={ <Component /> }
      />);
  
    return <Redirect to="/error" /> // ideally make this redirect smarter, depending on accepts
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user
  };
}

export default withRouter(connect(mapStateToProps)(SmartRoute));
