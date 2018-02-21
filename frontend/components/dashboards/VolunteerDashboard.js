import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Card } from 'semantic-ui-react';
import { DashboardCard } from './'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'


const VolunteerDashboard = ( props ) => {
	const registeredEvents = {
		content: "Registered Events will go here!",
		title: "Registered Events",
		url: "dummy"
	}
	const pendingEvents = {
		content: "Pending Events will go here!",
		title: "Pending Events",
		url: "dummy"
	}
	const pastEvents = {
		content: "Past Events will go here!",
		title: "Past Events",
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
	  <DashboardCard {...pendingEvents} />
	  <DashboardCard {...pastEvents} />
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

export default VolunteerDashboard

