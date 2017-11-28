import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Icon, Dimmer, Loader, Segment, Header } from 'semantic-ui-react';

import Event from '../components/Event';

import { fetchEventsIfNeeded, invalidateEvents, fetchEvents } from '../actions/index';

import {uniqueId} from 'lodash';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';

class Events extends Component {
    constructor(props) {
        super(props);
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchEvents());
        // dispatch(fetchEventsIfNeeded());
    }

    handleRefreshClick(e) {
        e.preventDefault()

        const { dispatch } = this.props;
        dispatch(invalidateEvents())
        dispatch(fetchEventsIfNeeded());
    }

    render() {
        const { isFetchingEvents, lastUpdatedEvents, history } = this.props
        let { events } = this.props;
        events = events.map(e => {
            e.showAdminControls = false;
            return e;
        });
	let style = {
	    base: {
		padding: "2em"
	    }
	}
        return (
            <Container>
		<Segment textAlign="center" style={style.base}>
                    <Header as="h1">Upcoming Events</Header>
		</Segment>
                <Loader active={isFetchingEvents}>Loading</Loader>
                { events.length > 0 &&
                    events.map(e => {
                        return <Event key={e._id} data={e} history={history}/>
                    })
                }
                { !isFetchingEvents && events.length === 0 &&
                    <h1>No events</h1>
                }
            </Container>
        );
    }
}

Events.propTypes = {
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

export default withRouter(connect(
    mapStateToProps
)(Events));
