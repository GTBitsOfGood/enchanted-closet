import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'lodash';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';

import { fetchEventsIfNeeded, invalidateEvents, fetchFutureEvents, fetchPastEvents } from '../actions/index';

import { Button, Container, Card, Icon, Dimmer, Segment, Header, Input, Loader } from 'semantic-ui-react';
import { EventFilter, EventTab, LoadingIcon, PageTitle } from '../components/';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      filters: {'Name': true, 'Location': false}
    }
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

  changeQuery = (event) => {
    this.setState({query: event.target.value});
  }

  changeFilter = (data) => {
    var filts = this.state.filters;
    filts[data.label] = !filts[data.label];
    this.setState({filters: filts});
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
    const isAdmin = this.props.user && this.props.user.role === 'Admin';
    const { isFetchingEvents, lastUpdatedEvents, history } = this.props;
    const { events } = this.props;
    const processedEvents = events.map(e => {
      e.showAdminControls = isAdmin;
      return e;
    });
    
    const bodyProps = {
      query: this.state.query,
      filterBy:this.state.filters,
      events: processedEvents,
      isLoading: isFetchingEvents
    };

    const titleBlock = isAdmin ?
		       <PageTitle title="Events" link="/events/create" linkTitle="Create New"/> : <PageTitle title="Events" />;
    
    return (
    <Container>
      { titleBlock }
      <Segment style={styles.control} textAlign='left' vertical>
	<div style={styles.searchSection}>
	  <Input
	    placeholder = 'Search'
	    label="Search"
	    labelPosition="left"
	    type = 'text'
	    size = 'medium'
	    disabled = {!this.state.filters['Name'] && !this.state.filters['Location']}
	    onChange={
	      (e, data) => this.changeQuery(e)
	    }/>
	</div>
	<div style={styles.filterSection}>
	  <Header as="h4" style={styles.filterByHeader}> Filter By: </Header>
	  <Button
	    active = {this.state.filters['Name']}
	    label = 'Name'
	    labelPosition = 'left'
	    size = 'small'
	    toggle
	    onClick={(e, data) => this.changeFilter(data)}
	  />
	  <Button
	    active = {this.state.filters['Location']}
	    label = 'Location'
	    labelPosition = 'left'
	    size = 'small'
	    toggle
	    onClick={(e, data) => this.changeFilter(data)}
	  />
	</div>
 	<div style={styles.futurePast}>
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
      
      { processedEvents.length > 0 && 
	<EventTab query = {this.state.query} filterBy = {this.state.filters} events = {processedEvents} isLoading = {isFetchingEvents} />
      }
      {
	<Header as='h3'>
	  No events found.
	</Header>
      }
      

    </Container>)
  }
}


const styles = {
  control: {
    clear: "both",
    height: "90px"
  },
  filterByHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  filterSection: {
    marginLeft: "5px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    float: "left",
  },
  futurePast: {
    marginLeft: "5px",
    float: "left"
  },
  pastButton: {
    float: "right"
  },
  searchSection: {
    float: "left"
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
