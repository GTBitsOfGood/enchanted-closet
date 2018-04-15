import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { uniqueId } from 'lodash';
import moment from 'moment';
import isProfileComplete from '../helpers/util';
import { geocode } from '../helpers/geocodeEngine';

import { upfetchEventById, fetchEventsIfNeeded, invalidateEvents, deleteEvent, registerEvent, cancelEvent } from '../actions/index';
import { Button, Container, Icon, Segment, Modal } from 'semantic-ui-react';
import { DeleteButton, DownloadAttendanceButton, EventImageButton,
	 Clearfix, MarkAttendanceButton, Map, EditButton,
	 ErrorComponent, Event, PageTitle, RoleCheck, Speakers } from '../components/';

const DEFAULT_MAP_LOCATION = {
  latitude: 51.5033640,
  longitude: -0.1276250
};

// TODO: Insert image
class EventsDetail extends Component {
  constructor(props) {
    super(props);
    const { match, user } = this.props;
    const eventId = match.params.id;
    this.state = {
      eventId,
      isFetchingEvents: true, // for loading
      displayMapLocationError: false
    }
  }

  componentWillMount() {
    const { match, upfetchEventById, // fetchEvents,
	    events, location } = this.props;
    const eventId = match.params.id;
    const event = events.find(event => event._id === eventId);
    if (!event) { //in case local store is old
      upfetchEventById(eventId); // fetching
    } else {
      this.setState( {
	event,
	isFetchingEvents: false
      } );
      geocode(event.location)
	.then(location => {
	  this.setState({
	    latitude: location.lat,
	    longitude: location.lng
	  });
	})
	.catch(err => {
	  this.setState({displayMapLocationError: true});
	});
    }
  }

  componentWillReceiveProps(nextProps) {
    const { events } = nextProps;
    const eventId = this.state.eventId;
    //process it again
    if (!events) return;
    const event = events.find(e => e._id === eventId);
    if (!event) {
      this.setState({
	isFetchingEvents: false,
	event: null
      });
    } else {
      this.setState({
	isFetchingEvents: false,
	event
      });
      
      geocode(event.location)
	.then(location => {
	  this.setState({
	    latitude: location.lat,
	    longitude: location.lng
	  });
	})
	.catch(err => {
	  this.setState({displayMapLocationError: true});
	});
    }
  }

  render() {
    const { user, events, deleteEvent, registerEvent, cancelEvent } = this.props;
    const { event, isFetchingEvents, displayMapLocationError, latitude, longitude } = this.state;
    if (!event && isFetchingEvents) // Still processing
      return <div />;
    const date = new Date(event.datetime);
    const registerBlock = (() => {
      if (date.getTime() > Date.now()) {
	if (user) {
	  if (!isProfileComplete(user)) {
	    return (
	      <Container>
		<Button>		  
		  <Link to='/profile'>
		    Complete Profile to Register
		  </Link>
		</Button>
	      </Container>
	    );
	  }
	  if ((user.events && user.events.includes(event._id)) ||
	      (user.pendingEvents && user.pendingEvents.includes(event._id))) { // Already registered
	    return (
	      <Container>
		<Button onClick={() => cancelEvent(event._id, user._id)}>
		  Cancel
		</Button>
	      </Container>
	    );
	  }
	  return (
	    <Container>
	      <Button onClick={() => registerEvent(event._id, user._id)}>
		Register
	      </Button>
	    </Container>
	  );
	} else {
	  return (
	    <Container>
	      <Button attached= 'top'>
		<Link to='/login'>
		  Login to Register
		</Link>
	      </Button>
	    </Container>
	  );
	}
      } else return null;
    })();

    return (
      <Container>
	{ registerBlock }
	{ !isFetchingEvents && event &&
	  <div>
	    <PageTitle title={event.name} link="/events" linkTitle="Back to All Events" />
	    <Segment key="information">
	      <h3>Description</h3>
	      <p style={{whiteSpace: 'pre-line'}}>{event.description}</p>
	    </Segment>
	    <Speakers speakers={event.speakers}/>
	    {displayMapLocationError || (latitude && longitude) ?
	     <Map
	       isMarkerShown
	       lat={latitude || DEFAULT_MAP_LOCATION.latitude}
	       long={longitude || DEFAULT_MAP_LOCATION.longitude}
	       displayMapLocationError={displayMapLocationError}
	     />
	     :
	     <Segment style={{textAlign: 'center', padding: '80px'}} loading />
	    }
	    <Segment key="events">
	      <h3>Events</h3>
	      <p><Icon name='map'/> {event.location} </p>
	      <p><Icon name='clock'/> {moment(new Date(event.datetime)).format('MMMM Do YYYY, h:mm a')}</p>
	    </Segment>
	    <RoleCheck role="Admin">
	      <Segment>
		<h3>Admin Controls</h3>
		<Clearfix>
		  <Button.Group>
		    <EditButton id={event._id} />
		    <Modal
		      trigger={
			<DeleteButton />
		      }
		      header='Confirm Delete'
		      content='Are you sure you want to delete this event?'
		      actions={[
			'Cancel',
			{ key: 'done', content: 'Delete', negative: true },
		      ]}
		      onActionClick={() => deleteEvent(event._id)}
		    />
		    <EventImageButton id={event._id} />
		    <MarkAttendanceButton id={event._id} />
		    <DownloadAttendanceButton id={event._id} />
		  </Button.Group>
		</Clearfix>
	      </Segment>
	    </RoleCheck>
	    <RoleCheck role="Volunteer">
	      <MarkAttendanceButton />
	    </RoleCheck>
	  </div>
	}
	{ !isFetchingEvents && !event &&
	  <ErrorComponent
	    redir='/events/'
	    redirMsg='Return to all events'
	    errMsg='404 - Event not Found'
	  />
	}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {
    isFetchingEvents,
    lastUpdatedEvents,
    events,
    user
  } = state;

  return {
    events,
    isFetchingEvents,
    lastUpdatedEvents,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteEvent: deleteEvent,
    fetchEventsIfNeeded: fetchEventsIfNeeded,
    upfetchEventById: upfetchEventById,
    registerEvent: registerEvent,
    cancelEvent: cancelEvent
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsDetail))
