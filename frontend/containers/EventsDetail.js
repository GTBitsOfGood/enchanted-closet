import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {uniqueId} from 'lodash';
import moment from 'moment';
import isProfileComplete from '../helpers/util';
import { geocode } from '../helpers/geocodeEngine';

import { fetchEventById, fetchEventsIfNeeded, invalidateEvents, deleteEvent, registerEvent, cancelEvent } from '../actions/index';

import { Button, Container, Icon, Dimmer, Loader, Segment, Modal } from 'semantic-ui-react';
import { Clearfix, Map, EditButton, ErrorComponent, Event, PageTitle, Speakers } from '../components/';

const DEFAULT_MAP_LOCATION = {
  latitude: 51.5033640,
  longitude: -0.1276250
};

class EventsDetail extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const eventId = match.params.id;
    const isAdmin = this.props.user && this.props.user.role === 'Admin';
    this.state = {
      detail : '',
      adminControls: isAdmin,
      eventId,
      displayMapLocationError: false
    }
  }

  componentDidMount() {
    const { fetchEventsIfNeeded, // fetchEvents,
	    events, location } = this.props;
    const eventId = this.props.match.params.id;
    fetchEventsIfNeeded();
    const detail = events.filter(event => event._id === eventId);
    if (detail.length === 0) { //in case local store is old
      fetchEventById(eventId);
    } else {
      this.setState( {detail: detail[0]} );
      geocode(detail[0].location)
	.then(location => {
	  this.setState({latitude: location.lat, longitude: location.lng});
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
    const detail = events.find(e => e._id === eventId);
    if (!detail) {
      this.setState({
	isFetchingEvents: false,
	detail: null
      });
    } else {
      this.setState({
	isFetchingEvents: false,
	detail: detail
      });

      geocode(detail.location)
	.then(location => {
	  this.setState({latitude: location.lat, longitude: location.lng});
	})
	.catch(err => {
	  this.setState({displayMapLocationError: true});
	});
    }
  }

  render() {
    const { user, events, deleteEvent, isFetchingEvents, location, history, registerEvent, cancelEvent } = this.props;
    const { detail, adminControls, displayMapLocationError, latitude, longitude } = this.state;
    const date = new Date(detail.datetime);
    const attendanceBlock = (() => {
    	if (user && user.role !== 'Participant') {
		  return (
	  	  <Container>
	        <Button attached= 'top'>
		  <Link to={'/events/' + detail._id + '/attendance'}>
			  Check Attendance
	        </Link>
		    </Button>
	      </Container>
	      );
		}
	})();
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
	  else {
	  	if ((user.events && user.events.includes(detail._id)) ||
	      (user.pendingEvents && user.pendingEvents.includes(detail._id))) { // Already registered
	      return (
	        <Container>
	      {attendanceBlock}
		  <Button attached = 'top' onClick={() => cancelEvent(detail._id, user._id)}>
		    Cancel Registration
			  </Button>
			</Container>
		  );  
	  	}
	  	else {
	  	  return (
	        <Container>
	      {attendanceBlock}
		  <Button attached = "top" onClick={() => registerEvent(detail._id, user._id)}>
		    Register
		  </Button>
	        </Container>
	      );
	    }
	    
	  }
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
	<Dimmer active={isFetchingEvents}>
	  <Loader>Loading</Loader>
	</Dimmer>
	{ !isFetchingEvents && detail &&
	  <div>
	    <PageTitle title={detail.name} link="/events" linkTitle="Back to All Events" />
	    <Segment key="information">
	      <h3>Description</h3>
	      <p style={{whiteSpace: 'pre-line'}}>{detail.description}</p>
	    </Segment>
	    <Speakers speakers={detail.speakers}/>
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
	    <Segment key="details">
	      <h3>Details</h3>
	      <p><Icon name='map'/> {detail.location}</p>
	      <p><Icon name='clock'/> {moment(new Date(detail.datetime)).format('MMMM Do YYYY, h:mm a')}</p>
	    </Segment>
	    {adminControls &&
	     <Segment key="admin_controls">
	       <h3>Admin Controls</h3>
	       <Clearfix>
		 <Button.Group>
		   <EditButton history={history} route={`admin/events/${detail._id}/edit`}/>
		   <Modal
		     trigger={
		       <Button animated="vertical" color="red">
			 <Button.Content visible>Delete</Button.Content>
			 <Button.Content hidden>
			   <Icon name='trash' />
			 </Button.Content>
		       </Button>
		     }
		     header='Confirm Delete'
		     content='Are you sure you want to delete this event?'
		     actions={[
		       'Cancel',
		       { key: 'done', content: 'Delete', negative: true },
		     ]}
		     onActionClick={() => deleteEvent(detail._id)}
		   />
		   <Button onClick={() => history.push(`/events/${detail._id}/attendance`)}>Mark Attendance</Button>
		   <Button primary onClick={() => window.open(`/api/events/${detail._id}/report`, '_blank')}>Download Attendance Reord</Button>
		 </Button.Group>
	       </Clearfix>
	     </Segment>
	    }
	  </div>
	}
	{ !isFetchingEvents && !detail &&
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

EventsDetail.propTypes = {
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
    fetchEventById: fetchEventById,
    registerEvent: registerEvent,
    cancelEvent: cancelEvent
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsDetail))
