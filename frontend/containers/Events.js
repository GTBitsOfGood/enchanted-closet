import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Icon, Dimmer, Loader, Segment } from 'semantic-ui-react';

import Event from '../components/Event';

import { fetchEventsIfNeeded, invalidateEvents } from '../actions/index';

import {uniqueId} from 'lodash';

class Events extends Component {
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
        const { events, isFetchingEvents, lastUpdatedEvents } = this.props
        return (
            <Container>
                <h1>Upcoming Events</h1>
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
                { events.length > 0 && 
                    events.map(Event)
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

export default connect(mapStateToProps)(Events)

