import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { uniqueId } from 'lodash';
import { Link } from 'react-router-dom';
import Radium from 'radium';

import { fetchEventsIfNeeded, invalidateEvents, fetchFutureEvents, fetchPastEvents } from '../actions/index';

import { Button, Container, Card, Icon, Segment, Header, Input } from 'semantic-ui-react';
import { ButtonGallery, EventTab, PageTitle, RoleCheck } from '../components/';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      query: '',
      filters: {'Name': true, 'Location': false}
    }
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentWillMount() {
    this.props.fetchFutureEvents();
  }

  handleRefreshClick(e) { // Defunct. probably going to cause bugs.
    e.preventDefault()

    const { invalidateEvents, fetchEventsIfNeeded } = this.props;
  }

  changeQuery = (event) => {
    this.setState({query: event.target.value});
  }

  changeFilter = (data) => {
    var filts = this.state.filters;
    filts[data.label] = !filts[data.label];
    this.setState({filters: filts});
  }
  
  componentWillReceiveProps( nextProps ) {
    this.setState({ isFetching: false });
  }
  
  render() {
    // const { isFetchingEvents, lastUpdatedEvents } = this.props; // Defunct
    const { isFetching, query, filters } = this.state;
    const { events = [], fetchPastEvents, fetchFutureEvents } = this.props;
    const bodyProps = {
      query,
      filterBy: filters,
      events,
      isLoading: isFetching
    };
    
    return (
      <Container>
	<PageTitle title="Events" />
	<ButtonGallery>
	  <RoleCheck role="Admin">
	    <Button
	      as={Link}
	      to="/events/create"
	    >
	      Create New Event
	    </Button>
	  </RoleCheck>
	  <Button
	  content="View Future Events"
	  onClick={() => fetchFutureEvents()}	      
	  />
	  <Button
	  content="View Past Events"
	  onClick={() => fetchPastEvents()}
	  />
	  <span style={styles.searchSection}>
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
	  </span>
	  <span style={styles.filterSection}>
	    <span style={styles.searchBy}>
	      Search By:
	    </span>
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
	  </span>
	</ButtonGallery>
	
	<EventTab {...bodyProps} />
      </Container>
    );
  }
}


const styles = {
  control: {
  },
  searchBy: {
    marginRight: "5px"
  },
  filterSection: {
    marginLeft: "5px",
  },
  searchSection: {
  }
}


Events.propTypes = {
  events: PropTypes.array.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  lastUpdatedEvents: PropTypes.number
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

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEventsIfNeeded,
  invalidateEvents,
  fetchFutureEvents,
  fetchPastEvents
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Events);
