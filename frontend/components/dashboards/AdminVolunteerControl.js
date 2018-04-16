import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmVolunteer, denyVolunteer } from '../../actions/';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';

// Approval panel
// TODO: filters and install deny volunteer
// TODO: Style
// Fairly convoluted 
const AdminVolunteerControl = ({ confirmVolunteer, denyVolunteer, events = [], users = [] }) => (
  <Container>
    <Segment.Group>
      <Segment>
	<Header> Volunteer Requests </Header>
      </Segment>
      {events.map(e => {
	 if (!e.pendingVolunteers || e.pendingVolunteers.length === 0) return null;
	 
	 return (
	   <Segment.Group key={`volApproalEvent${e._id}`}>
	     <Segment>
	       {e.name}
	     </Segment>
	     {e.pendingVolunteers.map( id => {
		const user = users.find(u => u._id === id);
		if (user)
		  return (
		    <Segment.Group horizontal key={`volApprovalEvent${e._id}Volunteer${id}`}>
		      <Segment>{user.lastName}</Segment>
		      <Segment>{user.firstName}</Segment>
		      <Segment>
			<Button onClick={() => confirmVolunteer(e._id, id)}>Approve</Button>
			<Button onClick={() => denyVolunteer(e._id, id)}>Deny</Button>   
		      </Segment>
		    </Segment.Group>
		  );
		else
		  return (
		    <Segment key={`volApprovalEvent${e._id}Volunteer${id}`}>
		      Something went wrong retrieving id {id}
		    </Segment>
		  );
	     })}
	   </Segment.Group>
	 );
      })}
    </Segment.Group>
  </Container>
);

const mapStateToProps = state => ({
    events: state.events,
    users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ confirmVolunteer, denyVolunteer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminVolunteerControl);
