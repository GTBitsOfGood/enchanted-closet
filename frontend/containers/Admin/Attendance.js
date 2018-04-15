import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// TODO: Disallow editing of past/future events
import { upfetchEventById, fetchUsers } from '../../actions/';

import { Container, Segment, Header } from 'semantic-ui-react';
import { ErrorComponent, GenericBanner, LoadingIcon, PageTitle, RoleCheck, SearchBarCard, UserList } from '../../components' 


/* Attendance Page
 * Only Admins can mark volunteer attendance
 * TODO: Styling (Urgent) More efficient fetching (Icebox)
 */
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

  componentDidMount() { // Identify the proper event for full fetch. Fetch if full fetch needed.
    const { event_id } = this.state;
    const { upfetchEventById, fetchUsers, events = [], users } = this.props;

    // Search for event
    let event = events.find(e => e._id === event_id);
    if (event) {     
      this.setState({event: event[0]});
    } else {
      this.setState({loading: true, hasAttemptedRefresh: true});
      upfetchEventById(event_id);
    }

    // Populate users : TODO - excessive fetching - fetch with event user registry
    if (users.length === 0) {
      this.setState({loading: true});
      fetchUsers();

    }
  }

  componentWillReceiveProps(nextProps) { // Receipt of full fetch
    this.setState({loading: false});

    const { event_id } = this.state;
    const { events = [], users = [] } = nextProps;

    let event = events.find(e => e._id === event_id);
    if (event)
      this.setState({ events, event: event[0] }); // TODO: Note completely redundant fetching and overwriting of good data
    
    this.setState({users});
  }

  searchFilterUsers(filterString) {
    this.setState({filter: filterString});
  }

  render() {
    const { event, loading, hasAttemptedRefresh, filter } = this.state; // event in state is pretty suboptimal
    const { users, user } = this.props;

    if (event) {
      // Timecheck on event: TODO CONSTANT ASSUMPTION Presume same day
      // Future TODO: Split single time into start and end
      if (Date.now().getFullYear() === event.datetime.getFullYear() &&
	  Date.now().getMonth() === event.datetime.getMonth() &&
	  Date.now().getDate() === event.datetime.getDate()) {// BUG Likely source of one at least
	// Verify users
	if (user) {	 
	  if (user.role === 'Volunteer') { // Redirect unregistered volunteers
	    const isRegistered = event && event.volunteers.includes(user._id);
	    if (!isRegistered) { 
	      return <Redirect to="/events" />;
	    }
	  }

	  const volunteerBlock = users && (
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

	  const isAttending = event.volunteersAttended.filter(v => v._id === user._id).length === 1;
	  if (user.role === 'Volunteer' && !isAttending) {
	    return (
	      <Container>
		<Segment>
		  Looks like you're registered! Have a coordinator sign you in to start marking participant attendance!
		</Segment>
	      </Container>
	    );
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
	      <RoleCheck role="Admin">
		{volunteerBlock}
	      </RoleCheck>
	      {participantBlock}
	    </Container>
	  );
	} else { // No user
	  return <Redirect to="/" />;
	}	
      } else { // Future past check
	if (Date.now() - event.datetime > 0) { // Past : TODO! - install DownloadAttendanceButton	  
	  return (
	    <div>
	      <GenericBanner
		header="Archived Event"	      
		message="This event has already happened!"
		linkMsg="Back to event view"
		link={`/event/${this.state.event_id}`}
	      />
	      <RoleCheck role="Admin">
		<DownloadAttendanceButton id={this.state.event_id} /> 
	      </RoleCheck>
	    </div>
	  );
	} else { // Future
	  <div>
	    <GenericBanner
	      header="Event locked"
	      message="This event isn't happening yet!"
	      linkMsg="Back to event view"
	      link={`/event/${this.state.event_id}`}
	    />
	  </div>
	}
      }
    } else { // Fetch / 404
      if (!loading && hasAttemptedRefresh)
	return <ErrorComponent redir='/events/' redirMsg='Return to all events' errMsg='404 - Cannot mark attendance for past or unavailable event'/>;
      else
	return <LoadingIcon active />;
    }    
  }
}

const mapStateToProps = state => {
  return { // Note to future: We can't access withRouter props as ownProps, thus can't filter directly
    events: state.events,
    user: state.user,
    users: state.users
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchUsers,
    upfetchEventById
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAttendance));
