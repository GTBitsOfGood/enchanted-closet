import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { geocode } from '../helpers/geocodeEngine';

import { Button, Container, Icon, Dimmer, Loader, Segment, Modal } from 'semantic-ui-react';

import Event from '../components/Event';
import ErrorComponent from '../components/ErrorComponent';
import ECMap from '../components/ECMap';
import Speakers from '../components/Speakers';

import { fetchEvents, fetchEventsIfNeeded, invalidateEvents, deleteEvent } from '../actions/index';

import {uniqueId} from 'lodash';

import { bindActionCreators } from 'redux';

import moment from 'moment';

import { withRouter } from 'react-router-dom';

import PageTitle from '../components/PageTitle';

import Clearfix from '../components/Clearfix';
import { Edit } from '../components/Buttons';


const DEFAULT_MAP_LOCATION = {
	latitude: 51.5033640,
	longitude: -0.1276250
};

class EventsDetail extends Component {
	constructor(props) {
		super(props);
		const { match, adminControls } = this.props;
		const eventId = match.params.id;
		this.state = {
			detail : '',
			adminControls: adminControls ? adminControls : false,
			eventId,
			displayMapLocationError: false
		}
	}

	componentDidMount() {
		const { fetchEventsIfNeeded, fetchEvents, events, location } = this.props;
		fetchEventsIfNeeded();
		const detail = events.filter(event => event._id === this.state.eventId);
		if (detail.length === 0) { //in case local store is old
			fetchEvents();
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
		const { events, deleteEvent, isFetchingEvents, location, history } = this.props;
		const { detail, adminControls, displayMapLocationError, latitude, longitude } = this.state;
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
						{adminControls &&
							<div onClick={() => console.log('click')}>
								<Message
									header='Public Event View'
									content='Please click here if you would like to make changes to this event'
								/>
							</div>
						}
						<PageTitle title={detail.name} />
						<Segment key="information">
							<h3>Description</h3>
							<p style={{whiteSpace: 'pre-line'}}>{detail.description}</p>
						</Segment>
						<Speakers speakers={speakers}/>
						{displayMapLocationError || (latitude && longitude) ?
							<ECMap
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
										<Edit history={history} route={`admin/events/${detail._id}/edit`}/>
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
										<Button onClick={() => history.push(`/admin/events/${detail._id}/attendance`)}>Attendance</Button>
									</Button.Group>
								</Clearfix>
							</Segment>
						}
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
}

const mapStateToProps = state => {
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

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		deleteEvent: deleteEvent,
		fetchEventsIfNeeded: fetchEventsIfNeeded,
		fetchEvents: fetchEvents
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsDetail))
