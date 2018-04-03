import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// TODO: Disallow editing of past/future events
import { fetchFutureEvents, fetchPastEvents, fetchUsers } from '../../actions/';

import { Container, Segment } from 'semantic-ui-react';
import { ErrorComponent, LoadingIcon, PageTitle, SearchBarCard, UserList } from '../../components' 

class AdminAttendance extends Component {
  constructor(props) {
    super(props);
    const { match, users, events, user, fetchFutureEvents } = this.props;
    this.state = {
      event_id: match.params.id,
      users: users || [],
      hasAttemptedRefresh: false,
      loading: false,
      filter: ''
    };
    if (events && events.length > 0) {
      const event = events.filter(e => e._id === this.state.event_id);
      if (event && event.length === 1) {
	this.state.event = event[0];
      }
    }

    this.searchFilterUsers = this.searchFilterUsers.bind(this);
  }

  componentDidMount() {
    const { event_id } = this.state;
    const { fetchFutureEvents, fetchPastEvents, fetchUsers} = this.props;
    const { events, users } = this.props;
    let event = events.filter(e => e._id === event_id);
    if (!event || event.length === 0) {
      this.setState({loading: true, hasAttemptedRefresh: true});
      fetchFutureEvents();

    } else {
      this.setState({event: event[0]});
      this.setState({users: event[0].participants})
    }
    if (!users || users.length === 0) {
      this.setState({loading: true});
      fetchUsers();

    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loading: false});
    const {event_id} = this.state;
    const {events} = nextProps;
    

    if (events) {

      let event = events.filter(e => e._id === event_id);
      let users = event[0].participants;
      if (users) {
      this.setState({users:users});
    }
      if (event && event.length === 1) {
	this.setState({events, event: event[0]});
      }
    }
    
    
  }

  searchFilterUsers(filterString) {
    this.setState({filter: filterString});
  }

  render() {
    const { loading, event, users, hasAttemptedRefresh, filter } = this.state;
    if (event) {
      return (
	<Container>
	  <PageTitle
	    title={event.name}
	    showLoadingIcon
	    link="/admin/users/create"
	    linkTitle="Register"
	  />
	  <SearchBarCard filterFunction={this.searchFilterUsers}/>
	  <UserList event={event} users={users} filter={filter} />
	</Container>
      );
    } else {
      if (!loading && hasAttemptedRefresh) {
	return (
	  <ErrorComponent redir='/events/' redirMsg='Return to all events' errMsg='404 - Cannot mark attendance for past or unavailable event'/>
	)
      } else {
	return (
	  <LoadingIcon active />
	)
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    events: state.events,
    user: state.user,
    users: state.users
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchFutureEvents: fetchFutureEvents,
    fetchPastEvents: fetchPastEvents,
    fetchUsers: fetchUsers
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAttendance));
