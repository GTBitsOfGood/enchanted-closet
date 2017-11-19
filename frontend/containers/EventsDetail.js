import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Icon, Dimmer, Loader, Segment } from 'semantic-ui-react';

import Event from '../components/Event';
import ErrorComponent from '../components/ErrorComponent';

import { fetchEvents, fetchEventsIfNeeded, invalidateEvents } from '../actions/index';

import {uniqueId} from 'lodash';

import { withRouter } from 'react-router-dom';

class EventsDetail extends Component {
	constructor(props) {
		super(props);
		this.handleRefreshClick = this.handleRefreshClick.bind(this)
		const { match } = this.props;
		const eventId = match.params.id;
		this.state = {
			detail : '',
			eventId
		}
	}

	componentDidMount() {
		const { dispatch, events, location } = this.props;
		dispatch(fetchEventsIfNeeded());	
		const detail = events.filter(event => event._id === this.state.eventId);
		if (detail.length === 0) { //in case local store is old
			dispatch(fetchEvents());
		} else {
			this.setState( {detail: detail[0]} );
		}
	}

	componentWillReceiveProps(nextProps) {
		const { events } = nextProps;
		const eventId = this.state.eventId;
		//process it again
		const detail = events.find(e => e._id === eventId);
		if (!detail) {
			this.setState({
				isFetchingEvents: false,
				detail: null
			});
		} else {
			this.setState({
				detail: detail,
			});
		}

	}

	handleRefreshClick(e) {
		e.preventDefault()

		const { dispatch } = this.props;
		dispatch(invalidateEvents())
		dispatch(fetchEventsIfNeeded());
	}

	render() {
		const { events, isFetchingEvents, lastUpdatedEvents, location } = this.props;
		const { detail } = this.state;
		return (
			<Container>
				<h1>Showing event : {this.state.eventId}</h1>
				{lastUpdatedEvents &&
					<span>Last updated at {new Date(lastUpdatedEvents).toLocaleTimeString()}.{' '}</span>
				}
				{!isFetchingEvents &&
					<a href="#" onClick={this.handleRefreshClick}>
					Refresh
					</a>
				}
				<Dimmer active={isFetchingEvents}>
				<Loader>Loading</Loader>
				</Dimmer>
				{ detail != '' &&
					Event(detail)
				}
				{ !isFetchingEvents && !detail && 
					<ErrorComponent redir='#/events/' redirMsg='Return to all events' errMsg='404 - Event not Found'/>
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

