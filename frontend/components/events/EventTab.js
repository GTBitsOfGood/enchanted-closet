import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Segment, Button, Input, Container, Header } from 'semantic-ui-react'
import { EventBody } from './'

/* EventFilter: Higher Order Component that wraps EventBody with
 *              filter function.
 **/

class EventTab extends Component {
  constructor (props) {
    super(props)
    this.state = { currentPage: 1 }
  }

  tabinate (inc) {
    var newPage = this.state.currentPage + inc
    this.setState({ currentPage: newPage })
  }

  render () {
    const { query, filterBy, events, isLoading } = this.props
    const page = this.state.currentPage
    const range = [(page - 1) * 10 + 1, (page) * 10]

    var filteredEvents = []
    var limitedEvents = []
    var counter = 0
    const cleanQuery = query.trim().toLowerCase()

    events.map(e => {
      if (filterBy['Name'] && e.name.toLowerCase().includes(cleanQuery)) {
        filteredEvents.push(e)
      } else if (filterBy['Location'] && e.location.toLowerCase().includes(cleanQuery)) {
        filteredEvents.push(e)
      } else if (!filterBy['Name'] && !filterBy['Location']) { filteredEvents.push(e) }
    })

    const length = filteredEvents.length
    // TODO: Extreme Inefficiency flag
    // sort newer ones first
    filteredEvents.map(e => {
      counter++
      if (counter >= range[0] && counter <= range[1]) {
        limitedEvents.push(e)
      }
    })

    const bodyProps = { events: limitedEvents, isFetchingEvents: isLoading, page: page }

    const filter = (event) => true

    return (
      <Container>
        <EventBody {...bodyProps}/>
        <Segment textAlign='center' vertical>
          <Button
            disabled = { page <= 1 }
            size = 'small'
            icon = 'angle double left'
            onClick={
              () => this.tabinate(-1)
            }/>
          <Button
            disabled = { range[1] > length }
            size = 'small'
            icon = 'angle double right'
            onClick={
              () => this.tabinate(1)
            }/>
        </Segment>
        <Segment textAlign='center' vertical>
          <Header as="l1"> Current Page: {page}</Header>
          {page * 10 <= length &&
     <p>Showing: {(page - 1) * 10 + 1} - {page * 10} of {length}</p>
          }
          {page * 10 > length &&
     <p>Showing: {(page - 1) * 10 + 1} - {length} of {length}</p>
          }
        </Segment>
      </Container>
    )
  }
}

export default EventTab
