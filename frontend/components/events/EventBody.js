import React from 'react';
import PropTypes from 'prop-types';

import { Container, Header, Loader, Segment, Button, Input } from 'semantic-ui-react';
import { Event } from './';
import { GenericBanner } from '../';

// Display for an event entry - extend generic entry?
const EventBody = ( props ) => {
  const { events, filter, isFetchingEvents, page } = props
  const culled = filter ? events.map(filter) : events
  
  const noEvent = !isFetchingEvents && events.length === 0 ?
		  (<GenericBanner
		     header="No events found."	      
		     message="There are no events matching the search criteria"
		     linkMsg="Home"
		     link="/"
		  />) : null;
  
  return (
    <Container>
      <Loader active={isFetchingEvents}>
	Loading
      </Loader>
      { events.length > 0 && 
	events.map(e => (<Event key={e._id} data={e} history={history}/>))}
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
