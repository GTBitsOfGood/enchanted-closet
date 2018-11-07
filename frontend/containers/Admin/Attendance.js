import React, { Component } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { upfetchEventById, fetchUsers } from '../../actions/'

import { Button, Container, Divider, Segment, Header } from 'semantic-ui-react'
import { ButtonGallery, ErrorComponent, GenericBanner, LoadingIcon, PageTitle, RoleCheck, SearchBarCard, UserList } from '../../components'
import { DownloadAttendanceButton } from '../../components/common/Buttons'
/* Attendance Page
 * Note: Only Admins can mark volunteer attendance
 */
class AdminAttendance extends Component {
  constructor (props) {
    super(props)
    const { match, users, events, user } = this.props

    this.state = {
      eventId: match.params.id,
      users: users || [],
      hasAttemptedRefresh: false,
      loading: true,
      filter: ''
    }

    this.searchFilterUsers = this.searchFilterUsers.bind(this)
  }

  componentWillMount () { // Identify the proper event for full fetch. Fetch if full fetch needed.
    const { eventId } = this.state
    const { upfetchEventById, fetchUsers, events = [], users = [] } = this.props

    // Search for event
    let event = events.find(e => e._id === eventId)
    if (!event) {
      this.setState({
        hasAttemptedRefresh: true
      })
      upfetchEventById(eventId)
    }

    // Populate users : TODO - excessive fetching - fetch with event user registry
    if (users.length === 0) {
      fetchUsers()
    }

    if (event && users.length !== 0) {
      this.setState({ loading: false })
    }
  }

  componentWillReceiveProps (nextProps) { // Receipt of full fetch
    const { events = [], users = [] } = nextProps // On the bright side, this will update every time you send an action
    this.setState({
      events,
      loading: false,
      users
    })
  }

  searchFilterUsers (filterString) {
    this.setState({ filter: filterString })
  }

  render () {
    const { loading, hasAttemptedRefresh, filter, eventId } = this.state // event in state is pretty suboptimal
    const { events = [], users = [], user } = this.props
    const event = events.find(e => e._id === eventId)
    if (event) {
      // Timecheck on event: TODO CONSTANT ASSUMPTION Presume same day
      // Future TODO: Split single time into start and end
      const start = new Date(event.startTime)
      const end = new Date(event.endTime)
      const curDate = new Date(Date.now())
      if (curDate.getFullYear() === start.getFullYear() &&
        curDate.getMonth() === start.getMonth() &&
        curDate.getDate() >= start.getDate() &&
        curDate.getDate() <= end.getDate() &&
        curDate.getTime() >= start.getTime() &&
        curDate.getTime() <= end.getTime()) {
        // Verify users
        if (user) {
          if (user.role === 'Volunteer') { // Redirect unregistered volunteers
            const isRegistered = event.volunteers.includes(user._id)
            if (!isRegistered) {
              return <Redirect to="/events" />
            }
          }
          let volunteers = users.filter(user => event.volunteers.includes(user._id) && user.role === 'Volunteer')
          if (volunteers.length === 0) {
            // event.volunteers might have actual user objects
            volunteers = event.volunteers
          }

          const volunteerBlock = users && (
            <Segment>
              <Header as="h3">Volunteers </Header>
              <Divider />
              <UserList event={event} users={volunteers} filter={filter} />
            </Segment>
          )
          let participants = users.filter(user => event.participants.includes(user._id) && user.role === 'Participant')
          if (participants.length === 0) {
            // event.participants might have actual user objects
            participants = event.participants
          }

          const participantBlock = users && (
            <Segment>
              <Header as="h3">Participants </Header>
              <Divider />
              <UserList event={event} users={participants} filter={filter} />
            </Segment>
          )

          const isAttending = event.volunteersAttended.filter(v => v._id === user._id).length === 1
          if (user.role === 'Volunteer' && !isAttending) {
            return (
              <Container>
                <Segment>
                  Looks like you're registered! Have a coordinator sign you in to start marking participant attendance!
                </Segment>
              </Container>
            )
          }
          return (
            <Container>
              <PageTitle
                title={event.name}
                showLoadingIcon
              />
              <ButtonGallery>
                <Button as={Link} to="/admin/users/create">Register New User</Button>
                <Button as={Link} to={`/events/${eventId}`}>Back to Event View</Button>
              </ButtonGallery>
              <SearchBarCard filterFunction={this.searchFilterUsers}/>
              <RoleCheck role="Admin">
                {volunteerBlock}
              </RoleCheck>
              {participantBlock}
            </Container>
          )
        } else { // No user
          return <Redirect to="/" />
        }
      } else { // Future or Past check
        if (Date.now() - event.startTime > 0) { // Past TODO: functional - provide admin write access to past events
          return (
            <div>
              <GenericBanner
                header="Archived Event"
                message="This event has already happened!"
                linkMsg="Back to event view"
                link={`/events/${this.state.eventId}`}
              />
              <RoleCheck role="Admin">
                <DownloadAttendanceButton id={this.state.eventId} />
              </RoleCheck>
            </div>
          )
        } else { // Future
          return (
            <div>
              <GenericBanner
                header="Event locked"
                message="This event isn't happening yet!"
                linkMsg="Back to event view"
                link={`/events/${this.state.eventId}`}
              />
            </div>
          )
        }
      }
    } else { // Fetch / 404
      if (!loading && hasAttemptedRefresh) { return <ErrorComponent redir='/events/' redirMsg='Return to all events' errMsg='404 - Cannot mark attendance for past or unavailable event'/> } else { return <LoadingIcon active /> }
    }
  }
}

const mapStateToProps = state => {
  return { // Note to future: We can't access withRouter props as ownProps, thus can't filter directly
    events: state.events,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchUsers,
    upfetchEventById
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminAttendance))
