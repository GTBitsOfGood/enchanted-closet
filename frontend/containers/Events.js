import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {uniqueId} from 'lodash';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';

import { fetchEventsIfNeeded, invalidateEvents, fetchEvents } from '../actions/index';

import { Button, Container, Card, Icon, Dimmer, Segment, Header, Input, Loader } from 'semantic-ui-react';
import { EventFilter, LoadingIcon, PageTitle } from '../components/';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {query: '', filters: {'Name': true, 'Location': false}}
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

  changeQuery(event)
  {
    this.setState({query: event.target.value});
  }

  changeFilter(data)
  {
    var filts = this.state.filters;
    filts[data.label] = !filts[data.label];
    this.setState({filters: filts});
  }


  render() {
    var isAdmin = true;
    if (this.props.user.role !== 'Volunteer' && this.props.user.role !== 'Admin') {
      isAdmin = false;
    }
    const { isFetchingEvents, lastUpdatedEvents, history } = this.props;
    const { events } = this.props;
    const processedEvents = events.map(e => {
      e.showAdminControls = isAdmin;
      return e;
    });
    const bodyProps = { query: this.state.query, filterBy:this.state.filters, events: processedEvents, isLoading: isFetchingEvents };
    return (
    <Container>
    {isAdmin &&
      <PageTitle title="Events" link="/admin/events/create" linkTitle="Create New"/>
    }
  <Input
    placeholder = 'Search'
    type = 'text'
    size = 'big'
    disabled = {!this.state.filters['Name'] && !this.state.filters['Location']}
    onChange={
      (e, data) => this.changeQuery(e)
    }/> 

    <Segment textAlign='left' vertical>
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
  <EventFilter query = {this.state.query} filterBy = {this.state.filters} events = {processedEvents} isLoading = {isFetchingEvents} />
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
    lastUpdatedEvents,
    user
  } = state;

  return {
    events,
    isFetchingEvents,
    lastUpdatedEvents,
    user
  }
}

export default withRouter(connect(
  mapStateToProps
)(Events));
