import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { uniqueId } from 'lodash'
import moment from 'moment'
import { isProfileComplete, sameDay } from '../helpers/util'
import { geocode } from '../helpers/geocodeEngine'

import { upfetchEventById, fetchEventsIfNeeded, invalidateEvents, deleteEvent, registerEvent, cancelEvent } from '../actions/index'
import { Button, Container, Icon, Segment, Modal, Grid, Table } from 'semantic-ui-react'
import { ButtonGallery, DeleteButton, DownloadAttendanceButton,
  MarkAttendanceButton, Map, EditButton,
  ErrorComponent, Event, EventImage, PageTitle, RoleCheck, Speakers } from '../components/'

const DEFAULT_MAP_LOCATION = {
  latitude: 51.5033640,
  longitude: -0.1276250
}

class EventsDetail extends Component {
  constructor (props) {
    super(props)
    const { match, user } = props
    const eventId = match.params.id
    this.state = {
      eventId,
      isFetchingEvents: true, // for loading
      displayMapLocationError: false
    }
  }

  componentDidMount () {
    const { match, upfetchEventById, // fetchEvents,
      events, location } = this.props
    const eventId = match.params.id
    const event = events.find(event => event._id === eventId)
    if (!event) { // Fetch if store doesn't have event
      upfetchEventById(eventId)
    } else {
      this.setState({
        event,
        isFetchingEvents: false
      })
      geocode(event.location)
        .then(location => {
          this.setState({
            latitude: location.lat,
            longitude: location.lng
          })
        })
        .catch(err => {
          console.error(err)
          this.setState({ displayMapLocationError: true })
        })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { events = [] } = nextProps
    const { eventId } = this.state
    // Process again
    const event = events.find(e => e._id === eventId)
    if (!event) {
      this.setState({
        isFetchingEvents: false,
        event: null
      })
    } else {
      this.setState({
        isFetchingEvents: false,
        event
      })

      geocode(event.location)
        .then(location => {
          this.setState({
            latitude: location.lat,
            longitude: location.lng
          })
        })
        .catch(err => {
          this.setState({ displayMapLocationError: true })
          console.error(err)
        })
    }
  }

  render () {
    const { user, deleteEvent, registerEvent, cancelEvent } = this.props
    const { event, isFetchingEvents, displayMapLocationError, latitude, longitude } = this.state

    let markAttendanceButton = null
    if (user && user.events && event && user.events.includes(event._id)) {
      markAttendanceButton = <MarkAttendanceButton id={event._id}/>
    }

    if (!event && !isFetchingEvents) { return <Redirect to='/events' /> }
    const registerBlock = (() => {
      if (event) {
        const today = new Date()
        if (new Date(event.registrationStart) <= today &&
        today < new Date(event.registrationEnd)) { // flag: event still open condition
          if (user) {
            if (!isProfileComplete(user)) {
              return (
                <Button>
                  <Link to='/profile'>
                    Complete Profile to Register
                  </Link>
                </Button>
              )
            }
            if (user.passwordReset) {
              return (
                <Button>
                  <Link to='/profile'>
                    Change Your Password to Continue
                  </Link>
                </Button>
              )
            }
            // check block
            if ((user.deniedEvents && user.deniedEvents.includes(event._id))) {
              return (
                <Button disabled>
                  Registration denied
                </Button>
              )
            }
            if ((user.events && user.events.includes(event._id)) ||
            (user.pendingEvents && user.pendingEvents.includes(event._id))) { // Already registered
              return (
                <Button onClick={() => cancelEvent(event._id, user._id)}>
                  Cancel Registration
                </Button>
              )
            }
            return (
              <Button onClick={() => registerEvent(event._id, user._id)}>
                Register
              </Button>
            )
          } else {
            return (
              <Button attached= 'top'>
                <Link to='/login'>
                  Login to Register
                </Link>
              </Button>
            )
          }
        } else {
          if (today < new Date(event.registrationEnd)) {
            return (
              <Button disabled>
                Registration Not Open
              </Button>
            )
          } else {
            return (
              <Button disabled>
                Registration Closed
              </Button>
            )
          }
        }
      }
    })()

    const volunteerBlock = (
      <Grid>
        <Grid.Row style={{ padding: '20px' }}>
          <Table>
            <Table.Body>
              {event && event.volunteers && event.volunteers.length > 0 ? event.volunteers.map(volunteer => {
                const name = volunteer.firstName && volunteer.lastName ? volunteer.firstName + ' ' + volunteer.lastName : <i>&lt;No Name&gt;</i>
                return (
                  <Table.Row
                    key={volunteer._id}>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>{volunteer.email || (<i>&lt;No Email&gt;</i>)}</Table.Cell>
                  </Table.Row>
                )
              })
                : (<Table.Row>
                  <Table.Cell>{(<p>There are no volunteers</p>)}</Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
        </Grid.Row>
      </Grid>
    )

    return (
      <Container>
        { !isFetchingEvents && event &&
    <div>
      <PageTitle title={event.name} link="/events" linkTitle="Back to All Events" />
      <Segment>
        <EventImage imageUrl={event.image} id={event._id} />
      </Segment>
      <Segment key="information">
        <h3>Description</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{event.description}</p>
      </Segment>
      <Speakers speakers={event.speakers}/>
      {displayMapLocationError || (latitude && longitude)
        ? <Map
          isMarkerShown
          lat={latitude || DEFAULT_MAP_LOCATION.latitude}
          long={longitude || DEFAULT_MAP_LOCATION.longitude}
          displayMapLocationError={displayMapLocationError}
        />
        : <Segment style={{ textAlign: 'center', padding: '80px' }} loading />
      }
      <Segment key="events">
        <h3>Events</h3>
        <p><Icon name='map'/> {event.location} </p>
        <p><Icon name='clock'/> {moment(new Date(event.startTime)).format('MMMM Do YYYY, h:mm a')}
          &nbsp;&#8209;&nbsp;
          {sameDay(new Date(event.startTime), new Date(event.endTime))
            ? moment(new Date(event.endTime)).format('h:mm a')
            : moment(new Date(event.endTime)).format('MMMM Do YYYY, h:mm a')
          }</p>
        {event.registrationStart && event.registrationEnd &&
          <div>
            <h4>Registration</h4>
            <p><Icon name='clock'/> {moment(new Date(event.registrationStart)).format('MMMM Do YYYY, h:mm a')}
              &nbsp;&#8209;&nbsp;
              {sameDay(new Date(event.registrationStart), new Date(event.registrationEnd))
                ? moment(new Date(event.registrationEnd)).format('h:mm a')
                : moment(new Date(event.registrationEnd)).format('MMMM Do YYYY, h:mm a')
              }</p>
          </div>
        }
      </Segment>
      <RoleCheck roles={['Admin', 'Volunteer', 'Participant']}>
        <ButtonGallery>
          <RoleCheck role="Admin">
            <EditButton id={event._id} />
            <Modal
              trigger={<DeleteButton />}
              header='Confirm Delete'
              content='Are you sure you want to delete this event?'
              actions={[
                'Cancel',
                { key: 'done', content: 'Delete', negative: true, onClick: () => deleteEvent(event._id) }
              ]}
            />
            <MarkAttendanceButton id={event._id} />
            <DownloadAttendanceButton id={event._id} />
          </RoleCheck>
          <RoleCheck roles={['Volunteer', 'Participant']}>
            { registerBlock }
          </RoleCheck>
          <RoleCheck role="Volunteer">
            {markAttendanceButton}
          </RoleCheck>
        </ButtonGallery>
      </RoleCheck>
    </div>
        }
        { !isFetchingEvents && !event &&
          <ErrorComponent
            redir='/events/'
            redirMsg='Return to all events'
            errMsg='404 - Event not Found'
          />
        }
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const {
    isFetchingEvents,
    lastUpdatedEvents,
    events,
    user
  } = state

  return {
    events,
    isFetchingEvents,
    lastUpdatedEvents,
    user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteEvent: deleteEvent,
    fetchEventsIfNeeded: fetchEventsIfNeeded,
    upfetchEventById: upfetchEventById,
    registerEvent: registerEvent,
    cancelEvent: cancelEvent
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventsDetail))
