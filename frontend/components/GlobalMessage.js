import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Message ,Transition} from 'semantic-ui-react' // No transitions, this is presentational

import { clearAllMessages } from '../actions/'

// GlobalMessage - do not conflate errorMessage and error
const GlobalMessage = ({ clearAllMessages, message }) => {
  // Can't work icon into this : Open issue https://github.com/Semantic-Org/Semantic-UI/issues/4759
  const messageBlock = message ? (
    <Transition.Group animation={'fade'} duration={500}>
    <Message
      style={styles.message}
      compact info
      onDismiss={clearAllMessages}
    >
      <Message.Content>
        <Message.Header>Success</Message.Header>
        {message}
      </Message.Content>
    </Message>
    </Transition.Group>
  ) : <div />
  return (
    <div style={styles.globalMessage}>
      {messageBlock}
    </div>
  )
}

const styles = {
  message: {
    minWidth: '180px'
  },
  globalMessage: {
    position: 'fixed',
    top: '2em',
    right: '1em',
    zIndex: '100'
  }
}

const mapStateToProps = state => {
  return {
    message: state.message
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearAllMessages }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessage)
