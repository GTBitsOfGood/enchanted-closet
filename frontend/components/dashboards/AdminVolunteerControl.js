import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';

// Approval panel
// TODO: Style
const AdminVolunteerControl = ({events}) => (
  <Container>
    <Segment>
      <Header> Volunteer Requests </Header>
      {events.map(e => <div> Nice </div>)}
    </Segment>
  </Container>
);

const mapStateToProps = state => {
  return {
    events: state.events
  };
};

export default connect(mapStateToProps)(AdminVolunteerControl);
