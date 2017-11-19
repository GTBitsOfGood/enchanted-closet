import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Icon, Dimmer, Loader, Segment } from 'semantic-ui-react';

import Event from '../components/Event';
import ErrorComponent from '../components/ErrorComponent';
import ECMap from '../components/ECMap';
import Speakers from '../components/Speakers';

import { fetchEvents, fetchEventsIfNeeded, invalidateEvents } from '../actions/index';

import {uniqueId} from 'lodash';

import moment from 'moment';

import { withRouter } from 'react-router-dom';

import PageTitle from '../components/PageTitle';

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
		const { events, isFetchingEvents, location } = this.props;
		const { detail } = this.state;
		const speakers = [
		  {
		    name: 'Elliot Fu',
		    bio: 'Elliot has been a member since July 2012',
		    avatar: '/assets/images/avatar/small/elliot.jpg',
		  },
		  {
		    name: 'Stevie Feliciano',
		    bio: 'Stevie has been a member since August 2013',
		    avatar: '/assets/images/avatar/small/stevie.jpg',
		  },
		  {
		    name: 'Matt',
		    bio: 'Matt has been a member since July 2014',
		    avatar: '/assets/images/avatar/small/matt.jpg',
		  },
		];
		return (
			<Container>
				<Dimmer active={isFetchingEvents}>
					<Loader>Loading</Loader>
				</Dimmer>
				{ !isFetchingEvents && detail &&
					<div>
						<PageTitle title={detail.name} />
						<Segment>
							<h3>Description</h3>
							<p>{detail.description}</p>
						</Segment>
						<Speakers speakers={speakers}/>
						<ECMap
						  isMarkerShown
						  lat={51.5033640}
						  long={-0.1276250}
						/>
						<Segment>
							<h3>Details</h3>
							<p><Icon name='map'/> {detail.location}</p>
							<p><Icon name='clock'/> {moment(new Date(detail.datetime)).format('MMMM Do YYYY, h:mm a')}</p>
						</Segment>
					</div>
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

