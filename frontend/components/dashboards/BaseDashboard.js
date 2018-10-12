import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Divider, Segment, Header, Icon, Container, Message } from 'semantic-ui-react'
import { COLORS } from '../../constants'
import { withRouter, Link } from 'react-router-dom'
import isProfileComplete from '../../helpers/util'
import { DashboardCard } from './'
import { Event, RoleCheck } from '../'

class BaseDashboard extends Component {
  render () {
    const { events = [], pendingEvents = [] } = this.props.user

    // Get only the user's events from the store using the event ids
    const userEventsDict = this.props.events.filter(
      e => ((events.includes(e._id))))

    // Filter based on time
    const upcomingEvents = userEventsDict.filter(
      event => (new Date(event.startTime) > new Date(Date.now())))
    const pastEvents = userEventsDict.filter(
      event => (new Date(event.startTime) <= new Date(Date.now()))) // lol inefficient

    // For volunteer, pending events
    const pendingEventsArr = this.props.events.filter(e => ((pendingEvents.includes(e._id))))
    const pendingEventsRender =
      pendingEventsArr.length === 0
        ? (<Header
          as="h3"
          style={styles.emptyMessage}
        >
  You have no pending events.
        </Header>)
        : (pendingEventsArr.map(event => (
          <Event key={ `${event._id}pendingEvent` } data = { event } />
        )))

    // Render events using Event component
    const upcomingEventsRender =
      upcomingEvents.length === 0
        ? (<Header
          as="h3"
          style={styles.emptyMessage}
        >
  You are not registered for any upcoming events
        </Header>)
        : (upcomingEvents.map(event => (
          <Event key={ `${event._id}upcomingEvent` } data = { event } />
        )))

    const pastEventsRender =
      pastEvents.length === 0
        ? (<Header
          as="h3"
          style={styles.emptyMessage}
        >
  No past events found
        </Header>)
        : (pastEvents.map(event => (
          <Event key={ `${event._id}pastEvent` } data = { event } />
        )))

    return (
      <div>
        { !isProfileComplete(this.props.user)
          ? (<Message style={ styles.wrap } error
            header='Please fill in your profile.'
            content='We noticed that your profile is missing important information. Please enter all information into your profile'
          />) : null
        }
        <Segment style={ styles.eventsContainer }>
          <Header as="h1" style={styles.header} > Upcoming Events </Header>
          <Divider />
          <div style={ styles.overflowDiv }>
            { upcomingEventsRender }
          </div>
        </Segment>

        <Segment style={ styles.eventsContainer }>
          <Header as="h1" style={styles.header} > Past Events </Header>
          <Divider />
          <div style={ styles.overflowDiv }>
            { pastEventsRender }
          </div>
        </Segment>

        <RoleCheck role="Volunteer">
          <Segment style={ styles.eventsContainer }>
            <Header as="h1" style={styles.header} > Pending Events </Header>
            <Divider />
            <div style={ styles.overflowDiv }>
              { pendingEventsRender }
            </div>
          </Segment>
        </RoleCheck>
      </div>
    )
  }
}

const styles = {
  emptyMessage: {
    fontWeight: '400',
    marginLeft: '1em'
  },
  eventsContainer: {
    marginTop: '1em',
    paddingBottom: '1em'
  },
  overflowDiv: {
    overflow: 'auto',
    maxHeight: '20em'
  },
  SegmentLeft: {
    backgroundColor: COLORS.BRAND,
    padding: '2em',
    paddingLeft: '2em'
  },
  whiteText: {
    color: COLORS.WHITE
  },
  SegmentRight: {
    backgroundColor: COLORS.WHITE
  },
  header: {
    paddingTop: '0.5em',
    paddingLeft: '0.5em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrap: {
    marginTop: '1em'
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    events: state.events
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseDashboard))
