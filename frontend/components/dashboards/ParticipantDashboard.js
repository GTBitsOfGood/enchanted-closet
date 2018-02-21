import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Card } from 'semantic-ui-react';
import { DashboardCard } from './'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'


const ParticipantDashboard = ( props ) => {
	const registeredEvents = {
		content: "Registered Events will go here!",
		title: "Registered Events",
		url: "dummy"
	}
	const attendedEvents = {
		content: "Attended Events will go here!",
		title: "Attended Events",
		url: "dummy"
	}
	const profilePage = {
		content: "Here is the link to your profile",
		title: "My Profile",
		url: "/profile"
	}

  return (

      <Container>
	<div style={styles.cardWrap}>
	  <DashboardCard {...registeredEvents} />
	  <DashboardCard {...attendedEvents} />
	  <DashboardCard {...profilePage} />

	</div>
      </Container>
    );
}

const styles = {
  cardWrap: {
    paddingTop: '50px'
  }
}

export default ParticipantDashboard
