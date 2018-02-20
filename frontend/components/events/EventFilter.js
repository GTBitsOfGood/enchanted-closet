import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Segment, Button, Input } from 'semantic-ui-react'
import { EventBody } from './'

/* EventFilter: Higher Order Component that wraps EventBody with
 *              filter function.              
**/

class EventFilter extends Component {
  constructor( props ) {
    super(props)

  }

  render() {
    const { query, filterBy, events, isLoading, page } = this.props;
    const range = [(page - 1) * 10 + 1, (page) * 10]
    var filteredEvents = []
    var limitedEvents = []
    var counter = 0;
    events.map(e => {
      if (filterBy['Name'] == true)
        if (e.name.toLowerCase().includes(query.toLowerCase()))
          filteredEvents.push(e)
      if (filterBy['Location'] == true)
        if (e.location.toLowerCase().includes(query.toLowerCase()))
          if (!filteredEvents.includes(e))
            filteredEvents.push(e)
      if (filterBy['Name'] == false && this.state.filters['Location'] == false)
        filteredEvents.push(e)    
  }
    );
    const length = filteredEvents.length;
    filteredEvents.map(e => {
      counter++;
      if (counter >= range[0] && counter <= range[1])
      {
        limitedEvents.push(e);
      }
    })
    const bodyProps = { events: limitedEvents, isFetchingEvents: isLoading, page: page, length: length };
    const filter = ( event ) => true
    return <EventBody {...bodyProps}/>
    
  }
    
}

export default EventFilter;
