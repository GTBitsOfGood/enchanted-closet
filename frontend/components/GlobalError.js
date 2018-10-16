import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Message,Transition } from 'semantic-ui-react' // No transitions, this is presentational

import { clearErrors } from '../actions/'

// GlobalError - do not conflate errorMessage and error
const GlobalError = ({ clearErrors, errorMessage }) => {
  // Can't work icon into this : Open issue https://github.com/Semantic-Org/Semantic-UI/issues/4759
  const messageBlock = errorMessage ? (
    <Transition animation={'fade'} duration={500}>
    <Message
      style={styles.message}
      compact error
      onDismiss={clearErrors}
    >
      <Message.Content>
        <Message.Header>Oops!</Message.Header>
        {errorMessage}
      </Message.Content>
    </Message>
    </Transition>
  ) : <div />
  return (
    <div style={styles.globalError}>
      {messageBlock}
    </div>
  )
}

const styles = {
  message: {
    minWidth: '180px'
  },
  globalError: {
    position: 'fixed',
    top: '2em',
    right: '1em',
    zIndex: '100'
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.errorMessage
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearErrors }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GlobalError)
