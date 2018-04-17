import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmVolunteer, denyVolunteer } from '../../actions/';
import { Button, Container, Divider, Header, Icon, Segment } from 'semantic-ui-react';
import { COLORS } from '../../constants';
// Approval panel
// TODO: filters and install deny volunteer
// TODO: Style
// Fairly convoluted 
const AdminVolunteerControl = ({ confirmVolunteer, denyVolunteer, events = [], users = [] }) => {
  // add in empty state
  return (
    <Container>
      <Segment.Group style={styles.overall}>
	<Segment>
	  <Header as="h2"> Volunteer Requests </Header>
	  <Divider />
	</Segment>
	{events.map(e => {
	   if (!e.pendingVolunteers || e.pendingVolunteers.length === 0) return null;
	   
	   return (
	     <Segment.Group style={styles.entryGroup} key={`volApproalEvent${e._id}`}>
	       <Segment>
		 <Header as="h3"> Event: {e.name} </Header>
	       </Segment>
	       {e.pendingVolunteers.map( id => {
		  const user = users.find(u => u._id === id);
		  if (user)
		    return (
		      <Segment.Group style={styles.entry} horizontal key={`volApprovalEvent${e._id}Volunteer${id}`}>
			<Segment>{user.lastName}</Segment>
			<Segment>{user.firstName}</Segment>
			<Segment>
			  <Button onClick={() => denyVolunteer(e._id, id)} negative>Deny</Button>
			  <Button onClick={() => confirmVolunteer(e._id, id)} positive>Approve</Button>
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
  );}

const styles = {
  entry: {
    backgroundColor: COLORS.WHITE
  },
  entryGroup: {
    marginBottom: '1em'
  },
  overall: {
    backgroundColor: COLORS.WHITE
  }
};

const mapStateToProps = state => ({
    events: state.events,
    users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ confirmVolunteer, denyVolunteer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminVolunteerControl);
