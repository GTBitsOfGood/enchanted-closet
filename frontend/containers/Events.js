import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import {uniqueId} from 'lodash';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';

import { fetchEventsIfNeeded, invalidateEvents, fetchEvents } from '../actions/index';

import { Button, Container, Icon, Dimmer, Loader, Segment, Header, Input, Search} from 'semantic-ui-react';
import { Event } from '../components/';



class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {query: '', filters: {'Name': false, 'Location': false}}
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEvents());
    // dispatch(fetchEventsIfNeeded());
  }
  search(event) {
    this.setState({query: event.target.value})
  }
  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch } = this.props;
    dispatch(invalidateEvents())
    dispatch(fetchEventsIfNeeded());
  }
  changeQuery(data)
  {
    var filts = this.state.filters;
    filts[data.label] = !filts[data.label];
    this.setState({filters: filts})
  }

  render() {
    const { isFetchingEvents, lastUpdatedEvents, history } = this.props
    let { events } = this.props;
    events = events.map(e => {
      e.showAdminControls = false;
      return e;
    });
    return (
      <Container>
	<Segment textAlign="center" style={styles.base}>
	  <Header as="h1">Upcoming Events</Header>
	</Segment> 
  
  <Input
    placeholder = 'Search'
    type = 'text'
    size = 'big'
    onChange={
        (e) => this.search(e)
    }/> 
  <Segment textAlign='left' vertical >
  <Header as="l1">Search By:</Header>
  </Segment>
  <Segment textAlign='left' vertical >
  <Button
    active = {this.state.filters['Name']}
    label = 'Name'
    labelPosition = 'left'
    size = 'small'
    toggle
    onClick={
      (e, data) => (this.changeQuery(data))
    }/>
  <Button
    active = {this.state.filters['Location']}
    label = 'Location'
    labelPosition = 'left'
    size = 'small'
    toggle
    onClick={
      (e, data) => (this.changeQuery(data))
    }/>
  </Segment>
  <Loader active={isFetchingEvents}>Loading</Loader>
	{ events.length > 0 &&
	    events.map(e => {
      if (this.state.filters['Name'] == true)
        if (e.name.toLowerCase().includes(this.state.query.toLowerCase()))
          return <Event key={e._id} data={e} history={history}/>
      if (this.state.filters['Location'] == true)
        if (e.location.toLowerCase().includes(this.state.query.toLowerCase()))
          return <Event key={e._id} data={e} history={history}/>
      if (this.state.filters['Name'] == false && this.state.filters['Location'] == false)
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

const styles = {
  base: {
    padding: "2em"
  }
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
