import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {uniqueId} from 'lodash';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';

import { fetchEventsIfNeeded, invalidateEvents, fetchFutureEvents, fetchPastEvents } from '../actions/index';

import { Button, Container, Dimmer, Header, Icon, Loader, Segment} from 'semantic-ui-react';
import { EventBody } from '../components/';

class Events extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.fetchPastHandler = this.fetchPastHandler.bind(this)
    this.fetchFutureHandler = this.fetchFutureHandler.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFutureEvents());
    // dispatch(fetchEventsIfNeeded());
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props;
    dispatch(invalidateEvents());
    dispatch(fetchEventsIfNeeded());
  }

  fetchPastHandler() {
    const { dispatch } = this.props;
    dispatch(fetchPastEvents());
  }

  fetchFutureHandler() {
    const { dispatch } = this.props;
    dispatch(fetchFutureEvents());
  }

  render() {
    const { isFetchingEvents, lastUpdatedEvents, history } = this.props;
    const { events } = this.props;
    const processedEvents = events.map(e => {
      e.showAdminControls = false;
      return e;
    });
    const bodyProps = { events: processedEvents, isFetchingEvents };
    return (
      <Container>
	<Segment style={styles.base}>
	  <Header as="h1">Upcoming Events</Header>
	  <div>
	    <Button
	      style={styles.pastButton}
	      content="View Future Events"
	      onClick={this.fetchFutureHandler}	      
	    />
	    <Button
	      style={styles.pastButton}
	      content="View Past Events"
	      onClick={this.fetchPastHandler}
	    />
	  </div>
	</Segment>
	<Loader active={isFetchingEvents}>
	  Loading
	</Loader>
	<EventBody { ...bodyProps } />
      </Container>
    );
  }
}

const styles = {
  base: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2em"
  },
  pastButton: {
    float: "right"
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
    events,
    isFetchingEvents,
    lastUpdatedEvents
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
