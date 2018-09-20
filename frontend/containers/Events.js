import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uniqueId } from 'lodash'
import { Link } from 'react-router-dom'
import Radium from 'radium'

import { fetchEventsIfNeeded, invalidateEvents, fetchFutureEvents, fetchPastEvents } from '../actions/index'

import { Button, Container, Card, Icon, Segment, Header, Input } from 'semantic-ui-react'
import { CreateNewEventButton, ViewPastEventsButton, ViewFutureEventsButton,
  ButtonGallery, EventTab, PageTitle, RoleCheck } from '../components/'

class Events extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: true,
      query: '',
      filters: { 'Name': true, 'Location': false }
    }
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentWillMount () {
    this.props.fetchFutureEvents()
  }

  handleRefreshClick (e) { // Defunct. probably going to cause bugs.
    e.preventDefault()

    const { invalidateEvents, fetchEventsIfNeeded } = this.props
  }

  changeQuery = (event) => {
    this.setState({ query: event.target.value })
  }

  changeFilter = (data) => {
    var filts = this.state.filters
    filts[data.label] = !filts[data.label]
    this.setState({ filters: filts })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ isFetching: false })
  }

  render () {
    // const { isFetchingEvents, lastUpdatedEvents } = this.props; // Defunct
    const { isFetching, query, filters } = this.state
    const { events = [], fetchPastEvents, fetchFutureEvents } = this.props
    const bodyProps = {
      query,
      filterBy: filters,
      events,
      isLoading: isFetching
    }

    return (
      <Container>
        <PageTitle title="Events" />
        <ButtonGallery>
          <RoleCheck role="Admin">
            <CreateNewEventButton />
          </RoleCheck>
          <ViewPastEventsButton onClick={fetchPastEvents} />
          <ViewFutureEventsButton onClick={fetchFutureEvents} />
          <div style={styles.searchSection}>
            <Input
              placeholder = 'Event Name'
              icon={<Icon name='search' circular link/>}
              iconPosition="left"
              type = 'text'
              size = 'medium'
              disabled = {!this.state.filters['Name'] && !this.state.filters['Location']}
              onChange={
                (e, data) => this.changeQuery(e)
              }/>
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
          </div>
        </ButtonGallery>

        <EventTab {...bodyProps} />
      </Container>
    )
  }
}

const styles = {
  control: {
  },
  searchBy: {
    marginLeft: '10px',
    marginRight: '5px'
  },
  searchSection: {
    marginTop: '5px'
  }
}

Events.propTypes = {
  events: PropTypes.array.isRequired,
  isFetchingEvents: PropTypes.bool.isRequired,
  lastUpdatedEvents: PropTypes.number
}

function mapStateToProps (state) {
  const {
    events,
    isFetchingEvents,
    lastUpdatedEvents,
    user
  } = state

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
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Events)
