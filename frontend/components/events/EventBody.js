import React from 'react'
import PropTypes from 'prop-types'

import { Container, Header, Loader, Segment, Button, Input } from 'semantic-ui-react'
import { Event } from './'

//display for an event entry - extend generic entry?

const EventBody = ( props ) => {
  const { events, isFetchingEvents, page, length } = props
  //const culled = filter ? events.map(filter) : events

  const noEvent = !isFetchingEvents && events.length === 0 ? 
		    <h1> No events </h1> : null 

  return (
    <Container>
      <Segment textAlign="center" style={styles.base}>
	 <Header as="h1">Upcoming Events</Header>
      </Segment>
      <Loader active={isFetchingEvents}>
	  Loading
      </Loader>
      { events.length > 0 && 
      events.map( e => {
	return(<Event key={e._id} data={e} history={history}/>)
      })}
      { noEvent }
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

EventBody.propTypes = {
  query: PropTypes.string,
  events: PropTypes.array.isRequired,
  filter: PropTypes.func,
  isFetchingEvents: PropTypes.bool.isRequired
}

const styles = {
  base: {
    padding: "2em"
  }
}

export default EventBody;
