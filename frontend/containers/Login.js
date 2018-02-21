import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Radium from 'radium';

import { performLogin } from '../actions/index';

import { Container, Card, Grid, Reveal, Dimmer, Loader, Segment, Message, Image, Button } from 'semantic-ui-react'
import { FileForm } from '../components/';


class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalLoaderActive, performLogin, errorMessage } = this.props;
    
    return (
      <Grid style={styles.margin} columns='three' relaxed centered>
	<Grid.Row>
	  <Grid.Column width={4}>
	    <Image src={images.imgL} size='medium' centered />
	  </Grid.Column>
	  <Grid.Column width={8}>
	    <Container fluid text>
	      <Dimmer active={modalLoaderActive}>
		<Loader>Loading</Loader>
	      </Dimmer>
	      {errorMessage &&
	       <Message
		 error
		 header='Oops an error occurred!'
		 content={errorMessage}
	       />
	      }
	      <Card fluid color='purple' >
		<Card.Content header='Login' />
		<Card.Content>
		  <FileForm
		    type="login"
		    isInline="true"
		    submitRoute="login"
		    buttonAction={performLogin}
		  />
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
  }
};


const styles = {
  margin: {
    margin: '2em',
  }
};

const images = {
  imgL: '/images/EC_dress2-01.png',
  imgR: '/images/EC_dress4-01.png'

}



const mapStateToProps = (state) => {
  return {
    modalLoaderActive: state.modalLoaderActive,
    errorMessage: state.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    performLogin: performLogin
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
