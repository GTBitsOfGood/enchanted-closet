import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Card } from 'semantic-ui-react';

import { fetchEventsIfNeeded } from '../../actions';

import PageTitle from '../../components/PageTitle';
import LoadingIcon from '../../components/LoadingIcon';

import Event from '../../components/Event';

class AdminEvents extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(fetchEventsIfNeeded());
	}

	render() {
		const { events, isFetchingEvents } = this.props;
		return (
			<Container>
				<PageTitle title="Events" link="admin/events/create" linkTitle="Create New"/>
				<div style={{paddingTop:50}}>
					{isFetchingEvents &&
					<LoadingIcon active/>
					}
					{!isFetchingEvents && events.length > 0 &&
						events.map(Event)
					}
					{!isFetchingEvents && events.length === 0 &&
						<h1>No events!</h1>
					}
				</div>
			</Container>
		);
	}
}

AdminEvents.PropTypes = {
	events: PropTypes.array,
	isFetchingEvents: PropTypes.bool,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    const {
        isFetchingEvents,
        events
    } = state;

    return {
    	isFetchingEvents,
    	events
    }
};

const mapDispatchToProps = dispatch => {
	return {};
}

export default connect(
    mapStateToProps
)(AdminEvents);