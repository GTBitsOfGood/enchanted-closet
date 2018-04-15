import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

// GlobalError - do not conflate errorMessage and error
const GlobalError = ({ errorMessage }) => {
  if (errorMessage) return (
    <Message
      error
      header="Oops an error occurred!"
      content={errorMessage}
    />
  );
  return <div />;
}
const mapStateToProps = state => {
  return {
    errorMessage: state.errorMessage
  }
}
export default connect(mapStateToProps)(GlobalError);
