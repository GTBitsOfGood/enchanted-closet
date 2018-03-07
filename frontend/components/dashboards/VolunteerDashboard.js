import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Icon, Grid, Button, Modal, Header, Popup, Container, Card } from 'semantic-ui-react';
import { COLORS } from '../../constants'
import moment from 'moment';

import { DashboardCard } from './';
import { Event } from '../events';


class VolunteerDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var currentDateTime = new Date();
    const { events = [] } = this.props.user;
    const upcomingEvents = events.filter(event => (new Date(event.datetime) > currentDateTime));
    const pastEvents = events.filter(event => (new Date(event.datetime) <= currentDateTime));
    
    const upcomingEventsRender = upcomingEvents.length === 0 ? (<h2> You are not registered for any upcoming events </h2>) : (upcomingEvents.map(event => (
      <Event key={ `${event._id}upcomingEvent` } data = { event } /> )));

    const pastEventsRender = pastEvents.length === 0 ? (<h2> You have not registered for events before! </h2>) : (pastEvents.map(event => (
      <Event key={ `${event._id}pastEvent` } data = { event } /> )));

    return (
      <div>

    <Container style={ style.eventsContainer }>
    <h1 style={style.header} > Upcoming Events </h1>
    <div style={ style.overflowDiv }>
    { upcomingEventsRender }
    </div>
    </Container>

    <Container style={ style.eventsContainer }>
    <h1 style={style.header} > Past Events </h1>
    <div style={ style.overflowDiv }>
    { pastEventsRender }
    </div>
    </Container>

      </div>
    );
  }
}

  const profilePage = {
    content: "Here is the link to your profile",
    title: "My Profile",
    url: "/profile"
  }

const style = {
  eventsContainer: {
    backgroundColor: COLORS.WHITE,
    marginTop: '1em',
    paddingBottom: '1em'

  },
  overflowDiv: {
    overflow: 'auto',
    height: '20em'
  },
  SegmentLeft: {
    backgroundColor: COLORS.BRAND,
    padding: '2em',
    paddingLeft: '2em'
  },
  whiteText: {
    color: COLORS.WHITE
  },
  SegmentRight: {
    backgroundColor: COLORS.WHITE
  },
  header: {
    paddingTop: '0.5em',
    paddingLeft: '0.5em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrap: {
    padding: '1em'
  }
}

const pruneDescription = (description) => {
  const cutoff = 20; // 20 words;
  const split = description.split(' ');
  if (split.length > cutoff) return `${split.splice(0, 20).join(' ')}...`;
  return description;
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerDashboard);
