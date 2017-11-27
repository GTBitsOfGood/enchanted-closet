import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';

import LoadingIcon from '../../components/LoadingIcon';

import { fetchEventsIfNeeded } from '../../actions';

import { Redirect } from 'react-router-dom';
import AdminEventsNew from './EventsNew';

class EventsEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			event: this.props.events.find(e => e._id === this.props.match.params.id),
			loading: true
		};
		if (this.state.event) this.state.loading = false;
	}

	componentDidMount() {
		const { dispatch } = this.props;
		if (this.props.event === undefined) dispatch(fetchEventsIfNeeded());
	}

	componentWillReceiveProps(nextProps) {
		const { loading, error, events, newEvent } = nextProps;
		this.setState({
			loading: loading,
			error: error,
			event: events.find(e => e._id === this.props.match.params.id),
			newEvent: newEvent
		});
	}

	render() {
		const { loading, event, newEvent} = this.state;
		if (newEvent) {
			return <Redirect to={`/admin/events/${newEvent._id}`}/>
		} else {
			return (
				<Container>
					{loading &&
						<LoadingIcon active/>
					}
					{!loading &&
						<AdminEventsNew event={event} />
					}
				</Container>
			);
		}
	}
}

EventsEdit.PropTypes = {
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading || false,
		error: state.error,
		events: state.events,
		newEvent: state.newEvent
	};
};

const mapDispatchToProps = dispatch => {
	return {};
}

export default connect(
    mapStateToProps
)(EventsEdit);
