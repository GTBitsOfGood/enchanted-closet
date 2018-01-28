import React from 'react';
import PropTypes from 'prop-types';

import { Container, Grid, Segment } from 'semantic-ui-react';

//display for an event entry - extend generic entry?
const EventEntry = ( props ) => {
  return (
    <Grid.Row className="EventEntry">
      <Grid.Column width={2}/>
      <Grid.Column width={8}>
        <Container>
          <Grid.Row className="lead">
            <Grid.Column width={9}> {props.title} </Grid.Column>
            <Grid.Column width={3} floated='right'> {props.date} </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column> {props.desc} </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column> {props.address} </Grid.Column>
          </Grid.Row>
        </Container>
      </Grid.Column>
      <Grid.Column width={2}/>
    </Grid.Row>
  )
};

export default EventEntry;
