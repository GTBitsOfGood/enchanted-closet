import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmVolunteer, denyVolunteer } from '../../actions/';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';

// Approval panel
// TODO: filters and install deny volunteer
// TODO: Style
// Fairly convoluted 
const AdminVolunteerControl = ({ confirmVolunteer, events, users }) => (
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
	 return (
	   <Segment.Group>
	     {needsApprovalList.map( user => (
	       <Segment.Group horizontal>
		 <Segment>{user.lastName}</Segment>
		 <Segment>{user.firstName}</Segment>
		 <Segment>
		   <Button onClick={confirmVolunteer}>Approve</Button>
		   <Button onClick={denyVolunteer}>Deny</Button>   
		 </Segment>
	       </Segment.Group>
	     ))}
	   </Segment.Group>
	 )
	 (
	   <Segment.Group>
	     {e.volunteers.filter(vId =>
	       users.find(u => u._id === vId).pendingEvents.includes(e._id)).map(v => (
		 <Segment>
		   {v.name}
		 </Segment>
	       ))}
	   </Segment.Group>

	 );})}
    </Segment.Group>
  </Container>
);

const mapStateToProps = state => ({
    events: state.events,
    users: state.users
});

const mapDispatchToProps = dispatch => ({ confirmVolunteer, denyVolunteer });

export default connect(mapStateToProps)(AdminVolunteerControl);
