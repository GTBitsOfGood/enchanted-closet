import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { fetchEventsIfNeeded } from '../../actions'

import AdminEventsNew from './EventsNew'
import { Container } from 'semantic-ui-react'
import { LoadingIcon } from '../../components/'

class EventsEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      event: this.props.events.find(e => e._id === this.props.match.params.id),
      loading: true
    }
    if (this.state.event) this.state.loading = false
  }

  componentDidMount () {
    const { dispatch } = this.props
    if (this.props.event === undefined) dispatch(fetchEventsIfNeeded())
  }

  componentWillReceiveProps (nextProps) {
    const { loading, error, events, newEvent } = nextProps
    this.setState({
      loading: loading,
      error: error,
      event: events.find(e => e._id === this.props.match.params.id),
      newEvent: newEvent
    })
  }

  render () {
    const { loading, event, newEvent } = this.state
    if (newEvent) {
      return <Redirect to={`/events/${newEvent._id}`}/>
    } else {
      return (
        <Container>
          {loading &&
     <LoadingIcon active/>
          }
          {!loading &&
     <AdminEventsNew event={event} />
          }
        </Container>
      )
    }
  }
}

EventsEdit.PropTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    events: state.events,
    loading: state.loading || false,
    newEvent: state.newEvent,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default withRouter(connect(
  mapStateToProps
)(EventsEdit))
