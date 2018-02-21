import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {uniqueId} from 'lodash';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';

import { fetchEventsIfNeeded, invalidateEvents, fetchEvents } from '../actions/index';

import { Button, Container, Icon, Dimmer, Segment, Header, Input, Loader } from 'semantic-ui-react';
import { EventFilter, EventTab } from '../components/';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      filters: {'Name': true, 'Location': false}
    }
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

  changeQuery = (event) => {
    this.setState({query: event.target.value});
  }

  changeFilter = (data) => {
    var filts = this.state.filters;
    filts[data.label] = !filts[data.label];
    this.setState({filters: filts});
  }


  render() {
    const { isFetchingEvents, lastUpdatedEvents, history } = this.props;
    const { events } = this.props;
    const processedEvents = events.map(e => {
      e.showAdminControls = false;
      return e;
    });
    
    const bodyProps = {
      query: this.state.query,
      filterBy:this.state.filters,
      events: processedEvents,
      isLoading: isFetchingEvents
    };
    
    return (
      <Container>
	<Segment textAlign='left' vertical>
	  <Input
	    placeholder = 'Search'
	    label="Search"
	    labelPosition="left"
	    type = 'text'
	    size = 'big'
	    disabled = {!this.state.filters['Name'] && !this.state.filters['Location']}
	    onChange={
	      (e, data) => this.changeQuery(e)
	    }/>
	  <Header as="h4"> Filter By: </Header>
	  <Button
	    active = {this.state.filters['Name']}
	    label = 'Name'
	    labelPosition = 'left'
	    size = 'small'
	    toggle
	    onClick={
	      (e, data) => this.changeFilter(data)
	    }/>
	  <Button
	    active = {this.state.filters['Location']}
	    label = 'Location'
	    labelPosition = 'left'
	    size = 'small'
	    toggle
	    onClick={
	      (e, data) => this.changeFilter(data)
	    }/>
	</Segment>
	
	{ processedEvents.length > 0 && 
	  <EventTab query = {this.state.query} filterBy = {this.state.filters} events = {processedEvents} isLoading = {isFetchingEvents} />
	}
	

      </Container>)
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
