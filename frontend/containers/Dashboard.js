import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { PageTitle,
	 AdminDashboard,
	 ParticipantDashboard,
	 VolunteerDashboard
} from '../components/'
import { Container, Card } from 'semantic-ui-react'


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { role } = this.props.user
    const dashBlock = (role => {
      switch (role) {
	case 'Admin':
	  return <AdminDashboard />
	  break
	case 'Participant':
	  return <ParticipantDashboard />
	  break
	case 'Volunteer':
	  return <VolunteerDashboard />
	  break
      }
      return null
    })(role)

    return (
      <Container>
	<PageTitle title={`${role} Dashboard`} />
	{ dashBlock }
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

export default withRouter(connect(
  mapStateToProps
)(Dashboard));
