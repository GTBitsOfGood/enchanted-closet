import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// TODO: Disallow editing of past/future events
import { fetchFutureEvents, fetchPastEvents, fetchUsers } from '../../actions/';

import { Container, Segment, Header } from 'semantic-ui-react';
import { ErrorComponent, LoadingIcon, PageTitle, SearchBarCard, UserList } from '../../components' 

class AdminAttendance extends Component {
  constructor(props) {
    super(props);
    const { match, users, events, user } = this.props;

    this.state = {
      event_id: match.params.id,
      users: users || [],
      hasAttemptedRefresh: false,
      loading: false,
      filter: ''
    };

    this.searchFilterUsers = this.searchFilterUsers.bind(this);
  }

  componentDidMount() {
    const { event_id } = this.state;
    const { fetchFutureEvents, fetchPastEvents, fetchUsers, events, users } = this.props;
    let event = events.filter(e => e._id === event_id);
    if (!event || event.length === 0) {
      this.setState({loading: true, hasAttemptedRefresh: true});
      fetchFutureEvents();
      fetchPastEvents();
    } else {
      this.setState({event: event[0]});
    }

    if (!users || users.length === 0) {
      this.setState({loading: true});
      fetchUsers();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loading: false});

    const {event_id} = this.state;
    const {events, users} = nextProps;

    if (events) {
      let event = events.filter(e => e._id === event_id);
      if (event && event.length === 1) {
	this.setState({events, event: event[0]});
      }
    }
    if (users) {
      this.setState({users});
    }
  }

  searchFilterUsers(filterString) {
    this.setState({filter: filterString});
  }

  render() {
    const { event, loading, hasAttemptedRefresh, filter } = this.state; // event in state is pretty suboptimal
    const { users, user } = this.props;
    if (user && user.role === 'Volunteer') { // Check legality
      const isRegistered = event && event.volunteers.includes(user._id);
      if (!isRegistered) {
	// redirect
	return <Redirect to="/events" />;
      }
    }
    
    const volunteerBlock = user && users && user.role === 'Admin' && (
      <div>
	<Header as="h4">Volunteers </Header>
	<UserList event={event} users={users.filter(user => user.role === "Volunteer")} filter={filter} />
      </div>
    );
    const participantBlock = users && (
      <div>
	<Header as="h4">Participants </Header>
	<UserList event={event} users={users.filter(user => user.role === "Participant")} filter={filter} />
      </div>
    );
    // TODO: locking and redirect

    if (event && user) {
      
      const isAttending = event.volunteersAttended.filter(v => v._id === user._id).length === 1;
      if (user.role === 'Volunteer' && !isAttending) {
	// lock
	return (<Container>
	  <Segment>
	    Looks like you're registered! Have a coordinator sign you in to start marking participant attendance!
	  </Segment>
	</Container>);
      }
      return (
	<Container>
	  <PageTitle
	    title={event.name}
	    showLoadingIcon
	    link="/admin/users/create"
	    linkTitle="Register"
	  />
	  <SearchBarCard filterFunction={this.searchFilterUsers}/>
	  {volunteerBlock}
	  {participantBlock}
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
