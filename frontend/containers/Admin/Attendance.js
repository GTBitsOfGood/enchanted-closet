import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { upfetchEventById, fetchUsers } from '../../actions/';

import { Button, Container, Divider, Segment, Header } from 'semantic-ui-react';
import { ButtonGallery, ErrorComponent, GenericBanner, LoadingIcon, PageTitle, RoleCheck, SearchBarCard, UserList } from '../../components' 


/* Attendance Page
 * Note: Only Admins can mark volunteer attendance
 */
class AdminAttendance extends Component {
  constructor(props) {
    super(props);
    const { match, users, events, user } = this.props;
    
    this.state = {
      event_id: match.params.id,
      users: users || [],
      hasAttemptedRefresh: false,
      loading: true,
      filter: ''
    };

    this.searchFilterUsers = this.searchFilterUsers.bind(this);
  }

  componentWillMount() { // Identify the proper event for full fetch. Fetch if full fetch needed.
    const { event_id } = this.state;
    const { upfetchEventById, fetchUsers, events = [], users = [] } = this.props;

    // Search for event
    let event = events.find(e => e._id === event_id);
    if (!event) {
      this.setState({
  hasAttemptedRefresh: true
      });
      upfetchEventById(event_id);
    }

    // Populate users : TODO - excessive fetching - fetch with event user registry
    if (users.length === 0) {
      fetchUsers();
    }

    if (event && users.length !== 0) {
      this.setState({loading: false});
    }
  }

  componentWillReceiveProps(nextProps) { // Receipt of full fetch
    const { events = [], users = [] } = nextProps; // On the bright side, this will update every time you send an action
    this.setState({
      events,
      loading: false,
      users
    });
  }

  searchFilterUsers(filterString) {
    this.setState({filter: filterString});
  }

  render() {
    const { loading, hasAttemptedRefresh, filter, event_id } = this.state; // event in state is pretty suboptimal
    const { events = [], users = [], user } = this.props;
    const event = events.find(e => e._id === event_id);
    if (event) {
      // Timecheck on event: TODO CONSTANT ASSUMPTION Presume same day
      // Future TODO: Split single time into start and end
      const date = new Date(event.datetime);
      const curDate = new Date(Date.now());
      if (curDate.getFullYear() === date.getFullYear() &&
    curDate.getMonth() === date.getMonth() &&
    curDate.getDate() === date.getDate()) {
  // Verify users
  if (user) {   
    if (user.role === 'Volunteer') { // Redirect unregistered volunteers
      const isRegistered = event.volunteers.includes(user._id);
      if (!isRegistered) { 
        return <Redirect to="/events" />;
      }
    }

    const volunteerBlock = users && (
      <Segment>
        <Header as="h3">Volunteers </Header>
        <Divider />
        <UserList event={event} users={users.filter(user => event.volunteers.includes(user._id) && user.role === "Volunteer")} filter={filter} />
      </Segment>
    );

    const participantBlock = users && (
      <Segment>
        <Header as="h3">Participants </Header>
        <Divider />
        <UserList event={event} users={users.filter(user => event.participants.includes(user._id) && user.role === "Participant")} filter={filter} />
      </Segment>
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
        />
        <ButtonGallery>
    <Button
      as={Link}
      to="/admin/users/create"
    >
      Register New User
    </Button>
    <Button
      as={Link}
      to={`/events/${event_id}`}
    >
      Back to Event View
    </Button>
        </ButtonGallery>
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
      } else { // Future or Past check
  if (Date.now() - event.datetime > 0) { // Past TODO: functional - provide admin write access to past events
    return (
      <div>
        <GenericBanner
    header="Archived Event"        
    message="This event has already happened!"
    linkMsg="Back to event view"
    link={`/events/${this.state.event_id}`}
        />
        <RoleCheck role="Admin">
    <DownloadAttendanceButton id={this.state.event_id} /> 
        </RoleCheck>
      </div>
    );
  } else { // Future
    return (
      <div>
        <GenericBanner
    header="Event locked"
    message="This event isn't happening yet!"
    linkMsg="Back to event view"
    link={`/events/${this.state.event_id}`}
        />
      </div>
    );
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
