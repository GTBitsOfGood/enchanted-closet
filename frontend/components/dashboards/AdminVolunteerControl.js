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
	 let needsApprovalList = [];
	 e.volunteers.forEach( vId => {
	   const user = users.find(u => u._id === vId);
	   if (user && user.pendingEvents.includes(e._id)) {
	     needsApprovalList.push(user);
	   }
	 }); // return list of needs approval users
	 if (needsApprovalList.length === 0) return null;

	 return (
	   <Segment.Group key={`volApproalEvent${e._id}`}>
	     {needsApprovalList.map( user => (
	       <Segment.Group horizontal key={`volApprovalEvent${e._id}Volunteer${user._id}`}>
		 <Segment>{user.lastName}</Segment>
		 <Segment>{user.firstName}</Segment>
		 <Segment>
		   <Button onClick={() => confirmVolunteer(e._id, user._id)}>Approve</Button>
		   <Button onClick={() => denyVolunteer(e._id, user._id)}>Deny</Button>   
		 </Segment>
	       </Segment.Group>
	     ))}
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
