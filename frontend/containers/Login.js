import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Radium from 'radium';

import { Container, Card, Divider, Grid, Icon, Reveal, Segment, Message, Image, Button } from 'semantic-ui-react'
import { LoginForm } from '../components/';

const Login = () => (
  <Grid verticalAlign="middle" columns='three' centered>
    <Grid.Row>
      <Grid.Column width={4} only="computer">
	<Image src={images.imgL} size='medium' centered />
      </Grid.Column>
      <Grid.Column computer={8} mobile={16}>
	<Container fluid text>
	  <Card fluid color='purple' >
	    <Card.Content header='Login' />
	    <Card.Content>
	      <LoginForm />
	    </Card.Content>
	  </Card>
	  <Divider horizontal> New User? </Divider>
	  <Container textAlign="center">		
	    <Button
	      color="violet"
	      as={Link}
	      to='/register'
	      icon labelPosition="right"
	    >
	      Register a New Account
	      <Icon name="right arrow" />
	    </Button>
	  </Container>
	</Container>
      </Grid.Column>
      <Grid.Column width={4} only="computer">
	<Image src={images.imgR} size='medium' centered />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

const styles = {
};

const images = {
  imgL: '/images/EC_dress2-01.png',
  imgR: '/images/EC_dress4-01.png'
}

export default withRouter(Login);
