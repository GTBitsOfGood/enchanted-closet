import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Icon, Dimmer, Loader, Segment } from 'semantic-ui-react';

import Event from '../components/Event';

import { fetchEvents, fetchEventsIfNeeded, invalidateEvents } from '../actions/index';

import {uniqueId} from 'lodash';

import { withRouter } from 'react-router-dom';

class EventsDetail extends Component {
    constructor(props) {
        super(props);
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchEventsIfNeeded());
    }

    handleRefreshClick(e) {
        e.preventDefault()

        const { dispatch } = this.props;
        dispatch(invalidateEvents())
        dispatch(fetchEventsIfNeeded());
    }

    render() {
        const { events, isFetchingEvents, lastUpdatedEvents, location } = this.props
	const eventId = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
	const detail = events.filter((event) => {
	    return event._id === eventId})
	console.log(events); //curious...
	if (detail.length == 0) {
	    console.log("Event not found, retrieving events from backend...");
	    console.log(detail);
	    console.log(events);
	    //dispatch(fetchEventsIfNeeded());
	}

	
        return (
            <Container>
                <h1>Showing event : {eventId}</h1>
                {lastUpdatedEvents &&
                 <span>Last updated at {new Date(lastUpdatedEvents).toLocaleTimeString()}.{' '}</span>
                }
                {!isFetchingEvents &&
                 <a href="#" onClick={this.handleRefreshClick}>
                     Refresh
                 </a>}
                <Dimmer active={isFetchingEvents}>
                    <Loader>Loading</Loader>
                </Dimmer>
                { detail.length > 0 && 
                  Event(detail[0])
                }
                { !isFetchingEvents && detail.length === 0 && 
                  (<div>
		      <h1>404 Event not found</h1>
		      <p>Return to <a href="#/events/">events</a></p>
		  </div>
		  )
                }
            </Container>
        );
    }
}

EventsDetail.propTypes = {
  events: PropTypes.array.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  lastUpdatedEvents: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {
        isFetchingEvents,
        lastUpdatedEvents,
        events
    } = state;

    return {
        events,
        isFetchingEvents,
        lastUpdatedEvents
    }
}

export default withRouter(connect(mapStateToProps)(EventsDetail))

