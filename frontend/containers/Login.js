import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Radium from 'radium';

import { Container, Card, Grid, Reveal, Segment, Message, Image, Button } from 'semantic-ui-react'
import { LoginForm } from '../components/';

// TODO: Style
const Login = () => (
  <Grid style={styles.margin} columns='three' relaxed centered>
    <Grid.Row>
      <Grid.Column width={4}>
	<Image src={images.imgL} size='medium' centered />
      </Grid.Column>
      <Grid.Column width={8}>
	<Container fluid text>
	  <Card fluid color='purple' >
	    <Card.Content header='Login' />
	    <Card.Content>
	      <LoginForm />
	    </Card.Content>
	  </Card>
	  <Card fluid color='purple' >
	    <Card.Content style={{textAlign: 'center'}}>
	      <Container>
		<Button as={Link} to='/register' >
		  Register a New Account
		</Button>
	      </Container>
	    </Card.Content>
	  </Card>
	</Container>
      </Grid.Column>
      <Grid.Column width={4}>
	<Image src={images.imgR} size='medium' centered />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

const styles = {
  margin: {
    margin: '2em',
  }
};

const images = {
  imgL: '/images/EC_dress2-01.png',
  imgR: '/images/EC_dress4-01.png'
}

export default withRouter(Login);
