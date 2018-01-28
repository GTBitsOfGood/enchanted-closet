import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FileForm } from '../components/CustomForm';
import { Container, Card, Grid, Reveal, Dimmer, Loader, Segment, Message, Image, Button } from 'semantic-ui-react'

import { performLogin } from '../actions/index';

import { withRouter } from 'react-router-dom';

import { Link, Redirect } from 'react-router-dom';
import Radium from 'radium';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {loggedIn, modalLoaderActive, performLogin, errorMessage} = this.props;

    if (loggedIn) return <Redirect to="/" />;
    
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
    loggedIn: state.user,
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
