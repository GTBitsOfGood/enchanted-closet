import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Card } from 'semantic-ui-react';
import { RegisterForm } from '../components/';

const Register = () => (
  <Container>
    <Card fluid color="purple">
      <Card.Content header="Register" />
      <Card.Content>
	<RegisterForm />
      </Card.Content>
    </Card>
  </Container>
);

export default Register;
