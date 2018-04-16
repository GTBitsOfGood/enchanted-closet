import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { clearErrors, fetchUserById } from '../actions';

import { Button, Card, Container, Form, Header, Message, Segment } from 'semantic-ui-react';
import { PageTitle, LoadingIcon, ProfileImage } from '../components';
import { ProfileAdmin, ProfileParticipant, ProfileVolunteer, ProfileBase } from '../components';


class Profile extends Component {
  constructor(props){
    super(props);    
    const { clearErrors, fetchUserById, user } = this.props;
    clearErrors();
    fetchUserById(user._id);
  }
  
  render() {
    const { error, user } = this.props;
    
    const profileBody = (() => {
      switch (user.role) {
	case "Admin":
	  return null; // Admin has no profile
	  break;
	case "Volunteer":
	  return <ProfileVolunteer user={user} />;
	  break;
	case "Participant":
	  return <ProfileParticipant user={user} />;
	  break;
      }
    })();
    
    return (
      <Container>
        <PageTitle title="Profile" />
	<Segment>
	  <Card.Group centered stackable>
	    <ProfileBase user={user}/>	   
	    {profileBody}
	  </Card.Group>
	</Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    clearErrors,
    fetchUserById
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
