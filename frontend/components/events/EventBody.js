import React from 'react'
import PropTypes from 'prop-types'

import { Container, Header, Loader, Segment } from 'semantic-ui-react'
import { Event } from './'

//display for an event entry - extend generic entry?
const EventBody = ( props ) => {
  const { events, filter, isFetchingEvents } = props
  const culled = filter ? events.map(filter) : events
  
  const noEvent = !isFetchingEvents && events.length === 0 ? 
		    <h1> No events </h1> : null 
  return (
    <Container>
      { events.length > 0 && events.map( e => 
	<Event key={e._id} data={e} history={history}/>
      )}
      { noEvent }
    </Container>
  )
}

EventBody.propTypes = {
  events: PropTypes.array.isRequired,
  filter: PropTypes.func,
  isFetchingEvents: PropTypes.bool.isRequired
}

export default EventBody;
