import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Icon, Grid, Button, Modal, Header, Popup, Container, Card, Message } from 'semantic-ui-react';
import { COLORS } from '../../constants'
import moment from 'moment';
import isProfileComplete from '../../helpers/util';
import { DashboardCard } from './';
import { Event } from '../events';


class ParticipantDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var currentDateTime = new Date();

    const { events = [], age, birthday, email } = this.props.user;

    // Get only the user's events from the store using the event ids
    const userEventsDict = this.props.events.filter(
      e => ((events.includes(e._id))));

    // Filter based on time
    const upcomingEvents = userEventsDict.filter(
      event => (new Date(event.datetime) > currentDateTime));
    const pastEvents = userEventsDict.filter(
      event => (new Date(event.datetime) <= currentDateTime));
    
    // Render events using Event component
    const upcomingEventsRender = 
      upcomingEvents.length === 0 ? 
      (<h2> You are not registered for any upcoming events </h2>) : 
      (upcomingEvents.map(event => (
	<Event key={ `${event._id}upcomingEvent` } data = { event } /> 
      )));

    const pastEventsRender = 
      pastEvents.length === 0 ? 
      (<h2> No past events found </h2>) : 
      (pastEvents.map(event => (
	<Event key={ `${event._id}pastEvent` } data = { event } /> 
      )));

    return (
      <div>
	{ !isProfileComplete(this.props.user) ?
	  (<Message style={ styles.wrap } error
		    header='Please fill in your profile.'
		    content='We noticed that your profile is missing important information. Please enter all information into your profile'
	  />) : (null)
	}
	<Container style={ styles.eventsContainer }>
	  <h1 style={styles.header} > Upcoming Events </h1>
	  <div style={ styles.overflowDiv }>
	    { upcomingEventsRender }
	  </div>
	</Container>
	
	<Container style={ styles.eventsContainer }>
	  <h1 style={styles.header} > Past Events </h1>
	  <div style={ styles.overflowDiv }>
	    { pastEventsRender }
	  </div>
	</Container>
      </div>
    );
  }
}

const styles = {
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
    marginTop: '1em'
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
    user: state.user,
    events: state.events
  };
};

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParticipantDashboard);
