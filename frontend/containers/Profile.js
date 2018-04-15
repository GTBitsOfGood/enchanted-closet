import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { clearErrors, fetchUserById } from '../actions';

import { Button, Container, Card, Form, Header, Message } from 'semantic-ui-react';
import { CustomForm, PageTitle, LoadingIcon, ProfileImage } from '../components';
import { ProfileAdmin, ProfileParticipant, ProfileVolunteer } from '../components';


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
	  return <ProfileAdmin />;
	  break;
	case "Volunteer":
	  return <ProfileVolunteer />;
	  break;
	case "Participant":
	  return <ProfileParticipant />;
	  break;
      }
    })();
    
    return (
      <Container>
        <PageTitle title="Profile" />
	<Card>
	  <ProfileImage />
	</Card>
        <Card fluid>
	  {profileBody}
        </Card>
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
