import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment } from 'semantic-ui-react';

// A generic banner for displaying a message and optionally providing a redirect
const GenericBanner = ({
  header = "Notice",
  message = "The requested resource is unavailable",
  linkMsg = "Back to a good place",
  link = "/"
}) => (
  <Segment> 
    <Container style={styles.wrap} text>
      <Header as="h3">{ header }</Header>
      <p>{ message }</p>
      { link &&  <Link to={ link }>
	{ linkMsg }
      </Link> }
    </Container>
  </Segment>
);

const styles = {
  wrap: {

  }
}

export default GenericBanner;
// TODO: Style
