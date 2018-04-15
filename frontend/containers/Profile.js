import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { clearErrors, fetchUserById, upsertUser } from '../actions';

import { Button, Container, Card, Form, Header, Message } from 'semantic-ui-react';
import { CustomForm, PageTitle, LoadingIcon, ProfileImage } from '../components';
import ProfileForm from '../static/surveys/ProfileFormJSON.js';
import { ProfileAdmin, ProfileParticipant, ProfileVolunteer } from '../components';


class Profile extends Component {
  constructor(props){
    super(props);
    
    const { clearErrors, fetchUserById, user } = this.props;
    clearErrors();
    if (user) { // oh there better be a user
      fetchUserById(user._id);
    }
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
    
    if (user) {
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
    } else {
      return <Redirect to={`/login`}/>;
    }
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
    fetchUserById,
    upsertUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
