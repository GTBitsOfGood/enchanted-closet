import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Message, Transition } from 'semantic-ui-react';

/* Adds a status message to forms */
// Status gives feedback on currently active entry (last updated)
const formWrapper = WrappedForm => class extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      status: 'hidden', // enum: 'error, valid, complete, hidden'
      statusMessage: ''
    }
  }

  setStatusFactory = targetStatus => () => {
    this.setState({ status: targetStatus })
  }

  setStatusMessage = newMessage => {
    this.setState({ statusMessage: newMessage })
  }
  
  render() {
    const { status, statusMessage } = this.state
    const setError = msg => {
      this.setStatusFactory('error')()
      this.setStatusMessage(msg ? msg: "Can you double check this?")
    }
    const setValid = msg => {
      this.setStatusFactory('valid')()
      this.setStatusMessage(msg ? msg: "This looks good.")
    }
    const setComplete = msg => {
      this.setStatusFactory('complete')()
      this.setStatusMessage(msg ? msg: "All done!")
    }
    const setHidden = () => {
      this.setStatusFactory('hidden')()
      this.setStatusMessage("")
    }
    const setMessage = this.setStatusMessage
    const [ msgColor, headerText ] = (() => {
      switch(this.state.status) {
	case 'error':
	  return ['red', 'Error']
	  break;
	case 'complete':
	  return ['green', 'Ready']
	  break;
	case 'hidden':
	  return []
	  break;
	case 'valid':
	default:
	  return ['blue', 'In Progress']
	  break;
      }
    })()
    const messageBlock = this.state.status === 'hidden' ? null : (
      <Message
	style={styles.messageBlock}
	color={msgColor}
      >
	<Message.Header>
	  {headerText}
	</Message.Header>
	<p>
	  {statusMessage}
	</p>
      </Message>
    )
    const controlProps = {
      setError, setValid, setComplete, setMessage
    }
    return (
      <div>
	<Transition.Group animation="slide down" duration={400}>
          {this.state.status !== 'hidden' && messageBlock}
        </Transition.Group>
	{ <WrappedForm {...{...controlProps, ...this.props}} /> }
      </div>
    )
  }
}

const styles={
  messageBlock: {
    marginBottom: "1em"
  }
};

export default formWrapper;
