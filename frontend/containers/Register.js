import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Card, Grid, Reveal, Dimmer, Loader, Image, Segment, Message } from 'semantic-ui-react';
import { RegisterForm } from '../components/';

class Register extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { errorMessage, 
	    modalLoaderActive
    } = this.props;

    // TODO: Remove
    /*
       const formBlock = (
       <FileForm
       type="register"
       submitRoute='register'
       buttonAction={performRegistration}
       />
       );
     */
    const errorBlock = errorMessage && (
      <Message
        error
        header='Oops an error occurred!'
        content={errorMessage}
      />
    );
    return (
      <Container>
        <Dimmer active={modalLoaderActive}>
          <Loader>Loading</Loader>
        </Dimmer>
        {errorBlock}
        <Card fluid color='purple'>
          <Card.Content header='Register' />
          <Card.Content>
	    <RegisterForm />
          </Card.Content>
        </Card>
      </Container>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    user: state.user,
    modalLoaderActive: state.modalLoaderActive
  };
};

export default connect(
  mapStateToProps
)(Register);
