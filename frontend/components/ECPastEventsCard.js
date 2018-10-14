import React, { Component } from 'react'
import { Segment, List, Icon } from 'semantic-ui-react'

import moment from 'moment'

const ECPastEventsCards = (props) => {
  const { user } = props

  if (hasPastEvents(user)) {
    return (
      <Segment>
        <h3>Past Events</h3>
        <List >
          {user.pastEvents.map(event => {
            return (
              <List.Item key={event._id}>
                <List.Content>
                  <List.Header>{event.name}</List.Header>
                  <List.Description>{moment(new Date(event.startTime)).format('MMMM Do YYYY, h:mm a')}</List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </Segment>
    )
  } else {
    return (
      <Segment>
        <h3>Past Events</h3>
        <p><Icon name="triangle exclamation"/> This user has not been marked present at any events</p>
      </Segment>
    )
  }
}

const hasPastEvents = user => {
  return user && (user.pastEvents || []).length > 0
}

export default ECPastEventsCards
