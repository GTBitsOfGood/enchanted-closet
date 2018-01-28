import React from 'react';
import {connect} from 'react-redux';

import {withRouter, Redirect} from 'react-router-dom';

const Auth = ( props ) => {
  const {loggedIn} = props;

  if (loggedIn) 
    return (
      <div>
	{props.children}
      </div>
    )
  else return <Redirect to="/login" />
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user
  };
}

export default withRouter(connect(mapStateToProps)(Auth));
